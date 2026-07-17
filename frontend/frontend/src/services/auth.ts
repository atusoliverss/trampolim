import { apiConfig } from '../config/api';
import { request } from './api';
import { saveToken } from './session';

type Credentials = { email: string; password: string; name?: string };
type AuthResponse = { token?: string; accessToken?: string; access_token?: string; jwt?: string };

async function authenticate(path: string, data: Credentials) {
  const response = await request<AuthResponse>(`${apiConfig.authBaseUrl}${path}`, { method: 'POST', body: JSON.stringify(data), authenticated: false });
  const token = response.token ?? response.accessToken ?? response.access_token ?? response.jwt;
  if (!token) throw new Error('A API não retornou um token de acesso válido.');
  saveToken(token);
}

export const login = (data: Credentials) => authenticate(apiConfig.loginPath, data);
export const signup = (data: Credentials) => authenticate(apiConfig.signupPath, data);
