import { useState } from 'react'

export default function FeatureCard({ icon, title, desc, center = false }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, padding: '2rem',
        boxShadow: hovered ? '0 10px 40px rgba(0,0,0,.14)' : '0 1px 3px rgba(0,0,0,.08)',
        border: '1px solid #e2e8f0', transition: 'all .3s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        position: 'relative', overflow: 'hidden',
        textAlign: center ? 'center' : 'right',
      }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 4,
        height: hovered ? '100%' : 0,
        background: 'linear-gradient(#1a56db,#60a5fa)',
        borderRadius: '0 20px 20px 0', transition: 'height .3s',
      }} />
      <div style={{
        width: 60, height: 60, borderRadius: 14,
        background: hovered ? '#1a56db' : '#eff6ff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: '1.2rem',
        margin: center ? '0 auto 1.2rem' : '0 0 1.2rem',
        transition: 'all .3s',
      }}>{icon}</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0a2463', marginBottom: '.5rem' }}>{title}</h3>
      <p style={{ fontSize: '.9rem', color: '#475569' }}>{desc}</p>
    </div>
  )
}
