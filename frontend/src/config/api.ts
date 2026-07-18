const localApi = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const apiConfig = {
  authBaseUrl: import.meta.env.VITE_AUTH_API_URL ?? localApi,
  coursesUrl: import.meta.env.VITE_COURSES_API_URL ?? `${localApi}/api/cursos`,
  jobsUrl: import.meta.env.VITE_JOBS_API_URL ?? `${localApi}/api/vagas`,
  loginPath: import.meta.env.VITE_LOGIN_PATH ?? '/api/auth/login',
  signupPath: import.meta.env.VITE_SIGNUP_PATH ?? '/api/auth/cadastro',
};
