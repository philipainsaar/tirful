# Tirful Next.js + Three.js

Converted from the original Vite React site to a Next.js App Router project while keeping the existing DOS terminal UI, album grid, Bandcamp player, image assets, and Three.js neon background.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL that Next.js prints in the terminal.

## Build

```bash
npm run build
npm run start
```

## Main files

```txt
app/layout.jsx              Next.js root layout and metadata
app/page.jsx                Home page
app/globals.css             Converted global CSS from the original site
components/TirfulSite.jsx   Existing React/Three.js site as a client component
public/backgrounds/         Existing background assets
public/images/              Existing logo and cover images
```

## Replacing images

Background:

```txt
public/backgrounds/dos-bg.gif
```

Logo:

```txt
public/images/logo.png
```

If you change filenames, update these lines in `components/TirfulSite.jsx`:

```js
const backgroundImage = "/backgrounds/dos-bg.gif";
const logoImage = "/images/logo.png";
```
