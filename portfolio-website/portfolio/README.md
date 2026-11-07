# Portfolio Website — Mogomotsi Sebogo

Full-stack personal portfolio: a Spring Boot REST API backed by PostgreSQL,
and a React 19 + TypeScript + Vite frontend, containerized with Docker.

```
portfolio/
├── backend/    Spring Boot API (Java 21, Maven, JPA, JWT auth)
├── frontend/   React + TypeScript + Vite + Tailwind
└── docker-compose.yml
```

## What's included

- **Projects, Skills, Experience** — served from the database via REST, with
  starter content pre-seeded so the site isn't empty on first run.
- **Contact form** — POSTs to `/api/contact` and stores messages in the DB.
- **JWT-based admin auth** — `/api/auth/login` issues a token; project
  create/update/delete endpoints require it (see `SecurityConfig.java`).
  Default admin credentials are `admin` / `changeme123` — **change these**
  before deploying (see Configuration below).
- **Graceful fallback** — if the frontend can't reach the API, it falls back
  to local placeholder data instead of showing an empty page.

## Quick start (Docker — recommended)

Requires Docker and Docker Compose.

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Postgres: localhost:5432 (user/pass: `portfolio`/`portfolio`)

## Running locally without Docker

### Backend

Requires Java 21 and Maven.

```bash
cd backend
mvn spring-boot:run
```

Runs on the `dev` profile by default, using an in-memory H2 database — no
Postgres setup needed for local development. API available at
`http://localhost:8080/api`.

### Frontend

Requires Node 20+.

```bash
cd frontend
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if needed
npm run dev
```

Runs at `http://localhost:5173` and proxies `/api` requests to the backend.

## Configuration

Backend settings are in `backend/src/main/resources/application.yml`, all
overridable via environment variables:

| Variable | Purpose | Default (dev) |
|---|---|---|
| `JWT_SECRET` | Signs admin auth tokens — set a long random value in production | placeholder |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin login for protected endpoints | `admin` / `changeme123` |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` | Postgres connection (prod profile) | see `docker-compose.yml` |

Frontend: `frontend/.env` — `VITE_API_BASE_URL` (defaults to
`http://localhost:8080/api`).

## Customizing content

Fastest path: edit the starter data in
`backend/src/main/java/com/mogomotsi/portfolio/config/DataSeeder.java`
(only seeds on first run — drop the database/volume to re-seed), and update
the fallback data in `frontend/src/data/fallback.ts` to match.

Longer term: log in via `POST /api/auth/login`, then use the returned JWT
as a `Bearer` token to `POST`/`PUT`/`DELETE` `/api/projects`.

## Deploying

- **Backend**: any host that runs a Docker container or a JAR (Render,
  Railway, Fly.io, a VPS). Point it at a managed Postgres instance.
- **Frontend**: the built `dist/` folder is static — Vercel, Netlify, or
  the included nginx Docker image all work. Set `VITE_API_BASE_URL` to
  your deployed backend's URL at build time.
