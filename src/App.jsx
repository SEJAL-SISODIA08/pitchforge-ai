import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import FormPage from './pages/FormPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [startupData, setStartupData] = useState(null)
  const [pitchData, setPitchData] = useState(null)

  const handleGenerate = (formData) => {
    setStartupData(formData)
    setScreen('loading')
    setTimeout(() => {
      setPitchData(generateMockData(formData))
      setScreen('results')
    }, 5000)
  }

  return (
    <>
      {screen === 'landing'  && <Landing  onStart={() => setScreen('form')} />}
      {screen === 'form'     && <FormPage onBack={() => setScreen('landing')} onSubmit={handleGenerate} />}
      {screen === 'loading'  && <LoadingPage />}
      {screen === 'results'  && <ResultsPage data={pitchData} startup={startupData} onReset={() => { setPitchData(null); setScreen('landing'); }} />}
    </>
  )
}

function generateMockData(f) {
  const ind = f.industry || 'Technology'
  const mktSizes = { Healthcare:'$14B', Fintech:'$31B', Edtech:'$10B', 'AI / ML':'$22B', SaaS:'$18B', 'E-commerce':'$111B', CleanTech:'$11B' }
  const growths  = { Healthcare:'27%', Fintech:'32%', Edtech:'19%', 'AI / ML':'38%', SaaS:'24%', 'E-commerce':'21%', CleanTech:'29%' }
  const tam  = mktSizes[ind] || '$8B'
  const cagr = growths[ind]  || '22%'
  return {
    problem: `The ${ind} sector faces a critical gap: ${f.target||'target users'} struggle with inefficient, costly, and outdated systems. Over 70% of organizations report existing solutions fail to meet their needs, resulting in billions lost annually.`,
    solution: `${f.name} delivers an AI-powered platform that automates core workflows for ${f.target||'users'}, reducing operational costs by 60% and improving efficiency by 3x compared to manual processes.`,
    usp: `${f.name} is the only solution in ${ind} combining AI automation with hyperlocal deployment — achieving 3x better outcomes at 60% lower cost. Our proprietary data flywheel creates a defensible moat that strengthens with every user.`,
    gtm: `Phase 1 (Months 1-6): Pilot with 10 ${f.target||'clients'} via direct outreach. Phase 2 (Months 7-18): Scale to 100+ clients using channel partners. Phase 3 (Year 2+): National rollout with SaaS licensing and international expansion.`,
    tam, cagr,
    marketInsight: `The ${ind} market is projected to reach ${tam} by 2028, growing at ${cagr} CAGR. ${f.country||'India'} represents a high-growth opportunity with strong government support and rising digital adoption among ${f.target||'organizations'}.`,
    competitors: [
      { name:'Incumbent A', type:'Legacy player', strength:'Market share', weakness:'Slow innovation', threat:'High' },
      { name:'Startup B', type:'VC-backed', strength:'Tech-first', weakness:'High burn rate', threat:'Medium' },
      { name:'Enterprise C', type:'MNC', strength:'Global reach', weakness:'Price premium', threat:'Medium' },
      { name:'Startup D', type:'Bootstrapped', strength:'Niche focus', weakness:'Limited scale', threat:'Low' },
    ],
    competitiveEdge: `${f.name} wins through AI-first architecture combined with deep understanding of ${f.target||'the target market'}. Our cost structure allows us to undercut competitors by 40% while delivering superior outcomes.`,
    swot: {
      strengths: [`AI-first platform tailored for ${ind}`,'First-mover in underserved segment','10x unit economics vs incumbents','Modular scalable architecture','Strong founding team'],
      weaknesses: ['Early-stage brand recognition','Limited capital runway','Third-party infrastructure dependency','Small team scaling challenges','Regulatory compliance overhead'],
      opportunities: [`${tam} market growing at ${cagr} CAGR`,'Government policy tailwinds in India','Rising digital adoption','International expansion potential','Enterprise SaaS licensing'],
      threats: ['Incumbents pivoting to our space','Regulatory changes','Price competition','Big Tech entering market','Talent acquisition challenges'],
    },
    revenueStreams: [
      { name:'Subscription SaaS', desc:'Monthly/annual platform plans', pct:40, color:'#7c5cfc' },
      { name:'Transaction Commission', desc:'Fee per processed transaction', pct:28, color:'#22d3a0' },
      { name:'Hardware / Device Sales', desc:'One-time deployment revenue', pct:18, color:'#60a5fa' },
      { name:'Data & API Licensing', desc:'Anonymised insights to partners', pct:9, color:'#f59e0b' },
      { name:'Premium Features', desc:'Advanced AI modules paywall', pct:5, color:'#f87171' },
    ],
    revenueStrategy: `${f.name} uses a multi-stream revenue model for capital efficiency. SaaS provides predictable MRR while hardware creates upfront cash flow. Target blended gross margin: 68% by Year 2. Monthly target of ${f.monthlyRevTarget||'₹1,00,000'} achievable by Month 8.`,
    financials: {
      revenue: [18, 65, 180, 420, 900],
      profit:  [-35, -15, 28, 120, 320],
      users:   [800, 5000, 22000, 75000, 200000],
    },
    score: f.stage==='Revenue Generating' ? 91 : f.stage==='Beta' ? 84 : f.stage==='MVP' ? 78 : 72,
    scoreDims: [
      { label:'Market Size', val:88 },
      { label:'Revenue Model', val:82 },
      { label:'Scalability', val:80 },
      { label:'Defensibility', val:73 },
      { label:'Competition', val:76 },
      { label:'Founder-Market Fit', val:70 },
    ],
    scoreRec: `${f.name} scores strongly on market opportunity and revenue model clarity. To improve: (1) validate with 3-5 paying pilot customers, (2) build a working MVP, (3) add a technical co-founder. Investors will want evidence of real user demand before committing to the ${f.funding||'₹10L'} ask.`,
    bmc: {
      keyPartners: ['Municipal corporations','NGOs & CSR partners','Hardware manufacturers','Cloud providers','Distribution partners'],
      keyActivities: ['AI model development','Hardware deployment','Sales & partnerships','Customer support'],
      keyResources: ['Proprietary AI platform','Deployment team','Brand & IP','Partner network'],
      valueProposition: ['AI-powered automation','Real-time analytics','60% cost reduction','Easy deployment','Compliance tools','Vernacular support'],
      customerRel: ['Dedicated onboarding','Self-service portal','Community groups','Loyalty programs'],
      channels: ['Direct B2B sales','Government tenders','Partner referrals','Digital marketing'],
      customerSegments: [f.target||'End users','Municipal bodies','Enterprise clients','Educational institutions'],
      costStructure: ['Hardware & manufacturing 35%','Sales & marketing 25%','Operations 20%','R&D 15%','G&A 5%'],
      revenueStreams: ['SaaS subscriptions','Transaction fees','Hardware sales','Data licensing'],
    },
    slides: [
      { num:'01', title:'Cover', preview:`${f.name} — ${(f.description||'').substring(0,65)}...`, tag:'Introduction' },
      { num:'02', title:'The Problem', preview:'Massive inefficiency and waste in current systems.', tag:'Context' },
      { num:'03', title:'Our Solution', preview:`${f.name}: AI-powered platform for ${f.target||'users'}.`, tag:'Product' },
      { num:'04', title:'Market Opportunity', preview:`${tam} TAM · ${cagr} CAGR · India-first`, tag:'Market' },
      { num:'05', title:'Business Model', preview:'SaaS + hardware + data licensing.', tag:'Revenue' },
      { num:'06', title:'Competitive Advantage', preview:'AI moat + hyperlocal deployment + data flywheel.', tag:'Strategy' },
      { num:'07', title:'Traction', preview:'Pilot partnerships secured, LOIs signed.', tag:'Proof' },
      { num:'08', title:'Revenue Model', preview:'SaaS 40% · Transactions 28% · Hardware 18%', tag:'Financials' },
      { num:'09', title:'Go-To-Market', preview:'Pilots → city rollout → national → international.', tag:'Growth' },
      { num:'10', title:'Financial Projections', preview:'₹18L → ₹900L over 5 years. Break-even Month 26.', tag:'Financials' },
      { num:'11', title:'Funding Ask', preview:`${f.funding||'₹10L'} seed for 18 months runway.`, tag:'Investment' },
      { num:'12', title:'Thank You', preview:`Let's build a smarter ${f.country||'India'}.`, tag:'Close' },
    ],
  }
}
