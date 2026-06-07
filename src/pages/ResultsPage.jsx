import { useState, useEffect, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'

const TABS = [
  { id:'overview',    label:'Overview' },
  { id:'bmc',         label:'Business Model' },
  { id:'market',      label:'Market' },
  { id:'competitor',  label:'Competitors' },
  { id:'swot',        label:'SWOT' },
  { id:'revenue',     label:'Revenue' },
  { id:'financial',   label:'Financials' },
  { id:'score',       label:'Investor Score' },
  { id:'deck',        label:'Pitch Deck' },
]

function Card({ title, children, style }) {
  return (
    <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'1.5rem', marginBottom:'1rem', ...style }}>
      {title && <div style={{ fontSize:11, fontWeight:700, color:'var(--text3)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'0.75rem' }}>{title}</div>}
      {children}
    </div>
  )
}

function SectionTitle({ children, badge }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:'1.5rem' }}>
      <h2 style={{ fontSize:'1.4rem', fontWeight:800 }}>{children}</h2>
      {badge && <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, background:'rgba(124,92,252,0.2)', color:'var(--accent2)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{badge}</span>}
    </div>
  )
}

export default function ResultsPage({ data, startup, onReset }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [finType, setFinType] = useState('revenue')
  const [scoreAnimated, setScoreAnimated] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setScoreAnimated(true), 400)
  }, [])

  if (!data) return null

  const finChartData = ['Y1','Y2','Y3','Y4','Y5'].map((y, i) => ({
    year: y,
    value: finType === 'revenue' ? data.financials.revenue[i]
         : finType === 'profit'  ? data.financials.profit[i]
         : data.financials.users[i],
  }))

  const tagColors = {
    'Introduction':'#7c5cfc','Context':'#f59e0b','Product':'#22d3a0',
    'Market':'#60a5fa','Revenue':'#a78bfa','Strategy':'#f87171',
    'Proof':'#22d3a0','Financials':'#60a5fa','Growth':'#7c5cfc',
    'Investment':'#f87171','Close':'#22d3a0',
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column' }}>
      {/* NAV */}
      <nav style={{ background:'var(--card)', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 1.5rem', flexWrap:'wrap', gap:'0.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', padding:'1rem 0', flexShrink:0 }}>
            <div style={{ width:24, height:24, background:'var(--accent)', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13 }}>⚡</div>
            PitchForge
          </div>
          <div ref={navRef} style={{ display:'flex', gap:4, overflowX:'auto', padding:'12px 0', scrollbarWidth:'none' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                whiteSpace:'nowrap', background: activeTab===t.id ? 'var(--accent)' : 'transparent',
                border:'none', color: activeTab===t.id ? '#fff' : 'var(--text2)',
                fontSize:13, padding:'7px 14px', borderRadius:7, cursor:'pointer',
                transition:'all 0.2s', fontFamily:'DM Sans, sans-serif',
              }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:8, flexShrink:0 }}>
            <button onClick={onReset} style={{ background:'var(--bg3)', border:'1px solid var(--border2)', color:'var(--text)', borderRadius:8, padding:'8px 14px', fontSize:13, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              + New Pitch
            </button>
          </div>
        </div>
      </nav>

      {/* BODY */}
      <div style={{ padding:'2rem 1.5rem', maxWidth:900, margin:'0 auto', width:'100%' }}>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            <SectionTitle badge="AI Generated">Startup Overview</SectionTitle>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px,1fr))', gap:12, marginBottom:'1.5rem' }}>
              {[
                { label:'Market Size', val:data.tam, color:'var(--green)' },
                { label:'Growth CAGR', val:data.cagr, color:'var(--amber)' },
                { label:'Stage',       val:startup.stage||'Idea', color:'var(--blue)' },
                { label:'Funding Ask', val:startup.funding||'₹50L', color:'var(--accent2)' },
              ].map(m => (
                <div key={m.label} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'1rem' }}>
                  <div style={{ fontSize:12, color:'var(--text3)', marginBottom:6 }}>{m.label}</div>
                  <div style={{ fontSize:'1.3rem', fontWeight:800, fontFamily:'Syne, sans-serif', color:m.color }}>{m.val}</div>
                </div>
              ))}
            </div>
            <Card title="Problem Statement"><p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.problem}</p></Card>
            <Card title="Our Solution"><p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.solution}</p></Card>
            <Card title="Unique Selling Proposition"><p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.usp}</p></Card>
            <Card title="Go-To-Market Strategy"><p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.gtm}</p></Card>
          </div>
        )}

        {/* ── BMC ── */}
        {activeTab === 'bmc' && (
          <div>
            <SectionTitle badge="9 Blocks">Business Model Canvas</SectionTitle>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8 }}>
              {[
                { title:'Key Partners',     items:data.bmc.keyPartners,        span:'1 / span 1 / 3 / span 1' },
                { title:'Key Activities',   items:data.bmc.keyActivities,      span:'1 / 2 / 2 / 3' },
                { title:'Value Prop',       items:data.bmc.valueProposition,   span:'1 / 3 / 3 / 4', accent:true },
                { title:'Customer Rel',     items:data.bmc.customerRel,        span:'1 / 4 / 2 / 5' },
                { title:'Segments',         items:data.bmc.customerSegments,   span:'1 / 5 / 3 / 6' },
                { title:'Key Resources',    items:data.bmc.keyResources,       span:'2 / 2 / 3 / 3' },
                { title:'Channels',         items:data.bmc.channels,           span:'2 / 4 / 3 / 5' },
              ].map((cell, i) => (
                <div key={i} style={{ gridArea:cell.span, background: cell.accent ? 'rgba(124,92,252,0.1)' : 'var(--bg2)', border:`1px solid ${cell.accent ? 'rgba(124,92,252,0.3)' : 'var(--border)'}`, borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:10, fontWeight:700, color: cell.accent ? 'var(--accent2)' : 'var(--text3)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:8 }}>{cell.title}</div>
                  <ul style={{ listStyle:'none' }}>
                    {cell.items.map(it => <li key={it} style={{ fontSize:12, color:'var(--text2)', padding:'3px 0', borderBottom:'1px solid var(--border)' }}>· {it}</li>)}
                  </ul>
                </div>
              ))}
              <div style={{ gridArea:'3 / 1 / 4 / 3', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:12 }}>
                <div style={{ fontSize:10, fontWeight:700, color:'var(--text3)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:8 }}>Cost Structure</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {data.bmc.costStructure.map(c => <span key={c} style={{ fontSize:12, color:'var(--text2)' }}>· {c}</span>)}
                </div>
              </div>
              <div style={{ gridArea:'3 / 3 / 4 / 6', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:10, padding:12 }}>
                <div style={{ fontSize:10, fontWeight:700, color:'var(--text3)', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:8 }}>Revenue Streams</div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {data.bmc.revenueStreams.map(r => <span key={r} style={{ fontSize:12, color:'var(--text2)' }}>· {r}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MARKET ── */}
        {activeTab === 'market' && (
          <div>
            <SectionTitle badge="TAM / SAM / SOM">Market Analysis</SectionTitle>
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'center', gap:'2rem', padding:'2rem 0', flexWrap:'wrap' }}>
              {[
                { label:'TAM', sub:'Total Addressable', size:170, val:data.tam, color:'rgba(124,92,252,0.2)', border:'rgba(124,92,252,0.4)', tc:'var(--accent2)' },
                { label:'SAM', sub:'Serviceable Available', size:125, val:'35% of TAM', color:'rgba(96,165,250,0.15)', border:'rgba(96,165,250,0.35)', tc:'var(--blue)' },
                { label:'SOM', sub:'Serviceable Obtainable', size:88, val:'$180M Y3', color:'rgba(34,211,160,0.15)', border:'rgba(34,211,160,0.35)', tc:'var(--green)' },
              ].map(m => (
                <div key={m.label} style={{ textAlign:'center' }}>
                  <div style={{ width:m.size, height:m.size, borderRadius:'50%', background:m.color, border:`2px solid ${m.border}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                    <span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:m.size > 140 ? '1.3rem' : m.size > 100 ? '1rem' : '0.85rem', color:m.tc }}>{m.val}</span>
                    <span style={{ fontSize:10, color:'var(--text2)', marginTop:2 }}>{m.label}</span>
                  </div>
                  <div style={{ fontSize:12, color:'var(--text2)' }}>{m.sub}</div>
                </div>
              ))}
            </div>
            <Card title="Market Insights"><p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.marketInsight}</p></Card>
          </div>
        )}

        {/* ── COMPETITOR ── */}
        {activeTab === 'competitor' && (
          <div>
            <SectionTitle badge="AI Identified">Competitor Analysis</SectionTitle>
            <Card>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr>
                    {['Competitor','Strength','Weakness','Threat'].map(h => (
                      <th key={h} style={{ textAlign:'left', fontSize:12, color:'var(--text3)', letterSpacing:'0.06em', textTransform:'uppercase', padding:'10px 14px', borderBottom:'1px solid var(--border)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.competitors.map(c => (
                    <tr key={c.name}>
                      <td style={{ padding:'14px', borderBottom:'1px solid var(--border)' }}>
                        <div style={{ fontWeight:600, color:'var(--text)', fontSize:14 }}>{c.name}</div>
                        <div style={{ fontSize:12, color:'var(--text3)' }}>{c.type}</div>
                      </td>
                      <td style={{ padding:'14px', borderBottom:'1px solid var(--border)' }}>
                        <span style={{ background:'rgba(34,211,160,0.12)', color:'var(--green)', borderRadius:6, padding:'3px 10px', fontSize:12 }}>{c.strength}</span>
                      </td>
                      <td style={{ padding:'14px', borderBottom:'1px solid var(--border)' }}>
                        <span style={{ background:'rgba(248,113,113,0.12)', color:'var(--red)', borderRadius:6, padding:'3px 10px', fontSize:12 }}>{c.weakness}</span>
                      </td>
                      <td style={{ padding:'14px', borderBottom:'1px solid var(--border)', fontWeight:600, fontSize:13, color: c.threat==='High' ? 'var(--red)' : c.threat==='Medium' ? 'var(--amber)' : 'var(--green)' }}>
                        {c.threat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <Card title="Competitive Edge"><p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.competitiveEdge}</p></Card>
          </div>
        )}

        {/* ── SWOT ── */}
        {activeTab === 'swot' && (
          <div>
            <SectionTitle badge="Strategic View">SWOT Analysis</SectionTitle>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {[
                { title:'Strengths',     items:data.swot.strengths,     accent:'var(--green)',  bg:'rgba(34,211,160,0.08)',  border:'rgba(34,211,160,0.2)' },
                { title:'Weaknesses',    items:data.swot.weaknesses,    accent:'var(--red)',    bg:'rgba(248,113,113,0.08)', border:'rgba(248,113,113,0.2)' },
                { title:'Opportunities', items:data.swot.opportunities, accent:'var(--blue)',   bg:'rgba(96,165,250,0.08)',  border:'rgba(96,165,250,0.2)' },
                { title:'Threats',       items:data.swot.threats,       accent:'var(--amber)',  bg:'rgba(245,158,11,0.08)',  border:'rgba(245,158,11,0.2)' },
              ].map(s => (
                <div key={s.title} style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:12, padding:'1.2rem' }}>
                  <h5 style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10, color:s.accent }}>{s.title}</h5>
                  <ul style={{ listStyle:'none' }}>
                    {s.items.map(it => (
                      <li key={it} style={{ fontSize:13, color:'var(--text2)', padding:'5px 0', display:'flex', gap:8, lineHeight:1.5 }}>
                        <span style={{ color:s.accent, flexShrink:0 }}>→</span>{it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REVENUE ── */}
        {activeTab === 'revenue' && (
          <div>
            <SectionTitle badge="Streams">Revenue Model</SectionTitle>
            {data.revenueStreams.map(s => (
              <div key={s.name} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'1rem 1.2rem', marginBottom:10, display:'flex', alignItems:'center', gap:'1rem' }}>
                <div style={{ minWidth:160 }}>
                  <div style={{ fontSize:14, fontWeight:600, marginBottom:3 }}>{s.name}</div>
                  <div style={{ fontSize:12, color:'var(--text3)' }}>{s.desc}</div>
                </div>
                <div style={{ flex:1, background:'var(--border)', borderRadius:100, height:4 }}>
                  <div style={{ width:`${s.pct}%`, height:'100%', borderRadius:100, background:s.color }} />
                </div>
                <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', color:s.color, minWidth:44, textAlign:'right' }}>{s.pct}%</div>
              </div>
            ))}
            <Card title="Revenue Strategy" style={{ marginTop:'1rem' }}>
              <p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.revenueStrategy}</p>
            </Card>
          </div>
        )}

        {/* ── FINANCIAL ── */}
        {activeTab === 'financial' && (
          <div>
            <SectionTitle badge="5-Year View">Financial Projections</SectionTitle>
            <div style={{ display:'flex', gap:10, marginBottom:'1.5rem', flexWrap:'wrap' }}>
              {[
                { label:'Break-even', val:'Month 28', change:'↑ On track' },
                { label:'Y3 Revenue', val:`₹${data.financials.revenue[2]}L`, change:'↑ 166% YoY' },
                { label:'Y5 ARR',     val:`₹${data.financials.revenue[4]}L`, change:'↑ Projected' },
                { label:'LTV/CAC',    val:'4.2×', change:'↑ Strong' },
              ].map(h => (
                <div key={h.label} style={{ flex:1, minWidth:130, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'1rem' }}>
                  <div style={{ fontSize:11, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:5 }}>{h.label}</div>
                  <div style={{ fontSize:'1.3rem', fontWeight:800, fontFamily:'Syne, sans-serif', color:'var(--accent2)' }}>{h.val}</div>
                  <div style={{ fontSize:11, color:'var(--green)', marginTop:3 }}>{h.change}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:6, marginBottom:'1.5rem' }}>
              {[['revenue','Revenue'],['profit','Profit'],['users','Users']].map(([k,l]) => (
                <button key={k} onClick={() => setFinType(k)} style={{ background: finType===k ? 'var(--accent)' : 'var(--bg2)', border:'none', borderRadius:8, padding:'7px 16px', fontSize:13, cursor:'pointer', color: finType===k ? '#fff' : 'var(--text2)', fontFamily:'DM Sans, sans-serif', transition:'all 0.2s' }}>{l}</button>
              ))}
            </div>
            <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'1.5rem' }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={finChartData} margin={{ top:5, right:5, left:5, bottom:5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" tick={{ fill:'#9090b0', fontSize:13 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill:'#9090b0', fontSize:12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background:'var(--card)', border:'1px solid var(--border2)', borderRadius:8, color:'var(--text)' }} cursor={{ fill:'rgba(124,92,252,0.08)' }} />
                  <Bar dataKey="value" fill={finType==='revenue' ? '#7c5cfc' : finType==='profit' ? '#22d3a0' : '#60a5fa'} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── SCORE ── */}
        {activeTab === 'score' && (
          <div>
            <SectionTitle badge="0 – 100">Investor Readiness Score</SectionTitle>
            <div style={{ background:'linear-gradient(135deg, rgba(124,92,252,0.18) 0%, rgba(96,165,250,0.08) 100%)', border:'1px solid rgba(124,92,252,0.3)', borderRadius:20, padding:'2.5rem', textAlign:'center', marginBottom:'1.5rem' }}>
              <div style={{ fontSize:'4.5rem', fontWeight:800, fontFamily:'Syne, sans-serif', background:'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{data.score}</div>
              <div style={{ fontSize:'1rem', color:'var(--text2)', marginBottom:'1.5rem' }}>out of 100 · Strong Investment Candidate</div>
              <div style={{ background:'var(--bg2)', borderRadius:100, height:8, maxWidth:300, margin:'0 auto' }}>
                <div style={{ height:'100%', borderRadius:100, background:'linear-gradient(90deg, var(--accent), var(--green))', width: scoreAnimated ? `${data.score}%` : '0%', transition:'width 1.5s cubic-bezier(0.4,0,0.2,1)' }} />
              </div>
            </div>
            <Card title="Score Breakdown">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {data.scoreDims.map(d => (
                  <div key={d.label}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'var(--text2)', marginBottom:5 }}>
                      <span>{d.label}</span><span style={{ color:'var(--text)' }}>{d.val}/100</span>
                    </div>
                    <div style={{ background:'var(--border)', borderRadius:100, height:5 }}>
                      <div style={{ width:`${d.val}%`, height:'100%', borderRadius:100, background:'linear-gradient(90deg, var(--accent), var(--green))' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="AI Recommendation">
              <p style={{ color:'var(--text2)', lineHeight:1.8, fontSize:15 }}>{data.scoreRec}</p>
            </Card>
          </div>
        )}

        {/* ── PITCH DECK ── */}
        {activeTab === 'deck' && (
          <div>
            <SectionTitle badge="12 Slides">Pitch Deck</SectionTitle>
            <p style={{ color:'var(--text2)', fontSize:14, marginBottom:'1.5rem' }}>Your complete investor pitch deck. Click any slide to preview.</p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(210px,1fr))', gap:14 }}>
              {data.slides.map(s => (
                <div key={s.num}
                  onClick={() => alert(`Slide ${s.num}: ${s.title}\n\n${s.preview}\n\nConnect your backend to export a full PPTX!`)}
                  style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, padding:'1.4rem', cursor:'pointer', transition:'all 0.2s', aspectRatio:'16/10', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(124,92,252,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <div>
                    <div style={{ fontSize:11, color:'var(--text3)', fontWeight:600, marginBottom:6 }}>Slide {s.num}</div>
                    <div style={{ fontFamily:'Syne, sans-serif', fontSize:'1rem', fontWeight:700 }}>{s.title}</div>
                    <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.5, marginTop:6 }}>{s.preview}</div>
                  </div>
                  <span style={{ display:'inline-block', fontSize:10, padding:'3px 8px', borderRadius:4, marginTop:8, background:`${tagColors[s.tag] || '#7c5cfc'}22`, color:tagColors[s.tag] || '#7c5cfc' }}>{s.tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
