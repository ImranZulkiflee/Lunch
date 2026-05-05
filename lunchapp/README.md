# LunchPick — Mid Valley & Gardens Mall KL

Daily lunch recommendation engine for office workers at Mid Valley Megamall and The Gardens Mall, Kuala Lumpur.

## Features

- 30+ restaurants across both malls
- Halal / non-halal filtering
- Cuisine type and budget filters
- Smart rotation — avoids recently visited restaurants
- Local history tracking with cooldown logic
- Cuisine variety in daily suggestions
- Mobile-friendly responsive layout

## Tech Stack

- React 18
- CSS (no UI library — fully custom)
- localStorage for history persistence

---

## Deploy to Vercel (3 steps)

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
cd lunchapp
npm install
vercel
```

Follow the prompts. Vercel will auto-detect Create React App and deploy.

### Option B — GitHub + Vercel Dashboard

1. Push this folder to a GitHub repo:
   ```bash
   cd lunchapp
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create my-lunchpick --public --push --source=.
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo → click **Deploy**

Done! Vercel handles the build automatically.

---

## Run Locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Output in `./build` — ready to serve from any static host.

---

## Customisation

- **Add restaurants**: Edit `src/data/restaurants.js`
- **Change cooldown days**: Edit `COOLDOWN_DAYS` in `src/hooks/useRecommendations.js`
- **Change colours**: Edit CSS variables at the top of `src/App.css`
