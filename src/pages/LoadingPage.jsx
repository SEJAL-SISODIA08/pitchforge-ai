import { useState, useEffect } from 'react'

const STEPS = [
  'Analyzing market opportunity',
  'Identifying competitors',
  'Building business model canvas',
  'Calculating financial projections',
  'Generating SWOT analysis',
  'Scoring investor readiness',
  'Creating 12-slide pitch deck',
  'Finalizing report',
]

export default function LoadingPage() {
  const [done, setDone] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setDone(d => {
        if (d >= STEPS.length) { clearInterval(iv); return d }
        return d + 1
      })
    }, 600)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' }}>
      <div style={{ maxWidth:440, width:'100%', textAlign:'center' }}>
        <div className="animate-spin" style={{ width:72, height:72, borderRadius:'50%', border:'3px solid var(--border2)', borderTopColor:'var(--accent)', margin:'0 auto 2rem' }} />
        <h3 style={{ fontSize:'1.5rem', fontWeight:800, marginBottom:'0.75rem' }}>Crafting your pitch...</h3>
        <p style={{ color:'var(--text2)', fontSize:14, marginBottom:'1.5rem' }}>Our AI is analyzing your idea across 8 dimensions</p>
        <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
          {STEPS.map((s, i) => {
            const isDone   = i < done
            const isActive = i === done
            return (
              <li key={s} style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
                borderRadius:10, fontSize:14, transition:'all 0.4s',
                background: isDone ? 'rgba(34,211,160,0.1)' : isActive ? 'var(--card)' : 'var(--bg2)',
                border: `1px solid ${isDone ? 'rgba(34,211,160,0.25)' : 'var(--border)'}`,
                color: isDone ? 'var(--green)' : isActive ? 'var(--text)' : 'var(--text3)',
              }}>
                <div style={{ width:8, height:8, borderRadius:'50%', background:'currentColor', flexShrink:0 }} />
                {s}
                {isDone && <span style={{ marginLeft:'auto', fontSize:12 }}>✓</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
