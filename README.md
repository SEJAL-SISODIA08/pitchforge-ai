# ⚡ PitchForge AI

> Turn your startup idea into an investor-ready pitch deck in minutes.

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Push to GitHub
```bash
cd pitchforge
git init
git add .
git commit -m "Initial commit — PitchForge AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pitchforge-ai.git
git push -u origin main
```

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your `pitchforge-ai` repository
4. Click **"Deploy"** (Vercel auto-detects Vite)

### Step 3 — Add your Claude API key
1. In Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-...` (get from console.anthropic.com)
3. Click **Save** → then **Redeploy**

Your app is now live at `https://pitchforge-ai.vercel.app` 🎉

## 🛠 Local Development

```bash
npm install
# Create .env.local with:
# ANTHROPIC_API_KEY=sk-ant-your-key-here
npm run dev
```

## 📁 Project Structure
```
pitchforge/
├── api/
│   └── generate.js        # Vercel serverless → Claude API
├── src/
│   ├── pages/
│   │   ├── Landing.jsx    # Hero landing page
│   │   ├── FormPage.jsx   # Startup intake form
│   │   ├── LoadingPage.jsx
│   │   └── ResultsPage.jsx # 9-tab results dashboard
│   ├── App.jsx            # Router + state
│   ├── main.jsx
│   └── index.css
├── vercel.json
└── package.json
```

## ✨ Features
- **9-tab Results Dashboard**: Overview, BMC, Market, Competitors, SWOT, Revenue, Financials, Investor Score, Pitch Deck
- **Claude AI powered**: Real AI analysis for every startup
- **Graceful fallback**: Works with mock data even without API key
- **Recharts**: Interactive financial projection charts
- **Zero backend**: Everything runs on Vercel edge functions
