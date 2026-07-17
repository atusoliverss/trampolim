# Front-end Trampolim

## Configuração das APIs

Copie `.env.example` para `.env.local` e preencha as URLs fornecidas pelos serviços de autenticação, cursos e vagas. As rotas locais são o padrão para desenvolvimento.

```env
VITE_AUTH_API_URL=http://localhost:8080
VITE_COURSES_API_URL=https://api-de-cursos.exemplo/cursos
VITE_JOBS_API_URL=https://api-de-vagas.exemplo/vagas
```

O login e o cadastro aceitam respostas com `token`, `accessToken`, `access_token` ou `jwt`. A página inicial e o questionário são públicos: a pessoa entra ou cria uma conta somente quando conclui o diagnóstico e pede para ver seus resultados. Todas as requisições de cursos e vagas recebem automaticamente `Authorization: Bearer <token>`.

## Executar

```bash
npm install
npm run dev
```

Para validar a produção:

```bash
npm run build
```

Em respostas de autenticação inválida, expirada, 401 ou 403, a sessão é removida e a interface retorna ao login. Falhas de conexão, timeout e indisponibilidade do serviço são mostradas na própria tela.
