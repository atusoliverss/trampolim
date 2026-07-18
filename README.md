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
### 2. Rodar Tudo com Docker Compose (Recomendado)
Para iniciar o Banco de Dados, o Backend e o Frontend de uma vez só, abra o terminal na **pasta raiz do projeto** e execute:

```bash
docker compose up --build -d
```

- **Frontend:** Estará disponível em `http://localhost:80`.
- **Backend:** Estará rodando e respondendo em `http://localhost:8080` (O Frontend se comunica via NGINX com ele de forma transparente no `/api`).
- **Banco de Dados (PostgreSQL):** Rodando na porta `5433` (mapeada para a porta interna 5432).

Para parar todos os serviços, execute:
```bash
docker compose down
```

---

## 🔒 Regras de Segurança (O Porteiro)
O backend possui um filtro rigoroso (`JwtAuthenticationFilter`).
- Qualquer requisição REST feita para o sistema sem o token retornará bloqueio (Código 403 Forbidden).
- Rota livre para testes (Autenticação): Faça um `POST` para `http://localhost:8080/api/auth/login` enviando os dados de entrada para extrair seu token gerado pelo `JwtUtil`.

## 🤝 Como contribuir
1. Lembre-se que as dependências não se misturam. Qualquer pacote Node é restrito ao `/frontend`, enquanto pacotes Maven ficam restritos ao `pom.xml` do `/backend`.
2. O CSS deve seguir os padrões já definidos no Tailwind v4. Não adicione arquivos de estilo avulsos a não ser que estritamente necessário.
