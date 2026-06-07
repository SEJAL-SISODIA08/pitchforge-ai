import { useState } from 'react'

const inputStyle = {
  width:'100%', background:'var(--bg2)', border:'1px solid var(--border)',
  borderRadius:10, color:'var(--text)', fontFamily:'DM Sans, sans-serif',
  fontSize:15, padding:'12px 16px', outline:'none', transition:'border-color 0.2s',
  appearance:'none', WebkitAppearance:'none',
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom:'1.4rem' }}>
      <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text3)', marginBottom:8, letterSpacing:'0.07em', textTransform:'uppercase' }}>{label}</label>
      {children}
    </div>
  )
}

export default function FormPage({ onBack, onSubmit }) {
  const [form, setForm] = useState({
    name:'', description:'', industry:'', target:'', stage:'', funding:'', country:'', monthlyRevTarget:'',
  })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const focus = (e) => { e.target.style.borderColor = 'var(--accent)' }
  const blur  = (e) => { e.target.style.borderColor = 'var(--border)' }

  const handleSubmit = () => {
    if (!form.name || !form.description) {
      alert('Please fill in at least your startup name and description.')
      return
    }
    onSubmit(form)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', padding:'2rem 1.5rem' }}>
      <div style={{ maxWidth:680, margin:'0 auto' }}>
        <button
          onClick={onBack}
          style={{ display:'inline-flex', alignItems:'center', gap:6, background:'transparent', border:'1px solid var(--border)', color:'var(--text2)', borderRadius:8, padding:'8px 14px', fontSize:13, cursor:'pointer', marginBottom:'2rem', fontFamily:'DM Sans, sans-serif', transition:'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border2)'; e.currentTarget.style.color='var(--text)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text2)'; }}
        >
          ← Back
        </button>

        <div style={{ marginBottom:'2rem' }}>
          <h2 style={{ fontSize:'1.9rem', fontWeight:800, marginBottom:'0.5rem' }}>Tell us about your startup ✦</h2>
          <p style={{ color:'var(--text2)', fontSize:'0.95rem' }}>Fill in the details — our AI will generate a complete pitch analysis.</p>
        </div>

        <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:16, padding:'2rem' }}>
          <Field label="Startup Name *">
            <input style={inputStyle} placeholder="e.g. Tara Health" value={form.name}
              onChange={set('name')} onFocus={focus} onBlur={blur} />
          </Field>

          <Field label="Startup Description *">
            <textarea style={{ ...inputStyle, resize:'vertical', minHeight:90 }}
              placeholder="e.g. AI-powered healthcare vending machines for rural areas, providing 24/7 medicine access and remote doctor connectivity."
              value={form.description} onChange={set('description')} onFocus={focus} onBlur={blur} />
          </Field>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <Field label="Industry">
              <select style={inputStyle} value={form.industry} onChange={set('industry')} onFocus={focus} onBlur={blur}>
                <option value="">Select Industry</option>
                {['Healthcare','Fintech','Edtech','AI / ML','SaaS','E-commerce','Agritech','Clean Energy','Logistics','Other'].map(o=><option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Target Customers">
              <input style={inputStyle} placeholder="e.g. Rural populations"
                value={form.target} onChange={set('target')} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <Field label="Startup Stage">
              <select style={inputStyle} value={form.stage} onChange={set('stage')} onFocus={focus} onBlur={blur}>
                <option value="">Select Stage</option>
                {['Idea','MVP','Beta','Revenue Generating'].map(o=><option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Funding Needed">
              <input style={inputStyle} placeholder="e.g. ₹50,00,000"
                value={form.funding} onChange={set('funding')} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <Field label="Country">
              <select style={inputStyle} value={form.country} onChange={set('country')} onFocus={focus} onBlur={blur}>
                <option value="">Select Country</option>
                {['India','USA','UK','Singapore','Germany','Australia','UAE','Canada','Nigeria','Brazil'].map(o=><option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Monthly Revenue Target">
              <input style={inputStyle} placeholder="e.g. ₹10,00,000"
                value={form.monthlyRevTarget} onChange={set('monthlyRevTarget')} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <button
            onClick={handleSubmit}
            style={{ width:'100%', background:'var(--accent)', color:'#fff', border:'none', borderRadius:12, padding:'16px', fontSize:'1rem', fontWeight:700, fontFamily:'Syne, sans-serif', cursor:'pointer', marginTop:'0.5rem', boxShadow:'0 0 30px rgba(124,92,252,0.35)', transition:'all 0.2s' }}
            onMouseEnter={e => { e.target.style.transform='translateY(-1px)'; e.target.style.boxShadow='0 6px 40px rgba(124,92,252,0.55)'; }}
            onMouseLeave={e => { e.target.style.transform='none'; e.target.style.boxShadow='0 0 30px rgba(124,92,252,0.35)'; }}
          >
            ⚡ Generate Pitch Analysis →
          </button>
        </div>
      </div>
    </div>
  )
}
