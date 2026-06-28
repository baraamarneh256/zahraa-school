export default function SectionHeader({ badge, title, subtitle, light = false }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
      <span style={{
        display: 'inline-block',
        background: light ? 'rgba(255,255,255,.2)' : '#dbeafe',
        color: light ? '#fff' : '#1a56db',
        fontWeight: 700, fontSize: '.82rem',
        padding: '.35rem 1rem', borderRadius: 50, marginBottom: '1rem',
      }}>{badge}</span>
      <h2 style={{
        fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 900,
        color: light ? '#fff' : '#0a2463', marginBottom: '.75rem',
      }}>{title}</h2>
      {subtitle && (
        <p style={{ fontSize: '1rem', color: light ? 'rgba(255,255,255,.8)' : '#475569', maxWidth: 550, margin: '0 auto' }}>
          {subtitle}
        </p>
      )}
      <div style={{
        width: 60, height: 4,
        background: light ? 'rgba(255,255,255,.5)' : 'linear-gradient(90deg,#1a56db,#60a5fa)',
        borderRadius: 4, margin: '1rem auto 0',
      }} />
    </div>
  )
}
