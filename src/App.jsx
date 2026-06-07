import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import FormPage from './pages/FormPage.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

export default function App() {
  const [screen, setScreen] = useState('landing') // landing | form | loading | results
  const [startupData, setStartupData] = useState(null)
  const [pitchData, setPitchData] = useState(null)

  const handleGenerate = async (formData) => {
    setStartupData(formData)
    setScreen('loading')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      setPitchData(data)
      setScreen('results')
    } catch (err) {
      console.error(err)
      // Fallback to mock data if API fails
      setPitchData(generateMockData(formData))
      setScreen('results')
    }
  }

  return (
    <>
      {screen === 'landing'  && <Landing  onStart={() => setScreen('form')} />}
      {screen === 'form'     && <FormPage onBack={() => setScreen('landing')} onSubmit={handleGenerate} />}
      {screen === 'loading'  && <LoadingPage />}
      {screen === 'results'  && <ResultsPage data={pitchData} startup={startupData} onReset={() => setScreen('landing')} />}
    </>
  )
}

function generateMockData(f) {
  const ind = f.industry || 'Technology'
  const mktSizes = { Healthcare:'$14B', Fintech:'$31B', Edtech:'$10B', 'AI / ML':'$22B', SaaS:'$18B', 'E-commerce':'$111B' }
  const growths  = { Healthcare:'27%', Fintech:'32%', Edtech:'19%', 'AI / ML':'38%', SaaS:'24%', 'E-commerce':'21%' }
  const tam = mktSizes[ind] || '$8B'
  const cagr = growths[ind] || '22%'
  return {
    problem: `Over 60% of ${f.target || 'target users'} in the ${ind} space lack access to affordable, efficient solutions. Current offerings are fragmented, expensive, and ignore the core needs of underserved segments — costing businesses and consumers billions annually.`,
    solution: `${f.name} leverages cutting-edge AI to deliver measurable outcomes for ${f.target || 'users'}. Our platform reduces friction by 80%, cuts costs by 60%, and integrates seamlessly into existing workflows — making adoption fast and retention high.`,
    usp: `${f.name} is the only solution combining real-time AI intelligence with hyperlocal distribution in the ${ind} space — achieving 3× faster outcomes at 60% lower cost. Our proprietary data flywheel creates a defensible moat competitors cannot replicate.`,
    gtm: `Phase 1 (Months 1-6): 50 pilot deployments via government and NGO partnerships. Phase 2 (Months 7-18): Franchise expansion targeting 500+ deployments in 10 regions. Phase 3 (Year 2+): Pan-India rollout with SaaS licensing and international expansion to SE Asia.`,
    tam, cagr,
    marketInsight: `The ${ind} market is experiencing rapid digital transformation. ${f.name} targets the underserved ${f.target || 'segment'} — a cohort currently ignored by legacy players. Our beachhead market offers massive potential with rapidly improving digital infrastructure.`,
    competitors: [
      { name:'Incumbent A', type:'Legacy player', strength:'Market share', weakness:'Slow innovation', threat:'High' },
      { name:'Startup B',   type:'VC-backed',    strength:'Tech-first',   weakness:'High burn',       threat:'Medium' },
      { name:'Enterprise C', type:'MNC',         strength:'Global reach', weakness:'Price premium',   threat:'Medium' },
      { name:'Startup D',   type:'Bootstrapped', strength:'Niche focus',  weakness:'Limited scale',   threat:'Low' },
    ],
    competitiveEdge: `${f.name}'s key advantage lies in its AI-first architecture combined with hyperlocal distribution — a combination no competitor offers. Our network effects and data moat grow stronger with every transaction.`,
    swot: {
      strengths:['AI-first architecture with proprietary data flywheel','First-mover advantage in underserved segment','10× unit economics vs incumbents','Modular, scalable tech platform','Strong founding team with domain expertise'],
      weaknesses:['Early-stage brand recognition','Limited capital runway','Dependency on third-party infrastructure','Small team scaling challenges','Regulatory compliance overhead'],
      opportunities:[`${tam} market with ${cagr} CAGR`,'Government digital initiatives','Rising mobile penetration in Tier 2-4 cities','International expansion opportunity','B2B SaaS licensing to enterprises'],
      threats:['Well-funded incumbents pivoting to our space','Regulatory changes','Price wars eroding margins','Technology disruption from Big Tech','Talent acquisition challenges'],
    },
    revenueStreams:[
      { name:'Subscription SaaS',       desc:'Monthly/annual plans',            pct:40, color:'#7c5cfc' },
      { name:'Transaction Commission',  desc:'2–5% fee per transaction',        pct:28, color:'#22d3a0' },
      { name:'Hardware / Device Sales', desc:'One-time device revenue',         pct:18, color:'#60a5fa' },
      { name:'Data & API Licensing',    desc:'Anonymised insights to partners', pct: 9, color:'#f59e0b' },
      { name:'Premium Features',        desc:'Advanced AI behind paywall',      pct: 5, color:'#f87171' },
    ],
    revenueStrategy: `${f.name} follows a multi-stream revenue model designed for capital efficiency. Subscription SaaS provides predictable MRR, while transaction commissions scale with volume. Target blended gross margin: 72% by Year 2, with SaaS segment reaching 85%+ at scale.`,
    financials: {
      revenue: [28,92,245,520,1100],
      profit:  [-42,-18,38,145,380],
      users:   [1200,8500,32000,95000,250000],
    },
    score: f.stage === 'Revenue Generating' ? 91 : f.stage === 'Beta' ? 84 : f.stage === 'MVP' ? 78 : 72,
    scoreDims:[
      { label:'Market Size',       val:90 },
      { label:'Revenue Model',     val:85 },
      { label:'Scalability',       val:82 },
      { label:'Defensibility',     val:75 },
      { label:'Competition',       val:78 },
      { label:'Founder-Market Fit',val:70 },
    ],
    scoreRec: `${f.name} scores strongly on market opportunity and revenue model defensibility. To improve further: (1) build 3–6 months of revenue traction data, (2) secure 2–3 design partnerships with enterprise clients, and (3) strengthen the founding team with a technical co-founder. Investors will want to see a clear path to 10× in 5 years — your unit economics currently support this narrative.`,
    bmc: {
      keyPartners:    ['Government bodies','NGO networks','Cloud providers','Logistics partners','Distribution channels'],
      keyActivities:  ['AI model training','Platform development','Sales & partnerships','Customer support'],
      keyResources:   ['AI/ML platform','Tech team','Brand & IP','Partner network'],
      valueProposition:['24/7 availability','AI-powered insights','10× cost reduction','Hyperlocal reach','Vernacular support'],
      customerRel:    ['Self-service portal','Community support','Account managers','Loyalty programs'],
      channels:       ['Direct sales','Mobile app','Partner network','Social media'],
      customerSegments:[f.target||'End users','SME partners','Enterprise clients','Government bodies'],
      costStructure:  ['Tech infrastructure 35%','Sales & marketing 25%','Operations 20%','R&D 15%','G&A 5%'],
      revenueStreams:  ['Subscription SaaS','Transaction commission','Hardware/device sales','Data licensing'],
    },
    slides: [
      { num:'01', title:'Cover',                preview:`${f.name} — ${(f.description||'').substring(0,70)}...`, tag:'Introduction' },
      { num:'02', title:'The Problem',          preview:'Market pain points, user struggles, and the cost of inaction.', tag:'Context' },
      { num:'03', title:'Our Solution',         preview:`How ${f.name} solves the problem uniquely and efficiently.`, tag:'Product' },
      { num:'04', title:'Market Opportunity',   preview:`${tam} TAM · ${cagr} CAGR`, tag:'Market' },
      { num:'05', title:'Business Model',       preview:'Subscriptions, commissions, licensing — multi-stream revenue.', tag:'Revenue' },
      { num:'06', title:'Competitive Advantage',preview:'AI moat, hyperlocal distribution, data flywheel advantage.', tag:'Strategy' },
      { num:'07', title:'Traction',             preview:'Early pilots, partnerships, and user validation metrics.', tag:'Proof' },
      { num:'08', title:'Revenue Model',        preview:'SaaS 40% · Transactions 28% · Hardware 18% · Data 9%', tag:'Financials' },
      { num:'09', title:'Go-To-Market',         preview:'Phase 1 pilots → Phase 2 franchise → Phase 3 pan-India.', tag:'Growth' },
      { num:'10', title:'Financial Projections',preview:'₹28L → ₹1,100L revenue over 5 years. Break-even Month 28.', tag:'Financials' },
      { num:'11', title:'Funding Ask',          preview:`${f.funding||'₹50L'} seed round for 18 months runway.`, tag:'Investment' },
      { num:'12', title:'Thank You',            preview:`Let's build the future of ${ind} together.`, tag:'Close' },
    ],
  }
}
