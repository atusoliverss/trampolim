# Trampolim 🚀

O Trampolim é um projeto inovador focado em conectar jovens a cursos de capacitação gratuitos (Sebrae, Senai, etc.) e cruzar o perfil com vagas de empresas locais usando "Match". 

O projeto adota uma arquitetura em **monólito de repositório (monorepo)**, sendo dividido em:
- **`frontend/`**: React + Vite + Tailwind CSS v4 + TypeScript.
- **`backend/`**: Java 21 + Spring Boot + Spring Security (JWT) + PostgreSQL.

---

## 🛠 Pré-requisitos
Para rodar este projeto na sua máquina, você precisa ter instalado:
- **Node.js** (versão 18+ recomendada) e **NPM**.
- **Java JDK 21**.
- **Docker** e **Docker Compose** (para subir o banco de dados facilmente).

---

## ⚙️ Como executar o projeto localmente

Siga o passo a passo abaixo estritamente nessa ordem para garantir que a aplicação inicie sem erros:

### 1. Subir o Banco de Dados (PostgreSQL via Docker)
O backend exige um banco de dados rodando para iniciar corretamente. Usamos o Docker para facilitar isso.

1. Abra um terminal na raiz do projeto.
2. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
3. Suba o container do banco de dados em background:
   ```bash
   docker compose up -d
   ```
   *Dica: Se quiser acompanhar os logs do banco em tempo real, use `docker compose logs -f`.*
   
   *Nota: O banco subirá na porta `5432` com as credenciais padrões (`root` / `root`) definidas no arquivo `docker-compose.yml` e esperadas pelo `application.properties`.*

### 2. Rodar o Backend (API Spring Boot)
Com o banco rodando, podemos iniciar a API. 
*(Ainda no terminal, dentro da pasta `backend/`)*

- Se você estiver no **Linux/macOS**:
  ```bash
  ./mvnw spring-boot:run
  ```
- Se você estiver no **Windows**:
  ```bash
  mvnw.cmd spring-boot:run
  ```
*O backend estará rodando em `http://localhost:8080`. Todas as rotas (exceto `/api/auth/login` e `/api/auth/cadastro`) estão protegidas e exigem um Token JWT no cabeçalho `Authorization`.*

### 3. Rodar o Frontend (React / Vite)
Por fim, abra **uma nova aba/janela no terminal** e inicie a interface do usuário.

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências na primeira vez:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
*O frontend abrirá automaticamente no seu navegador em `http://localhost:5173`. O CORS já está configurado no backend para aceitar requisições nativas vindas dessa porta.*

---

## 🔒 Regras de Segurança (O Porteiro)
O backend possui um filtro rigoroso (`JwtAuthenticationFilter`).
- Qualquer requisição REST feita para o sistema sem o token retornará bloqueio (Código 403 Forbidden).
- Rota livre para testes (Autenticação): Faça um `POST` para `http://localhost:8080/api/auth/login` enviando os dados de entrada para extrair seu token gerado pelo `JwtUtil`.

## 🤝 Como contribuir
1. Lembre-se que as dependências não se misturam. Qualquer pacote Node é restrito ao `/frontend`, enquanto pacotes Maven ficam restritos ao `pom.xml` do `/backend`.
2. O CSS deve seguir os padrões já definidos no Tailwind v4. Não adicione arquivos de estilo avulsos a não ser que estritamente necessário.
