# ⚡ PitchForge AI

> Turn your startup idea into an investor-ready pitch deck in minutes.

🔗 **Live Demo**: [pitchforge-ai.vercel.app](https://pitchforge-ai-vert.vercel.app)

---

## What It Does

PitchForge AI takes your startup idea as input and generates a full investor pitch analysis across 9 tabs:

- **Overview** — Problem, Solution, USP, Go-To-Market
- **Business Model Canvas** — All 9 BMC blocks
- **Market Analysis** — TAM / SAM / SOM breakdown
- **Competitor Analysis** — Threat matrix
- **SWOT Analysis** — Strategic view
- **Revenue Model** — Stream breakdown with percentages
- **Financial Projections** — 5-year charts (Revenue, Profit, Users)
- **Investor Readiness Score** — 0–100 score with dimension breakdown
- **Pitch Deck** — 12-slide preview cards

---

## How It Works

By default the app uses intelligent mock data tailored to your industry and startup stage — no API key needed.

To enable real Claude AI generation, add your Anthropic API key (see setup below).

---

## Tech Stack

- React 18 + Vite 8
- Tailwind CSS
- Recharts (financial charts)
- Vercel Serverless Functions (API route)
- Anthropic Claude API (optional)

---

## Local Development

```bash
git clone https://github.com/SEJAL-SISODIA08/pitchforge-ai.git
cd pitchforge-ai
npm install
npm run dev
```

App runs at `http://localhost:5173` — works immediately with mock data, no API key needed.

---

## Enable Real AI (Optional)

1. Get a free API key from [console.anthropic.com](https://console.anthropic.com)
2. Create a `.env.local` file in the project root:
ANTHROPIC_API_KEY=sk-ant-your-key-here
3. Restart the dev server

---

## Deploy Your Own

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your fork
3. Click **Deploy** (Vercel auto-detects Vite)
4. Optionally add `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables

---

## Project Structure
pitchforge-ai/
├── api/
│   └── generate.js           # Vercel serverless function → Claude API
├── src/
│   ├── pages/
│   │   ├── Landing.jsx        # Hero landing page
│   │   ├── FormPage.jsx       # Startup intake form
│   │   ├── LoadingPage.jsx    # Loading screen
│   │   └── ResultsPage.jsx    # 9-tab results dashboard
│   ├── utils/
│   │   └── generateMockData.js # Fallback mock data generator
│   ├── App.jsx                # App state + page routing
│   ├── main.jsx
│   └── index.css
├── vercel.json
└── package.json