# Job Application Tracker Frontend

Next.js frontend for viewing, creating, and updating job applications.

## Live Demo

[Open the deployed application](https://main.d20j24tn1h8i7q.amplifyapp.com/applications)

## Technology

- Next.js and React
- TypeScript
- Tailwind CSS
- Vitest and Testing Library

## Configuration

Create a `.env.local` file in this directory:

```dotenv
NEXT_PUBLIC_API_URL=<backend base URL>
```

The URL should point to the NestJS API without a trailing slash. Do not commit local environment files.

## Run Locally

Start the backend first, then run:

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:3000/applications` in a browser.

## Application Routes

| Route | Purpose |
| --- | --- |
| `/applications` | List all job applications |
| `/applications/new` | Create a job application |
| `/applications/:id` | View and update a job application |

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm test` | Run component tests |
| `npm run lint` | Run ESLint |

Deployment and architecture details are documented in the [project README](../README.md).
