import { endSession, getToken, tokenIsExpired } from './session';

export class ApiError extends Error {
  public readonly status?: number;
  constructor(message: string, status?: number) { 
    super(message); 
    this.status = status;
  }
}

const TIMEOUT_MS = 12_000;

export async function request<T>(url: string, options: RequestInit & { authenticated?: boolean } = {}): Promise<T> {
  const { authenticated = true, headers, ...init } = options;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  const token = getToken();
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept', 'application/json');
  if (init.body) requestHeaders.set('Content-Type', 'application/json');
  if (authenticated && (!token || tokenIsExpired(token))) {
    endSession();
    throw new ApiError('Sua sessão expirou. Entre novamente para continuar.', 401);
  }
  try {
    if (authenticated) requestHeaders.set('Authorization', `Bearer ${token}`);
    const response = await fetch(url, { ...init, signal: controller.signal, headers: requestHeaders });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) { endSession(); throw new ApiError('Sua sessão não é mais válida. Entre novamente.', response.status); }
      throw new ApiError(body?.message ?? (response.status >= 500 ? 'Serviço indisponível. Tente novamente em instantes.' : 'Não foi possível concluir a solicitação.'), response.status);
    }
    return body as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') throw new ApiError('A solicitação demorou demais. Tente novamente.');
    throw new ApiError('Não foi possível conectar ao serviço. Verifique sua conexão e tente novamente.');
  } finally { window.clearTimeout(timeout); }
}

export async function submitDiagnostic(alternativasMarcadas: string[]): Promise<{ perfil: string, mensagem: string }> {
  return request<{ perfil: string, mensagem: string }>('/api/diagnostico', {
    method: 'POST',
    body: JSON.stringify({ alternativasMarcadas }),
    authenticated: true
  });
}
