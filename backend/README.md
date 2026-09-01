# Job Application Tracker API

NestJS REST API for creating, listing, viewing, and updating job applications. Application data is stored in PostgreSQL through Prisma.

## Technology

- NestJS and TypeScript
- Prisma ORM
- PostgreSQL
- Jest and Supertest
- Docker

## Configuration

Create a `.env` file in this directory:

```dotenv
DATABASE_URL=<PostgreSQL connection string>
```

Keep real credentials in local environment files or a secrets manager. Do not commit them.

## Run Locally

Start PostgreSQL from the repository root:

```bash
docker compose up -d
```

Then install dependencies, generate the Prisma client, apply migrations, and start the API:

```bash
cd backend
npm ci
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

The API listens on port `3001` by default.

## Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/applications` | List job applications |
| `POST` | `/applications` | Create a job application |
| `GET` | `/applications/:id` | Get one job application |
| `PATCH` | `/applications/:id` | Update a job application |

## Commands

| Command | Purpose |
| --- | --- |
| `npm run start:dev` | Start the development server with file watching |
| `npm run build` | Compile the production application |
| `npm run start:prod` | Run the compiled application |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run the end-to-end test; requires `DATABASE_URL` |
| `npm run test:cov` | Run tests with coverage |

Deployment and architecture details are documented in the [project README](../README.md).
