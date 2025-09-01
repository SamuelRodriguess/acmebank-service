# <img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" width="25" /> Acme Bank Service

## Description
This project is a backend service built with NestJS that manages core banking functionalities including money transfers, user account management, a public forum, and user comments. The application uses SQLite3 for lightweight database management, providing persistence for user data, transactions, and forum posts. It incorporates transactional integrity for secure money transfers.

## Features
- User session management with login validation (using NestJS guards/middleware)
- Public forum where authenticated users can post comments
- Public ledger view with optional filtering by account
- Secure file download with input validation
- Input validation using NestJS pipes and class-validator for security and data integrity
- SQL transactions to ensure atomic money transfers (via TypeORM or Prisma)

## Prerequisites
- Node.js (v22 or higher recommended)
- npm or yarn
- SQLite3 database
- NestJS framework

## Installation
1. Clone the repository:
   ```git clone https://github.com/SamuelRodriguess/nestjs-acme-bank-service```

2. Install dependencies:
   ```yarn install```

## Usage
1. Start the server:
   ```yarn start```
2. Visit `http://localhost:3000` in your browser.
3. Register or log in, then use the public forum, initiate transfers, access the ledger, or download files.

## 📚 API Endpoints

| Method | Endpoint           | Description                                        |
|--------|--------------------|--------------------------------------------------|
| POST   | `/auth/login`            | user login                                       |
| POST   | `/transfer`        | transfer money between accounts (uses SQL transactions) |
| GET    | `/public_ledger`   | view ledger entries with optional query parameter to filter by account |
| POST   | `/public_forum`    | post comments to the forum (with validation)     |
| POST   | `/download`        | download files securely (validated and sanitized)|

## Validation and Security
- All user inputs are validated and sanitized using class-validator decorators and applied globally via NestJS ValidationPipe.
- Validation is integrated into DTOs (Data Transfer Objects) to ensure data integrity and security.
- User sessions are checked at protected routes using NestJS Guards to prevent unauthorized access.
- Sensitive operations are protected with guards and additional security mechanisms.
- File accesses are sanitized to prevent path traversal and other injection attacks.

## Project Structure

Project Structure Overview  
This project follows a modular and organized structure to keep the code maintainable and scalable, following best practices recommended for NestJS applications.

- `src/main.ts` - The entry point of the application that bootstraps the NestJS app.

- `src/app.module.ts` - The root module tying together all feature modules and global providers.

- `src/modules/` - Contains feature modules divided by domain or capability. Each module includes its own controllers, services, DTOs, entities, and related files. Examples: `users/`, `auth/`, `ledger/`.
   - `controllers/` - Contains controller classes that define the routes and handle incoming HTTP requests for that domain.
   - `services/` - Contains service (provider) classes where the business logic and interaction with data layers reside.
   - `dtos/-` Contains Data Transfer Objects which define the shape and validation rules for data sent over the network.
   - `entities/` - Contains database entities or models corresponding to the domain data.

- `src/common/` - Contains globally reusable components such as pipes, guards, interceptors, filters, and decorators.

- `src/config/` - Configuration files and setup such as environment variables, middleware configuration, database connection setup, and security settings.

- `src/db/` or inside individual modules - Contains database entities, repositories, and migration files. TypeORM or Prisma files typically reside here.

- `src/middleware/` - Custom middleware functions for rate limiting, authentication, error handling, etc.

- `src/public/` - Static assets like CSS, client-side JavaScript, images served using `ServeStaticModule`.

- `src/views/` - Holds view templates (e.g., EJS) if server-side rendering or email templates are used.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
