const localApi = import.meta.env.VITE_API_BASE_URL ?? '';

export const apiConfig = {
  authBaseUrl: import.meta.env.VITE_AUTH_API_URL ?? localApi,
  coursesUrl: import.meta.env.VITE_COURSES_API_URL ?? `${localApi}/api/cursos/recomendados`,
  jobsUrl: import.meta.env.VITE_JOBS_API_URL ?? `${localApi}/api/vagas/recomendadas`,
  loginPath: import.meta.env.VITE_LOGIN_PATH ?? '/api/auth/login',
  signupPath: import.meta.env.VITE_SIGNUP_PATH ?? '/api/auth/cadastro',
};
