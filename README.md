# Acme Bank Service

A concise backend service built with NestJS for core banking operations.

## Features

- **User Authentication:** Secure login and session management.
- **Money Transfers:** Atomic transactions for safe transfers.
- **Public Forum:** Authenticated user discussions.
- **Transaction Ledger:** Viewable history with account filtering.
- **Secure File Access:** Validated and sanitized downloads.

## Tech Stack

- **Framework:** NestJS
- **Database:** SQLite (with TypeORM)
- **Security:** Passport (JWT/Session), Class Validator, Helmet, Rate Limiting.

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- Yarn or NPM

### Installation & Execution
```bash
# Clone the project
git clone https://github.com/SamuelRodriguess/nestjs-acme-bank-service

# Install dependencies
yarn install

# Start development server
yarn start
```
Access the service at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate user |
| `POST` | `/transfer` | Transfer funds |
| `GET` | `/public_ledger` | View transaction history |
| `POST` | `/public_forum` | Post forum comments |
| `POST` | `/download` | Secure file download |

## Development

```bash
# Linting
yarn lint

# Unit tests
yarn test

# E2E tests
yarn test:e2e
```

## License
UNLICENSED
