# Tirful Next.js + Three.js

Converted from the original Vite React project to Next.js App Router while keeping the existing DOS terminal UI, album grid, Bandcamp embeds, images, GIF background, and Three.js neon scene.

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

## Vercel deployment notes

This repository includes `vercel.json` to force the project preset to Next.js, because the previous Vercel project may still be using old Vite settings.

Recommended Vercel settings:

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: leave empty / do not override
- Install Command: `npm install`
- Root Directory: repository root, unless this project is inside a subfolder

If Vercel still says it is looking for `dist`, go to Project Settings → Build & Development Settings and turn off Output Directory override.
