# Touchline Gunners

Arsenal fan games hub — built with React + Vite, deployed on Vercel.

## Games

| Game | Status |
|------|--------|
| Arsenal 501 | ✅ Live |
| Gunners XI | 🔜 Coming Soon |

## Dev setup

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` auto-deploy via Vercel.

## Adding a new game

1. Create `src/games/YourGame/index.jsx` with a default export
2. Import and register it in `src/App.jsx` inside the `GAMES` array
