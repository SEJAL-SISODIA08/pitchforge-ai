export default function Landing({ onStart }) {
  const features = [
    'Business Model Canvas','Market Analysis','Competitor Intel',
    '12-Slide Pitch Deck','Investor Score','Financial Projections',
  ]
  const stats = [
    { val:'10K+', label:'Pitches Generated' },
    { val:'₹500Cr+', label:'Funding Raised' },
    { val:'94%', label:'User Satisfaction' },
  ]
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'3rem 1.5rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
      {/* glow */}
      <div style={{ position:'absolute', width:700, height:700, background:'radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)', top:-200, left:'50%', transform:'translateX(-50%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:400, height:400, background:'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)', bottom:-100, right:'10%', pointerEvents:'none' }} />

      {/* logo pill */}
      <div className="animate-fadeUp" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'var(--card)', border:'1px solid var(--border2)', borderRadius:14, padding:'10px 20px', marginBottom:'2.5rem' }}>
        <div style={{ width:28, height:28, background:'var(--accent)', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15 }}>⚡</div>
        <span style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:15, letterSpacing:'0.02em' }}>PitchForge AI</span>
        <span style={{ background:'rgba(124,92,252,0.2)', color:'var(--accent2)', fontSize:11, padding:'2px 8px', borderRadius:20, fontWeight:600 }}>BETA</span>
      </div>

      {/* headline */}
      <h1 className="animate-fadeUp-d1" style={{ fontSize:'clamp(2.2rem, 5vw, 4.2rem)', fontWeight:800, lineHeight:1.1, marginBottom:'1.25rem', letterSpacing:'-0.025em', maxWidth:700 }}>
        Turn your idea into an<br />
        <span style={{ background:'linear-gradient(135deg, #a78bfa 0%, #7c5cfc 40%, #60a5fa 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          investor-ready pitch
        </span><br />in minutes.
      </h1>

      <p className="animate-fadeUp-d2" style={{ fontSize:'1.1rem', color:'var(--text2)', maxWidth:520, margin:'0 auto 2.5rem', lineHeight:1.7 }}>
        AI-powered pitch deck generator for founders, students &amp; hackathon participants. Business model, market analysis, financials — all instantly.
      </p>

      {/* CTA */}
      <button
        className="animate-fadeUp-d3"
        onClick={onStart}
        style={{ display:'inline-flex', alignItems:'center', gap:10, background:'var(--accent)', color:'#fff', border:'none', borderRadius:14, padding:'18px 36px', fontSize:'1.05rem', fontWeight:700, fontFamily:'Syne, sans-serif', cursor:'pointer', boxShadow:'0 0 50px rgba(124,92,252,0.45)', transition:'all 0.2s', letterSpacing:'0.01em' }}
        onMouseEnter={e => { e.target.style.transform='translateY(-3px)'; e.target.style.boxShadow='0 12px 60px rgba(124,92,252,0.6)'; }}
        onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 0 50px rgba(124,92,252,0.45)'; }}
      >
        ⚡ Generate My Startup Pitch
        <span style={{ opacity:0.7, fontSize:'0.9rem' }}>→</span>
      </button>

      {/* feature pills */}
      <div style={{ display:'flex', gap:8, marginTop:'2.5rem', flexWrap:'wrap', justifyContent:'center', maxWidth:640 }}>
        {features.map(f => (
          <div key={f} style={{ display:'flex', alignItems:'center', gap:6, background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, padding:'7px 14px', fontSize:13, color:'var(--text2)' }}>
            <span style={{ color:'var(--accent2)' }}>✦</span> {f}
          </div>
        ))}
      </div>

      {/* stats */}
      <div style={{ display:'flex', gap:'3rem', marginTop:'3.5rem', flexWrap:'wrap', justifyContent:'center' }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:'Syne, sans-serif', fontSize:'1.8rem', fontWeight:800, background:'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{s.val}</div>
            <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
