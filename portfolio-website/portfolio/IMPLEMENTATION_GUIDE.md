# Employer-Ready Portfolio Implementation Guide

This guide takes the portfolio from a working project to a polished, publicly accessible site that employers can review. Work through the phases in order. Keep the live site, repository, and the information shown on the site consistent and current.

## 1. Make the portfolio yours

- Replace starter or placeholder content in `backend/src/main/java/com/mogomotsi/portfolio/config/DataSeeder.java` and `frontend/src/data/fallback.ts` with accurate information. Keep both data sources aligned.
- Update the name, headline, biography, skills, experience, and project descriptions throughout the app. Be specific about your contribution, the problem solved, and the outcome; don't claim work or metrics you can't verify.
- For each featured project, include a concise description, technologies used, your role, a screenshot or demo, and links to the live project and source code where appropriate. Make sure links work and public repositories don't expose secrets.
- Add a professional profile photo only if you want one. Use optimized, appropriately licensed images and meaningful alt text.
- Remove sample content and dead links. Check the browser title, favicon, social sharing metadata, and contact details as well as the visible page copy.

## 2. Run and verify locally

From `portfolio-website/portfolio/`:

1. Follow the README's Docker quick start with `docker compose up --build`.
2. Visit the frontend at `http://localhost:3000` and check every section at desktop and mobile widths.
3. Verify that projects, skills, and experience load; confirm the fallback still works when the API is unavailable.
4. Submit the contact form and confirm the request succeeds and the message is persisted. Do not use real employer or visitor data while testing.
5. Test admin login and protected project operations with non-production data. Do not publish the documented development credentials.
6. Run the frontend checks: `cd frontend && npm install && npm run lint && npm run build`.
7. Run backend tests/build with Maven from `backend/` (for example, `mvn test`). Fix failures before deploying.

If any documented command fails, resolve that before treating the release as ready. Record the commands and results in your release notes.

## 3. Secure the deployment

The checked-in Compose configuration contains development credentials and a placeholder JWT secret. **Do not deploy those values.** Before making the site public:

- Replace admin and database passwords with unique, strong secrets. Generate a long random JWT signing secret (at least 32 bytes) and provide it through your host's secret/environment-variable manager, not in source control.
- Review the production Spring profile and database settings. Use a managed or otherwise securely configured PostgreSQL database with backups and restricted network access.
- Avoid exposing PostgreSQL publicly. Only expose the web services and only the API routes that need to be reachable.
- Use HTTPS for the public site and API. Configure the frontend API URL for the deployed backend and confirm browser requests do not produce mixed-content or CORS errors.
- Check authentication and authorization on every admin endpoint, validate inputs, and ensure errors do not reveal secrets or internal details.
- Decide how contact submissions will be monitored and retained. Protect personal information, limit access, and document a safe way to delete messages.
- Keep dependencies and base images updated. Do not commit `.env` files, keys, tokens, database dumps, or real contact submissions.

## 4. Deploy and verify the live site

Choose a hosting setup you can maintain. The README describes deploying the frontend as a static site and the backend as a container/JAR connected to PostgreSQL; you can also use the included Docker setup on a host that supports it.

- Deploy the backend and database first, configure production secrets, and verify the API is reachable over HTTPS.
- Build and deploy the frontend with the correct API base URL configured at build time.
- Connect a domain if available, enable HTTPS, and set a clear canonical URL.
- Test the actual public URL on a phone and desktop, in a private/incognito window, and with browser developer tools open for failed requests or console errors.
- Check contact-form delivery/persistence, navigation, external links, page refreshes, and unavailable-API behavior on the live deployment.
- Set up uptime/error monitoring and database backups, and make sure you know how to redeploy and restore the service.

## 5. Polish for employers

- Make the first screen immediately answer who you are, what kind of role you want, and where to find your strongest work.
- Add a downloadable resume only if it is current and does not expose private information. Verify it works on mobile and is accessible as a PDF.
- Provide clear links to GitHub and relevant professional profiles. Use a professional email address or a working contact form; test it from outside your account.
- Check keyboard navigation, visible focus, heading structure, color contrast, form labels, and image alt text. Avoid motion that cannot be reduced where practical.
- Optimize images and check page load performance. Add descriptive page metadata and social preview information so shared links look professional.
- Review spelling, dates, project links, and claims. Ask someone else to review the site and try to use it without instructions.

## 6. Make the repository easy to assess

- Keep the root README or project README accurate, with a clear project summary, screenshots, architecture, setup steps, live demo link, and known limitations.
- Add screenshots or a short demo GIF that shows the real, personalized site. Do not include secrets or private information in screenshots.
- Add automated tests for important user flows and backend behavior, plus a CI workflow that runs tests, lint, and builds on pull requests.
- Keep commits focused and the default branch deployable. Remove generated build artifacts and local environment files that do not belong in source control.
- If you add a live demo link, verify it is public and stable before sharing your resume or applications.

## Release checklist

- [ ] All visible text and project content are accurate and personalized.
- [ ] No placeholders, dead links, default credentials, or committed secrets remain.
- [ ] Frontend lint/build and backend tests/build pass.
- [ ] Mobile layout, keyboard access, and contact form have been checked.
- [ ] Production secrets, HTTPS, API URL, database access, and backups are configured.
- [ ] Live site and all links work from a signed-out browser.
- [ ] README contains screenshots, setup instructions, and the public demo URL.
- [ ] Resume and professional profiles link to the same current portfolio.

A site is ready to share with employers when the content is truthful, the live link works reliably, and the most relevant work is easy to understand in a quick scan. Continue improving it as your experience and projects change.
