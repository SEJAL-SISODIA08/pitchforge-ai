export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  const body = await req.json()
  const { name, description, industry, target, stage, funding, country } = body

  const prompt = `You are an expert startup analyst and pitch deck creator. Analyze this startup and return a detailed JSON response.

Startup Details:
- Name: ${name}
- Description: ${description}
- Industry: ${industry || 'Technology'}
- Target Customers: ${target || 'General consumers'}
- Stage: ${stage || 'Idea'}
- Funding Needed: ${funding || 'Not specified'}
- Country: ${country || 'India'}

Return ONLY a valid JSON object (no markdown, no backticks) with this exact structure:
{
  "problem": "2-3 sentence compelling problem statement with specific statistics",
  "solution": "2-3 sentence clear solution description",
  "usp": "2 sentence unique selling proposition with competitive differentiation",
  "gtm": "3 phase go-to-market strategy",
  "tam": "Market size like $14B",
  "cagr": "Growth rate like 27%",
  "marketInsight": "2-3 sentences about market trends and opportunity",
  "competitors": [
    {"name": "CompanyName", "type": "Company type", "strength": "Main strength", "weakness": "Main weakness", "threat": "High|Medium|Low"},
    {"name": "CompanyName", "type": "Company type", "strength": "Main strength", "weakness": "Main weakness", "threat": "High|Medium|Low"},
    {"name": "CompanyName", "type": "Company type", "strength": "Main strength", "weakness": "Main weakness", "threat": "High|Medium|Low"},
    {"name": "CompanyName", "type": "Company type", "strength": "Main strength", "weakness": "Main weakness", "threat": "High|Medium|Low"}
  ],
  "competitiveEdge": "2 sentence competitive advantage description",
  "swot": {
    "strengths": ["item1", "item2", "item3", "item4", "item5"],
    "weaknesses": ["item1", "item2", "item3", "item4", "item5"],
    "opportunities": ["item1", "item2", "item3", "item4", "item5"],
    "threats": ["item1", "item2", "item3", "item4", "item5"]
  },
  "revenueStreams": [
    {"name": "Stream name", "desc": "Short description", "pct": 40, "color": "#7c5cfc"},
    {"name": "Stream name", "desc": "Short description", "pct": 28, "color": "#22d3a0"},
    {"name": "Stream name", "desc": "Short description", "pct": 18, "color": "#60a5fa"},
    {"name": "Stream name", "desc": "Short description", "pct": 9, "color": "#f59e0b"},
    {"name": "Stream name", "desc": "Short description", "pct": 5, "color": "#f87171"}
  ],
  "revenueStrategy": "2-3 sentence revenue strategy explanation",
  "financials": {
    "revenue": [30, 95, 250, 530, 1100],
    "profit": [-45, -20, 40, 150, 390],
    "users": [1000, 8000, 30000, 90000, 240000]
  },
  "score": 78,
  "scoreDims": [
    {"label": "Market Size", "val": 85},
    {"label": "Revenue Model", "val": 80},
    {"label": "Scalability", "val": 78},
    {"label": "Defensibility", "val": 72},
    {"label": "Competition", "val": 75},
    {"label": "Founder-Market Fit", "val": 70}
  ],
  "scoreRec": "2-3 sentences with specific improvement recommendations for this startup",
  "bmc": {
    "keyPartners": ["Partner 1", "Partner 2", "Partner 3", "Partner 4", "Partner 5"],
    "keyActivities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
    "keyResources": ["Resource 1", "Resource 2", "Resource 3", "Resource 4"],
    "valueProposition": ["Value 1", "Value 2", "Value 3", "Value 4", "Value 5", "Value 6"],
    "customerRel": ["Relation 1", "Relation 2", "Relation 3", "Relation 4"],
    "channels": ["Channel 1", "Channel 2", "Channel 3", "Channel 4"],
    "customerSegments": ["Segment 1", "Segment 2", "Segment 3", "Segment 4"],
    "costStructure": ["Cost 1 35%", "Cost 2 25%", "Cost 3 20%", "Cost 4 15%", "Cost 5 5%"],
    "revenueStreams": ["Stream 1", "Stream 2", "Stream 3", "Stream 4"]
  },
  "slides": [
    {"num": "01", "title": "Cover", "preview": "Startup tagline and vision", "tag": "Introduction"},
    {"num": "02", "title": "The Problem", "preview": "Key pain points description", "tag": "Context"},
    {"num": "03", "title": "Our Solution", "preview": "How you solve the problem", "tag": "Product"},
    {"num": "04", "title": "Market Opportunity", "preview": "TAM/SAM/SOM overview", "tag": "Market"},
    {"num": "05", "title": "Business Model", "preview": "Revenue streams overview", "tag": "Revenue"},
    {"num": "06", "title": "Competitive Advantage", "preview": "Moat and differentiation", "tag": "Strategy"},
    {"num": "07", "title": "Traction", "preview": "Early metrics and validation", "tag": "Proof"},
    {"num": "08", "title": "Revenue Model", "preview": "Detailed revenue breakdown", "tag": "Financials"},
    {"num": "09", "title": "Go-To-Market", "preview": "Phase-wise expansion plan", "tag": "Growth"},
    {"num": "10", "title": "Financial Projections", "preview": "5-year revenue forecast", "tag": "Financials"},
    {"num": "11", "title": "Funding Ask", "preview": "Investment ask and use of funds", "tag": "Investment"},
    {"num": "12", "title": "Thank You", "preview": "Contact and next steps", "tag": "Close"}
  ]
}`

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!anthropicRes.ok) {
      throw new Error(`Anthropic API error: ${anthropicRes.status}`)
    }

    const anthropicData = await anthropicRes.json()
    const text = anthropicData.content[0].text.trim()

    // Parse JSON (strip any accidental markdown fences)
    const clean = text.replace(/^```json\s*/,'').replace(/^```\s*/,'').replace(/\s*```$/,'').trim()
    const parsed = JSON.parse(clean)

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (err) {
    console.error('API error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
