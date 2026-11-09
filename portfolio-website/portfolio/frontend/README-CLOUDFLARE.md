# Portfolio deployment: Cloudflare Pages + D1 + GitHub asset storage

The public website is a React/Vite static site. Cloudflare Pages Functions provide the secure API used by the private admin area. D1 stores project metadata. Uploaded images and PDFs are committed to the private GitHub repository under the frontend's `public/uploads/` folder and are then served publicly by Cloudflare Pages.

## Cloudflare resources

1. Pages project connected to this GitHub repository. Set the correct frontend root directory for this repository. Build command: `npm run build`; output directory: `dist`.
2. D1 database named `mogomotsi-portfolio`.

No R2 bucket is required by this version.

## D1 migration

Open the D1 database in Cloudflare, choose **Console**, and run the SQL in `migrations/0001_create_projects.sql`.

## Pages bindings and secrets

In Pages project → Settings → Functions → Bindings, keep the D1 database binding:

- Variable name: `DB`; select `mogomotsi-portfolio`.

Add these production secrets under Settings → Variables and Secrets:

- `ADMIN_PASSWORD`: a long, unique password used only for the portfolio admin login.
- `SESSION_SECRET`: a separate random secret with at least 32 random bytes.
- `GITHUB_TOKEN`: a fine-grained GitHub personal access token restricted to this repository, with **Contents: Read and write** permission. Repository metadata read access is normally included automatically.

Never put these secrets in GitHub, source files, frontend code, chat messages, or Vite `VITE_` variables. Add the same `GITHUB_TOKEN` secret to Preview only if you intend to test uploads on preview deployments.

## Upload behaviour

- Sign in with `ADMIN_PASSWORD`.
- Add, edit, publish/unpublish and delete projects.
- Upload up to six JPG, PNG, WEBP, GIF or PDF files per save; each file is limited to 10 MB.
- Files are committed to `portfolio-website/portfolio/frontend/public/uploads/` on the `main` branch.
- The returned public asset paths are `/uploads/<generated-file-name>`.
- A GitHub commit triggers a Cloudflare Pages deployment. Newly uploaded files become publicly available after that deployment completes.
- Deleting a project removes its D1 record but intentionally leaves uploaded files in the repository. This avoids deleting an asset that might still be referenced by another project; unused files can be cleaned up separately.

The upload API requires the GitHub token only on the server. It is never sent to the browser. The session cookie is HttpOnly, Secure and SameSite=Strict, with an eight-hour lifetime. The API rejects cross-origin state-changing requests.

## Important notes

- The Spring Boot backend and PostgreSQL service are not required for this frontend-only deployment. Keep the old backend folder in GitHub as an archive until the new Pages deployment is verified; it is not used by this site.
- GitHub is being used for a small portfolio asset library, not as general-purpose file hosting. Repository size grows as files are uploaded. Each upload can trigger a Pages build; uploading several files one at a time can trigger several builds.
- Portfolio assets are public once deployed, even though the source repository remains private.
- The contact section currently links to public profiles; it does not submit messages to the retired Spring Boot API.
