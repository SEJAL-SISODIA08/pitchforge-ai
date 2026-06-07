export function generateMockData(f) {
  const ind  = f.industry || 'Technology'
  const name = f.name || 'Your Startup'
  const target = f.target || 'users'
  const country = f.country || 'India'
  const stage = f.stage || 'Idea'
  const funding = f.funding || '₹10L'
  const description = f.description || ''

  // ── Market data by industry ──
  const marketData = {
    Healthcare:   { tam:'$14B', cagr:'27%', gov:'strong healthcare digitisation push', pain:'fragmented patient records and high diagnostic costs' },
    Fintech:      { tam:'$31B', cagr:'32%', gov:'UPI and RBI sandbox policies', pain:'underbanked population and high transaction friction' },
    Edtech:       { tam:'$10B', cagr:'19%', gov:'NEP 2020 digital learning push', pain:'low teacher-to-student ratios and poor learning outcomes' },
    'AI / ML':    { tam:'$22B', cagr:'38%', gov:'IndiaAI mission funding', pain:'manual processes that AI can automate at scale' },
    SaaS:         { tam:'$18B', cagr:'24%', gov:'Digital India enterprise adoption', pain:'legacy software with poor UX and high licensing costs' },
    'E-commerce': { tam:'$111B', cagr:'21%', gov:'ONDC open network expansion', pain:'high customer acquisition costs and low repeat purchases' },
    CleanTech:    { tam:'$11B', cagr:'29%', gov:'PM Surya Ghar and green energy subsidies', pain:'expensive clean energy adoption and lack of financing' },
  }
  const mkt = marketData[ind] || { tam:'$8B', cagr:'22%', gov:'government digital initiative support', pain:'inefficient legacy systems and poor user experience' }

  // ── Competitors vary by industry ──
  const competitorMap = {
    Healthcare:   [
      { name:'Practo',       type:'Established player', strength:'Brand trust',      weakness:'High consultation fees',   threat:'High' },
      { name:'mFine',        type:'VC-backed',          strength:'AI diagnostics',   weakness:'Limited tier-2 reach',     threat:'Medium' },
      { name:'1mg',          type:'Listed company',     strength:'Pharmacy network', weakness:'Low margins',              threat:'Medium' },
      { name:'Local Clinics', type:'Unorganised',       strength:'Hyperlocal trust', weakness:'No tech stack',            threat:'Low' },
    ],
    Fintech: [
      { name:'Razorpay',   type:'Unicorn',     strength:'Developer ecosystem', weakness:'SMB onboarding friction', threat:'High' },
      { name:'BharatPe',   type:'VC-backed',   strength:'Merchant network',    weakness:'Profitability issues',    threat:'High' },
      { name:'PayU',       type:'MNC',         strength:'Global reach',        weakness:'Poor local support',      threat:'Medium' },
      { name:'Instamojo',  type:'Bootstrapped',strength:'Simple UX',           weakness:'Limited features',        threat:'Low' },
    ],
    Edtech: [
      { name:'BYJU\'S',    type:'Unicorn',      strength:'Brand recognition',  weakness:'High refund complaints',  threat:'High' },
      { name:'Unacademy',  type:'VC-backed',    strength:'Live classes',       weakness:'Burn rate',               threat:'High' },
      { name:'Vedantu',    type:'VC-backed',    strength:'Live tutoring',      weakness:'Scaling costs',           threat:'Medium' },
      { name:'Khan Academy',type:'Non-profit',  strength:'Free content',       weakness:'No vernacular depth',     threat:'Low' },
    ],
    'AI / ML': [
      { name:'Sarvam AI',  type:'Indian startup', strength:'Vernacular AI',    weakness:'Early stage',             threat:'High' },
      { name:'Krutrim',    type:'Ola-backed',     strength:'Infra investment',  weakness:'Limited API access',      threat:'High' },
      { name:'OpenAI',     type:'MNC',            strength:'GPT ecosystem',    weakness:'India pricing',           threat:'Medium' },
      { name:'Zoho AI',    type:'Bootstrapped',   strength:'Enterprise trust', weakness:'Closed ecosystem',        threat:'Medium' },
    ],
    SaaS: [
      { name:'Freshworks', type:'Listed company', strength:'SMB penetration',  weakness:'Enterprise gaps',         threat:'High' },
      { name:'Zoho',       type:'Bootstrapped',   strength:'Suite breadth',    weakness:'UX complexity',           threat:'High' },
      { name:'Salesforce', type:'MNC',            strength:'Enterprise deals', weakness:'High price point',        threat:'Medium' },
      { name:'Leadsquared',type:'VC-backed',      strength:'Sales focus',      weakness:'Limited integrations',    threat:'Low' },
    ],
    'E-commerce': [
      { name:'Meesho',     type:'SoftBank-backed',strength:'Tier-2 reach',     weakness:'Quality control',         threat:'High' },
      { name:'Flipkart',   type:'Walmart-owned',  strength:'Logistics network',weakness:'Commission rates',        threat:'High' },
      { name:'Amazon IN',  type:'MNC',            strength:'Prime ecosystem',  weakness:'Seller fees',             threat:'Medium' },
      { name:'ONDC',       type:'Govt initiative',strength:'Open network',     weakness:'Discovery UX',            threat:'Medium' },
    ],
    CleanTech: [
      { name:'Ola Electric', type:'Listed company',strength:'Brand + network', weakness:'Service quality',         threat:'High' },
      { name:'Waaree',       type:'Listed company',strength:'Solar scale',     weakness:'B2C penetration',         threat:'Medium' },
      { name:'Cleanmax',     type:'VC-backed',     strength:'Commercial solar',weakness:'Residential gaps',        threat:'Medium' },
      { name:'SunSource',    type:'Bootstrapped',  strength:'Niche focus',     weakness:'Limited geography',       threat:'Low' },
    ],
  }
  const competitors = competitorMap[ind] || [
    { name:`${ind} Leader`,   type:'Established player', strength:'Market share',   weakness:'Slow innovation',   threat:'High' },
    { name:`${ind} Disruptor`,type:'VC-backed',          strength:'Tech-first',     weakness:'High burn rate',    threat:'Medium' },
    { name:'Global MNC',      type:'MNC',                strength:'Global reach',   weakness:'Price premium',     threat:'Medium' },
    { name:'Local Competitor',type:'Bootstrapped',       strength:'Niche focus',    weakness:'Limited scale',     threat:'Low' },
  ]

  // ── Financials vary by stage ──
  const financialsByStage = {
    'Idea':              { revenue:[4, 18, 55, 140, 320],   profit:[-20, -12, 8,  60, 160],  users:[200,  1500,  8000,  30000,  90000] },
    'MVP':               { revenue:[12, 40, 110, 280, 600],  profit:[-30, -10, 20, 90, 220],  users:[500,  3000,  15000, 55000,  150000] },
    'Beta':              { revenue:[25, 75, 190, 420, 850],  profit:[-25, -5,  35, 130, 310], users:[1200, 6000,  25000, 80000,  200000] },
    'Revenue Generating':{ revenue:[60, 150, 350, 700, 1200],profit:[-10, 20,  80, 200, 450], users:[3000, 12000, 45000, 130000, 300000] },
  }
  const fin = financialsByStage[stage] || financialsByStage['Idea']

  // ── Score varies by stage ──
  const scoreByStage = { 'Revenue Generating':91, 'Beta':84, 'MVP':78, 'Idea':69 }
  const score = scoreByStage[stage] || 69

  // ── SWOT varies by industry ──
  const swotMap = {
    Healthcare:    {
      strengths:     [`AI diagnostics tailored for ${target}`, 'First-mover in underserved tier-2 segment', 'Strong regulatory compliance framework', 'Modular EMR + telemedicine stack', 'Clinical advisory partnerships'],
      weaknesses:    ['Regulatory approval timelines', 'High patient data liability', 'Doctor adoption resistance', 'Limited capital for medical-grade hardware', 'Long sales cycles in hospitals'],
      opportunities: [`${mkt.tam} market growing at ${mkt.cagr} CAGR`, 'Ayushman Bharat digital health expansion', 'Post-COVID telemedicine acceptance', 'Health insurance penetration rising', 'Vernacular health content gap'],
      threats:       ['DPDP Act data compliance', 'Established hospital chains building in-house tech', 'Price sensitivity in rural markets', 'Doctor consultation liability risks', 'Big Tech health entries (Google, Apple)'],
    },
    Fintech: {
      strengths:     [`Payment solution built for ${target}`, 'UPI-native architecture', 'Real-time fraud detection AI', 'RBI sandbox compliance ready', 'Low CAC through viral referrals'],
      weaknesses:    ['RBI licensing requirements', 'High fraud risk exposure', 'Thin margins on transactions', 'Bank partnership dependencies', 'Trust building with new users'],
      opportunities: [`${mkt.tam} market growing at ${mkt.cagr} CAGR`, '400M+ underbanked Indians', 'MSME credit gap of $400B', 'Cross-border remittance growth', 'ONDC financial layer expansion'],
      threats:       ['RBI policy changes', 'UPI monopoly by PhonePe/GPay', 'Cybersecurity breaches', 'Big bank digital arms', 'Global fintech entrants'],
    },
  }
  const swot = swotMap[ind] || {
    strengths:     [`AI-first platform tailored for ${ind}`, `First-mover advantage targeting ${target}`, '10x unit economics vs incumbents', 'Modular scalable architecture', 'Strong founding domain expertise'],
    weaknesses:    ['Early-stage brand recognition', 'Limited capital runway', 'Third-party infrastructure dependency', 'Small team scaling challenges', 'Regulatory compliance overhead'],
    opportunities: [`${mkt.tam} market growing at ${mkt.cagr} CAGR`, `${mkt.gov}`, 'Rising digital adoption in India', 'International expansion potential', 'Enterprise SaaS licensing opportunity'],
    threats:       ['Incumbents pivoting to our space', 'Regulatory changes', 'Price competition from funded rivals', 'Big Tech entering market', 'Talent acquisition in competitive market'],
  }

  return {
    problem: `The ${ind} sector faces a critical gap: ${target} struggle with ${mkt.pain}. This results in billions of rupees lost annually and poor outcomes for end users who deserve better.`,
    solution: `${name} delivers an AI-powered platform that directly addresses ${mkt.pain} for ${target} in ${country}. By combining intelligent automation with a simple UX, we reduce operational costs significantly while improving outcomes.`,
    usp: `Unlike generic solutions, ${name} is purpose-built for ${target} in the ${ind} space. Our advantage: deep domain focus, ${country}-first design, and an AI core that improves with every interaction — creating a defensible moat competitors cannot easily replicate.`,
    gtm: `Phase 1 (Months 1-6): Acquire first 50 ${target} through direct outreach and founder-led sales. Phase 2 (Months 7-18): Scale to 500+ via channel partners and referral loops. Phase 3 (Year 2+): Expand nationally with self-serve SaaS and explore ${country !== 'India' ? 'regional' : 'Southeast Asian'} markets.`,
    tam: mkt.tam, cagr: mkt.cagr,
    marketInsight: `The ${ind} market is projected to reach ${mkt.tam} by 2028, growing at ${mkt.cagr} CAGR. ${country} represents a high-growth opportunity backed by ${mkt.gov}. The target segment — ${target} — remains underserved by current solutions, creating a clear white space for ${name}.`,
    competitors,
    competitiveEdge: `${name} wins through three advantages: (1) purpose-built for ${target} unlike generic platforms, (2) ${country}-first pricing and UX that MNCs cannot match, and (3) an AI layer that gets smarter with usage creating a data moat. We can undercut incumbents on price while delivering superior outcomes.`,
    swot,
    revenueStreams: [
      { name:'Subscription SaaS',      desc:'Monthly/annual platform plans',       pct:40, color:'#7c5cfc' },
      { name:'Transaction Commission',  desc:'Fee per processed transaction',       pct:28, color:'#22d3a0' },
      { name:'Professional Services',   desc:'Onboarding, training, customisation', pct:18, color:'#60a5fa' },
      { name:'Data & API Licensing',    desc:'Anonymised insights to partners',     pct:9,  color:'#f59e0b' },
      { name:'Premium Features',        desc:'Advanced AI modules paywall',         pct:5,  color:'#f87171' },
    ],
    revenueStrategy: `${name} uses a multi-stream model anchored by predictable SaaS MRR. Professional services accelerate early revenue while the platform matures. Target blended gross margin: 65%+ by Year 2. Break-even projected at Month ${stage === 'Revenue Generating' ? '14' : stage === 'Beta' ? '20' : stage === 'MVP' ? '24' : '28'}.`,
    financials: fin,
    score,
    scoreDims: [
      { label:'Market Size',       val: ind === 'Fintech' || ind === 'E-commerce' ? 92 : ind === 'AI / ML' ? 90 : 82 },
      { label:'Revenue Model',     val: stage === 'Revenue Generating' ? 90 : stage === 'Beta' ? 82 : 74 },
      { label:'Scalability',       val: ind === 'SaaS' || ind === 'AI / ML' ? 88 : 76 },
      { label:'Defensibility',     val: stage === 'Revenue Generating' ? 80 : 68 },
      { label:'Competition',       val: ind === 'Healthcare' || ind === 'CleanTech' ? 78 : 70 },
      { label:'Founder-Market Fit',val: 65 },
    ],
    scoreRec: `${name} scores ${score}/100 — ${score >= 85 ? 'a strong investment candidate' : score >= 75 ? 'promising with clear gaps to address' : 'early stage with significant work ahead'}. Top priorities: ${stage === 'Idea' ? `(1) build an MVP, (2) get 3 paying ${target}, (3) validate the core assumption` : stage === 'MVP' ? `(1) reach 10 paying ${target}, (2) achieve product-market fit signal, (3) reduce churn` : `(1) show consistent MoM revenue growth, (2) improve unit economics, (3) build a repeatable sales process`}. Investors in the ${ind} space will specifically want to see evidence of ${target} retention.`,
    bmc: {
      keyPartners:       ind === 'Healthcare' ? ['Hospitals & clinics', 'Insurance providers', 'Pharma distributors', 'Cloud providers', 'Diagnostic labs'] :
                         ind === 'Fintech'    ? ['Banks & NBFCs', 'RBI sandbox partners', 'Payment networks', 'Cloud providers', 'Distribution agents'] :
                         ['Industry associations', 'Channel partners', 'Technology providers', 'Cloud providers', 'Distribution networks'],
      keyActivities:     ['Product development', 'Customer acquisition', 'Partner management', `${ind} domain expertise`],
      keyResources:      ['Proprietary AI platform', 'Domain expertise', 'Customer data', 'Partner network'],
      valueProposition:  [`Solves ${mkt.pain}`, `Built for ${target}`, `${country}-first design`, 'AI-powered automation', 'Simple onboarding', 'Transparent pricing'],
      customerRel:       ['Dedicated onboarding', 'In-app support', 'Community forum', 'Quarterly reviews'],
      channels:          ['Direct B2B sales', 'Partner referrals', 'Content marketing', 'Industry events'],
      customerSegments:  [target, `${ind} enterprises`, 'SMBs in ${ind}', `${country} market focus`],
      costStructure:     ['Product & engineering 40%', 'Sales & marketing 28%', 'Operations 18%', 'G&A 14%'],
      revenueStreams:     ['SaaS subscriptions', 'Transaction fees', 'Professional services', 'Data licensing'],
    },
    slides: [
      { num:'01', title:'Cover',                  preview:`${name} — ${description.substring(0, 65) || `AI-powered solution for ${target} in ${ind}`}`,  tag:'Introduction' },
      { num:'02', title:'The Problem',             preview:`${target} face: ${mkt.pain}.`,                                                                  tag:'Context' },
      { num:'03', title:'Our Solution',            preview:`${name}: purpose-built AI platform for ${target}.`,                                             tag:'Product' },
      { num:'04', title:'Market Opportunity',      preview:`${mkt.tam} TAM · ${mkt.cagr} CAGR · ${country}-first`,                                         tag:'Market' },
      { num:'05', title:'Business Model',          preview:'SaaS subscriptions + transaction fees + professional services.',                                 tag:'Revenue' },
      { num:'06', title:'Competitive Advantage',   preview:`Purpose-built for ${target}. ${country}-first pricing. AI data moat.`,                          tag:'Strategy' },
      { num:'07', title:'Traction',                preview:`Stage: ${stage}. Building towards first ${stage === 'Idea' ? 'MVP' : 'paying customers'}.`,     tag:'Proof' },
      { num:'08', title:'Revenue Model',           preview:'SaaS 40% · Transactions 28% · Services 18%',                                                    tag:'Financials' },
      { num:'09', title:'Go-To-Market',            preview:`Direct → partners → self-serve → ${country !== 'India' ? 'regional' : 'SEA'} expansion.`,      tag:'Growth' },
      { num:'10', title:'Financial Projections',   preview:`₹${fin.revenue[0]}L → ₹${fin.revenue[4]}L over 5 years.`,                                      tag:'Financials' },
      { num:'11', title:'Funding Ask',             preview:`${funding} to reach next milestone in 18 months.`,                                              tag:'Investment' },
      { num:'12', title:'Thank You',               preview:`Let's build a smarter ${country} together.`,                                                    tag:'Close' },
    ],
  }
}