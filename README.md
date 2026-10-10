# LinuxOps — Linux Server Command Center v1

A responsive React + TypeScript operations dashboard, built for GitHub Pages. Includes server inventory CRUD, search and filters, host details, sample CPU/memory charts, threshold alerts, browser persistence, JSON backup/restore and CSV export.

**All monitoring is simulated.** This app never contacts your servers. Newly added inventory starts `Unmonitored`. Example addresses are documentation-only addresses. Inventory is stored in this browser, not synced across devices. A public Pages website has no access control; do not commit sensitive inventory or credentials.

## Run locally

Install Node.js 24 LTS and Git. From this project directory:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm test
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create an empty **public** GitHub repository named `linux-server-command-center`. Do not initialize it with a README if using the commands below.
2. Extract this ZIP. Open a terminal **inside** the extracted `linux-server-command-center` folder, where `package.json` lives.
3. Push the project, preserving folders including `.github/workflows/deploy.yml`:

```bash
git init -b main
git add .
git commit -m "Build LinuxOps command center v1"
git remote add origin https://github.com/YOUR_USERNAME/linux-server-command-center.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Authenticate with your configured Git credential manager or GitHub token when Git asks; never put tokens into the source code.

4. On GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
5. Open **Actions → Deploy LinuxOps to GitHub Pages**. If the first run failed before Pages was enabled, rerun it. You can also choose **Run workflow** on `main`.
6. When the `build` and `deploy` jobs succeed, open the URL shown in the deployment or Settings → Pages:
   `https://YOUR_USERNAME.github.io/linux-server-command-center/`
7. Later pushes to `main` automatically rebuild and redeploy.

`vite.config.ts` uses `base: './'`, so compiled asset URLs work under a project repository path or custom domain. Navigation is React state, with no server-side paths requiring a Pages fallback.

### If uploading through GitHub's browser UI

Upload the **contents** of the extracted folder, retaining `src/`, `docs/`, and the workflow folder. Do not flatten files into the repository root. Some file pickers hide `.github`: if needed choose **Add file → Create new file**, name it `.github/workflows/deploy.yml`, and paste the supplied workflow. Include `package-lock.json`. Do not upload `node_modules/` or `dist/`.

## Using the app

- **Overview:** infrastructure counts, synthetic resource pulse, inventory and alerts.
- **Server inventory:** search any hostname, address, OS, team or location; filter group/status; click a hostname for details, editing or confirmed deletion.
- **Add server:** saves metadata in your current browser. It does not enroll a monitoring agent.
- **Monitoring:** illustrative curves for active sample servers. Refresh changes CPU samples; it does not collect real metrics or retain history.
- **Alerts:** derived from unavailable sample hosts or resource utilization at/above 80%. Unmonitored hosts do not generate alerts.
- **Backups:** export all inventory as JSON; import validates and confirms replacement. CSV exports the currently filtered inventory. Use JSON to move data across devices manually.
- **Architecture:** deployment explanation, future monitoring design and confirmed demo reset.

Browser data can be lost when site data is cleared or private browsing ends. A different browser, hostname or device has its own inventory. Export JSON regularly. If storage is blocked/full, the app reports that changes exist in memory only.

## Project layout

```text
.github/workflows/deploy.yml   GitHub Pages build/deploy
src/App.tsx                   Dashboard, inventory and dialogs
src/styles.css                Responsive visual design
src/model.ts                  Types, samples, validation, CSV and alerts
src/model.test.ts             Data integrity tests
src/main.tsx                  React entry point
docs/ARCHITECTURE.md           Current and future architecture
docs/VERIFICATION.md           Checks and manual acceptance checklist
vite.config.ts                Relative static asset paths
package-lock.json             Reproducible dependency installation
```

## Troubleshooting

- **Blank page:** preserve source folders, ensure the deployed artifact is `dist`, and examine failed build logs in Actions. Never publish raw TSX as a static page.
- **Workflow missing:** check the exact `.github/workflows/deploy.yml` path on `main`.
- **Pages unavailable:** select GitHub Actions in Pages settings; check repository/account Pages availability and organization policy.
- **Data missing on your phone:** expected for v1; import a JSON backup. Automatic sync needs a backend.
- **Server shows unmonitored:** expected; v1 has no live monitoring integration.

## Official references

- Vite deployment: https://vite.dev/guide/static-deploy.html#github-pages
- GitHub Pages: https://docs.github.com/en/pages
- React: https://react.dev/

See `docs/ARCHITECTURE.md` before adding live data or automation. No GitHub repository was created or published by generating this archive.
