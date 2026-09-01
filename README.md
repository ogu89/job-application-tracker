# Job Application Tracker

A deployed full-stack application for organizing job applications, tracking their status, and keeping notes throughout the application process.

## Live Demo

[Open the deployed Job Application Tracker](https://main.d20j24tn1h8i7q.amplifyapp.com/applications)

The frontend is deployed from the `main` branch with AWS Amplify. It communicates with the NestJS API running on Amazon ECS.

## Features

- List job applications
- Create a new application
- View application details
- Update an existing application
- Track application status
- Store notes for each application
- Loading, empty, success, and error states

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Frontend hosting | AWS Amplify |
| Backend | NestJS, TypeScript |
| API container | Docker |
| Container registry | Amazon ECR |
| Backend hosting | Amazon ECS |
| Database | PostgreSQL on Amazon RDS |
| ORM | Prisma |
| Backend tests | Jest |
| Frontend tests | Vitest, Testing Library |

## Architecture

```text
User
  |
  v
AWS Amplify
(Next.js frontend)
  |
  | REST API
  v
Amazon ECS <---------------- Amazon ECR
(NestJS Docker container)     (Docker image)
  |
  | Prisma
  v
Amazon RDS
(PostgreSQL)
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/applications` | List all applications |
| `POST` | `/applications` | Create an application |
| `GET` | `/applications/:id` | Get an application by ID |
| `PATCH` | `/applications/:id` | Update an application |

## Local Development

### Prerequisites

- Node.js 22 and npm
- Docker with Docker Compose

### 1. Start PostgreSQL

From the repository root:

```bash
docker compose up -d
```

### 2. Configure environment variables

Create `backend/.env`:

```dotenv
DATABASE_URL=<PostgreSQL connection string>
```

Create `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=<backend base URL>
```

`DATABASE_URL` is used by Prisma and the NestJS API to connect to PostgreSQL. `NEXT_PUBLIC_API_URL` tells the frontend where to send API requests. Keep real credentials in local environment files or a secrets manager; do not commit them.

### 3. Start the backend

```bash
cd backend
npm ci
npx prisma generate
npx prisma migrate deploy
npm run start:dev
```

The backend runs on port `3001` by default.

### 4. Start the frontend

In a separate terminal:

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:3000` in a browser.

## Tests

Run the backend unit tests:

```bash
cd backend
npm test
```

The backend also includes an end-to-end test. It requires `DATABASE_URL` to be set in the command environment:

```bash
cd backend
DATABASE_URL="<PostgreSQL connection string>" npm run test:e2e
```

Run the frontend Vitest and Testing Library tests:

```bash
cd frontend
npm test
```

Build both applications with:

```bash
cd backend
npm run build

cd ../frontend
npm run build
```

## Deployment

- **Frontend:** AWS Amplify automatically builds and deploys the `main` branch. The backend base URL is supplied through the Amplify environment configuration.
- **Backend image:** The NestJS API is built as a Docker image and stored in Amazon ECR.
- **Backend service:** Amazon ECS pulls the image from ECR and runs the API container. Runtime configuration, including the database connection, is provided outside the image.
- **Database:** Amazon RDS hosts PostgreSQL, while Prisma handles database access and schema migrations.

No AWS account identifiers, credentials, database passwords, or private infrastructure details are stored in this README.

## What I Learned

This project provided practical experience building a TypeScript application across the frontend and backend, designing and testing REST API workflows, managing PostgreSQL with Prisma, containerizing a service with Docker, and deploying a multi-service application on AWS. It also reinforced the importance of environment-based configuration and clear UI states for reliable user experiences.
