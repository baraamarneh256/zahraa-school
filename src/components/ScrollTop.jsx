import { useScrolled } from '../hooks/useScrolled'

export default function ScrollTop() {
  const visible = useScrolled(200)
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '2rem', left: '2rem',
        width: 46, height: 46, background: '#1a56db', color: '#fff',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', boxShadow: '0 10px 40px rgba(0,0,0,.14)', cursor: 'pointer',
        transition: 'all .3s', opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none', zIndex: 500,
      }}>↑</button>
  )
}
