const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearSession = () => localStorage.removeItem(TOKEN_KEY);

export function tokenIsExpired(token = getToken()): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now();
  } catch { return true; }
}

export function endSession() {
  clearSession();
  window.dispatchEvent(new Event('trampolim:session-expired'));
}
