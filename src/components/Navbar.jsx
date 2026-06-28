import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useScrolled } from '../hooks/useScrolled'
import zahraaCarImg from '../public/zahraa-logo.png'

const LINKS = [
  { to: '/',        label: 'الرئيسية' },
  { to: '/study',   label: 'دراسة التؤوريا' },
  { to: '/quiz',    label: 'الاختبار النظري' },
  { to: '/results', label: 'نتائج الامتحانات' },
  { to: '/trainers', label: 'الشامل للمدربين' },
  { to: '/steps',   label: 'خطوات الرخصة' },
  { to: '/faq',     label: 'أسئلة متكررة' },
]

export default function Navbar() {
  const scrolled  = useScrolled()
  const navigate  = useNavigate()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const linkStyle = ({ isActive }) => ({
    padding: '.5rem .9rem', borderRadius: 8, fontWeight: 600, fontSize: '.9rem',
    color: isActive ? '#1a56db' : '#1e293b',
    background: isActive ? '#eff6ff' : 'transparent',
    transition: 'all .3s', textDecoration: 'none',
  })

  const mobileLinkStyle = ({ isActive }) => ({
    padding: '.75rem 1rem', borderRadius: 8, fontWeight: 600, display: 'block',
    color: isActive ? '#1a56db' : '#1e293b',
    background: isActive ? '#eff6ff' : 'transparent',
    textDecoration: 'none',
  })

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: scrolled ? '0 4px 16px rgba(0,0,0,.10)' : 'none',
      transition: 'box-shadow .3s',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem',
        height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div onClick={() => { navigate('/'); close() }} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', cursor: 'pointer' }}>
          <div style={{ width: 54, height: 54, borderRadius: 10, overflow: 'hidden', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={zahraaCarImg} alt="شعار" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }} />
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#0a2463' }}>مدرسة الزهراء</div>
            <div style={{ fontSize: '.72rem', color: '#475569' }}>لتعليم السواقة</div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} style={linkStyle}>{l.label}</NavLink>
          ))}
          <NavLink to="/contact" style={{
            padding: '.5rem 1.2rem', borderRadius: 8, fontWeight: 700, fontSize: '.9rem',
            background: '#25d366', color: '#fff', transition: 'all .3s', marginRight: '.25rem',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.4rem',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            تواصل معنا
          </NavLink>
        </div>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setOpen(o => !o)}
          style={{ flexDirection: 'column', gap: 5, background: 'none', padding: 6, borderRadius: 6 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', width: 24, height: 2, background: '#1e293b', borderRadius: 2 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile-menu" style={{ display: 'flex', flexDirection: 'column', padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid #e2e8f0', gap: '.3rem' }}>
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} style={mobileLinkStyle} onClick={close}>
              {l.to === '/' ? '🏠 ' : l.to === '/study' ? '📚 ' : l.to === '/quiz' ? '📝 ' : l.to === '/results' ? '📊 ' : l.to === '/trainers' ? '🎓 ' : ''}{l.label}
            </NavLink>
          ))}
          <NavLink to="/faq"     style={mobileLinkStyle} onClick={close}>❓ أسئلة متكررة</NavLink>
          <NavLink to="/contact" style={mobileLinkStyle} onClick={close}>💬 تواصل معنا</NavLink>
        </div>
      )}
    </nav>
  )
}
