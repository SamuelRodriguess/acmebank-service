# Bank Service

Este é um serviço de backend bancário desenvolvido com [NestJS](https://nestjs.com/).

## 🚀 Tecnologias

- **Framework:** NestJS
- **Banco de Dados:** SQLite (via TypeORM)
- **Cache/Sessão:** Redis
- **Autenticação:** Passport (Local & JWT)
- **Segurança:** Helmet, CSRF, Rate Limiting
- **Template Engine:** EJS

## 🛠️ Pré-requisitos

- Node.js (>= 20)
- Redis Server (rodando localmente ou via Docker)
- Yarn ou NPM

## 🏁 Como começar

1. **Instale as dependências:**
   ```bash
   yarn install
   # ou
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`, se disponível).

3. **Inicie a aplicação:**
   ```bash
   # Desenvolvimento
   yarn start

   # Modo Watch (recomendado para dev)
   yarn start:watch

   # Produção
   yarn build
   yarn start:prod
   ```

## 🧪 Testes

```bash
# Testes unitários
yarn test

# Testes E2E
yarn test:e2e

# Cobertura de testes
yarn test:cov
```

## 📂 Estrutura do Projeto

- `src/modules/auth`: Gerenciamento de autenticação e guards.
- `src/modules/user`: Operações relacionadas a usuários.
- `src/common`: Middlewares de segurança (CSRF, Rate Limiter).
- `html/`: Templates front-end (login, etc).
