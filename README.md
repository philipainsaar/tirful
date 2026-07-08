# Tirful Next.js + Three.js

Converted from the original Vite React project to Next.js App Router while keeping the DOS terminal UI, album grid, Bandcamp embeds, images, GIF background, and Three.js neon scene.

## Important Vercel install fix

This ZIP intentionally does **not** include `package-lock.json`.

The previous package lock was generated in a private build environment and contained internal registry URLs. Vercel cannot access those URLs, so deployment can fail at:

```bash
Command "npm install" exited with 1
```

When pushing this to GitHub/Vercel, make sure these old files are deleted from the repository root:

```bash
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lockb
index.html
vite.config.js
src/main.jsx
src/App.jsx
```

Vercel will run `npm install --no-audit --no-fund` and generate dependencies from `package.json` using the public npm registry.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Vercel settings

Use these settings in Project Settings → Build & Development Settings:

- Framework Preset: Next.js
- Install Command: `npm install --no-audit --no-fund`
- Build Command: `npm run build`
- Output Directory: leave empty / no override
- Root Directory: repository root
- Node.js Version: 22.x

If the project was Vite before, Vercel may still have old settings cached. Clear any old output directory like `dist`.
