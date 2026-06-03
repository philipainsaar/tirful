# Microsoft DOS 3.1 Blue Terminal

A React + Vite + three.js neon DOS terminal website.

## Run

```bash
npm install
npm run dev
```

## Replace internal images

Background:

```txt
public/backgrounds/dos-bg.png
```

Logo:

```txt
public/images/logo.png
```

You can use `.jpg`, `.png`, or `.gif`. If you change the filenames, update these lines in `src/App.jsx`:

```js
const backgroundImage = "/backgrounds/dos-bg.png";
const logoImage = "/images/logo.png";
```
