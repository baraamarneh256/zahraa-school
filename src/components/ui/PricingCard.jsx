import { useState } from 'react'

export default function PricingCard({ plan, onBook }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, padding: '2rem',
        border: `2px solid ${plan.popular ? '#1a56db' : '#e2e8f0'}`,
        position: 'relative', transition: 'all .3s',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 10px 40px rgba(0,0,0,.14)' : plan.popular ? '0 0 0 4px rgba(37,99,235,.1)' : '0 1px 3px rgba(0,0,0,.08)',
      }}>
      {plan.popular && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: '#1a56db', color: '#fff', fontSize: '.78rem', fontWeight: 700,
          padding: '.3rem 1.2rem', borderRadius: 50, whiteSpace: 'nowrap',
        }}>⭐ الأكثر طلباً</div>
      )}
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{plan.icon}</div>
      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0a2463' }}>{plan.name}</div>
      <div style={{ fontSize: '.85rem', color: '#475569', marginTop: '.3rem' }}>{plan.desc}</div>
      <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'baseline', gap: '.4rem' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a56db' }}>{plan.price}</span>
        <span style={{ fontSize: '1rem', color: '#475569', fontWeight: 600 }}>شيكل</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1.5rem' }}>
        {plan.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.88rem', color: '#475569' }}>
            <span style={{ color: '#10b981' }}>✅</span>{f}
          </div>
        ))}
        {plan.missing.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.88rem', color: '#94a3b8' }}>
            <span>❌</span>{f}
          </div>
        ))}
      </div>
      <button onClick={onBook} style={{
        width: '100%', padding: '.85rem', borderRadius: 10,
        fontWeight: 700, fontSize: '.95rem', cursor: 'pointer', transition: 'all .3s',
        fontFamily: "'Cairo',sans-serif",
        background: plan.popular ? '#1a56db' : '#fff',
        color: plan.popular ? '#fff' : '#1a56db',
        border: '2px solid #1a56db',
      }}>احجز الآن</button>
    </div>
  )
}
