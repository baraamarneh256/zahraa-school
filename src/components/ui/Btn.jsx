export default function Btn({ children, variant = 'primary', onClick, style: sx, type = 'button', disabled }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
    padding: '.85rem 1.8rem', borderRadius: 10, fontWeight: 700,
    fontSize: '.95rem', transition: 'all .3s', border: '2px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Cairo',sans-serif",
  }
  const variants = {
    primary:  { background: '#fff', color: '#1034a6', boxShadow: '0 4px 16px rgba(0,0,0,.10)' },
    outline:  { background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,.5)' },
    blue:     { background: '#1a56db', color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,.10)' },
    gray:     { background: '#f1f5f9', color: '#1e293b' },
    disabled: { background: '#94a3b8', color: '#fff' },
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...variants[disabled ? 'disabled' : variant], ...sx }}>
      {children}
    </button>
  )
}
