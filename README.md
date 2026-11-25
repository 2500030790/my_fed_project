# PawConnect React

PawConnect is a Vite + React single-page app. UI, behavior, and HTML markup are authored in JSX components under `src/`.

## Run locally

- `npm install`
- `npm run dev`

## Production build

- `npm run build`
- Upload the generated `dist/` folder to Netlify, or connect this repository and use `npm run build` with `dist` as the publish directory.

## Project layout

- `src/App.jsx` — page composition and app state
- `src/components/` — navigation, pet cards, support, features, chatbot
- `src/data/` — pet and region data
- `src/main.jsx` — React entry point
- `src/styles.css` — global stylesheet entry
- `index.html` — Vite document shell
