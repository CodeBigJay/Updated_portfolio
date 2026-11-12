# Portfolio Website — Mogomotsi Sebogo

A full-stack personal portfolio application with a React frontend and a Spring Boot REST API backed by PostgreSQL. The repository is organised into separate frontend and backend applications and includes a Docker Compose setup for local development.

## Technology

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| Backend | Java 21, Spring Boot, Maven |
| Persistence | Spring Data JPA, PostgreSQL |
| Authentication | Spring Security, JWT |
| Local environment | Docker Compose |

## Architecture

```text
portfolio/
├── backend/          Spring Boot REST API
├── frontend/         React + TypeScript application
└── docker-compose.yml Local multi-service environment
```

The frontend communicates with the backend through HTTP API requests. The backend contains the persistence and authentication layers.

## Main areas

The current implementation includes:

- Portfolio content for projects, skills and experience
- A contact form endpoint
- An administrative sign-in flow and protected content-management endpoints
- Database-backed content with starter/fallback content
- Docker Compose configuration for local development

Refer to the source code for the exact behaviour and current implementation details.

## Requirements

- Docker Desktop with Docker Compose v2, or
- Java 21 and Maven for the backend
- Node.js 20+ and npm for the frontend
- PostgreSQL when running with the PostgreSQL configuration

## Run with Docker Compose

From this directory:

```bash
docker compose up --build
```

The Compose configuration publishes the frontend and backend on their configured local ports. Check `docker-compose.yml` for the current port mappings.

To stop the services:

```bash
docker compose down
```

## Run services separately

### Backend

From the backend directory:

```bash
mvn spring-boot:run
```

Review the Spring configuration to select the intended local profile and database. The development profile may use an in-memory database; the container configuration uses PostgreSQL.

### Frontend

From the frontend directory:

```bash
npm install
npm run dev
```

Use the frontend's environment configuration to point it to the backend API when the default development proxy is not suitable.

## Configuration and security

Configure database credentials, admin credentials, JWT signing material and frontend API origins through local environment variables or a deployment platform's secret manager.

**Do not use development credentials or placeholder JWT secrets in a public deployment.** Do not publish passwords, tokens, private keys, database dumps or real contact submissions. If a real secret has ever been committed to Git history, rotate it; removing it in a later commit does not make the old value safe.

The Docker Compose file and local defaults are intended for development. Review the production profile, database access, HTTPS, CORS and admin authorization before deploying.

## Verification

Run the backend tests:

```bash
cd backend
mvn test
```

Build the frontend:

```bash
cd frontend
npm install
npm run build
```

Also verify the contact form, data loading, admin authentication and protected operations locally with test data. Do not describe a check as passing until it has been run successfully.

## Further guidance

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for the project verification, deployment-security and portfolio-polish checklist.
