# Deploy the frontend to Cloudflare Workers

The React/Vite frontend is a static site; the Spring Boot API is a separate service and must be deployed to a Java/container host. Wrangler deploys only the frontend assets.

## Cloudflare Workers Builds settings

In the Cloudflare dashboard, connect this repository as a **Worker** and set:

- **Root directory:** `portfolio-website/portfolio/frontend`
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Build output directory:** not needed; Wrangler reads `./dist` from `wrangler.jsonc`.

Use Node.js 20 or newer. The Wrangler configuration deploys the Vite `dist/` output and enables SPA routing for client-side paths. Set `VITE_API_BASE_URL` as a build-time environment variable to the public HTTPS base URL for the deployed backend API (for example, `https://api.example.com/api`). Build the backend separately and configure its CORS policy to allow the portfolio's public origin.

## Deploy locally

From this directory:

```sh
npm ci
npm run deploy
```

The deploy script builds the app before running Wrangler. Authenticate Wrangler first with `npx wrangler login` (or configure a Cloudflare API token in CI).
