# Portfolio deployment: Cloudflare Pages + D1 + R2

The public website is a React/Vite static site. Cloudflare Pages Functions provide the small secure API used by the private admin area. D1 stores project metadata; a private R2 bucket stores uploaded images and PDFs.

## Cloudflare resources

Create these resources in the same Cloudflare account:

1. Pages project connected to this GitHub repository. Root directory: `portfolio/frontend` (adjust if your repository root differs). Build command: `npm run build`; output directory: `dist`.
2. D1 database named `mogomotsi-portfolio`.
3. R2 bucket named `mogomotsi-portfolio-files`.

## D1 migration

Open the D1 database in Cloudflare, choose **Console**, and run the SQL in `migrations/0001_create_projects.sql`.

## Pages bindings

In Pages project → Settings → Functions → Bindings, add:

- D1 database binding: variable name `DB`, select `mogomotsi-portfolio`.
- R2 bucket binding: variable name `PROJECT_FILES`, select `mogomotsi-portfolio-files`.

Add these production secrets under Settings → Variables and Secrets:

- `ADMIN_PASSWORD`: a long, unique password used only for the portfolio admin login.
- `SESSION_SECRET`: a separate random secret with at least 32 random bytes.

Do not put either secret in GitHub, source files, or Vite `VITE_` variables. Add the same bindings and secrets to Preview only if you want to test the admin on preview deployments.

## Deploy

Commit and push the updated frontend folder to the branch connected to Pages. Pages will build and deploy the static site and its `functions/` routes. The public site is `/`; the private dashboard is `/admin`.

## Admin features

- Sign in with `ADMIN_PASSWORD`.
- Add, edit, publish/unpublish and delete projects.
- Upload up to six JPG, PNG, WEBP, GIF or PDF files per save; each file is limited to 10 MB.
- Uploaded files are stored in the private R2 bucket and served through a read-only Pages Function.

The session cookie is HttpOnly, Secure and SameSite=Strict, with an eight-hour lifetime. The API rejects cross-origin state-changing requests.

## Important notes

- The Spring Boot backend and PostgreSQL service are not required for this frontend-only deployment. Keep the old backend folder in GitHub as an archive until the new Pages deployment is verified; it is not used by this site.
- Cloudflare account usage and plan limits can change. Check the current D1 and R2 pricing/limits before uploading large files or relying on high traffic. This design does not guarantee unlimited free storage or bandwidth.
- The contact section currently links to public profiles; it does not submit messages to the retired Spring Boot API.
