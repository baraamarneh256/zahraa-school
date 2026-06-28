import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import Btn from '../components/ui/Btn'
import { SIGN_CATEGORIES } from '../data/signsData'

const TABS = [
  { id: 'theory', icon: '📚', label: 'مادة التؤوريا' },
  { id: 'signs',  icon: '🚦', label: 'إشارات المرور' },
]

export default function StudyPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('theory')

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader badge="دراسة التؤوريا" title="مادة التؤوريا والإشارات" subtitle="ادرس المادة النظرية وتعرّف على جميع إشارات المرور مع شرحها قبل الامتحان" />

          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '.6rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {TABS.map(t => {
              const active = tab === t.id
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '.5rem',
                  padding: '.7rem 1.6rem', borderRadius: 50, fontWeight: 700, fontSize: '.95rem',
                  fontFamily: "'Cairo',sans-serif", cursor: 'pointer', transition: 'all .25s',
                  border: `2px solid ${active ? '#1a56db' : '#e2e8f0'}`,
                  background: active ? '#1a56db' : '#fff',
                  color: active ? '#fff' : '#475569',
                }}>
                  <span>{t.icon}</span>{t.label}
                </button>
              )
            })}
          </div>

          {tab === 'theory' ? <TheorySection navigate={navigate} /> : <SignsSection />}
        </div>
      </section>
    </div>
  )
}

const PDF_PATH = import.meta.env.BASE_URL + 'teoria-book.pdf?v=2'

function TheorySection({ navigate }) {
  return (
    <div className="page-enter" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,.06)', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg,#0a2463,#1a56db)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem' }}>📕</div>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0a2463' }}>كتاب التؤوريا</h3>
            <p style={{ fontSize: '.88rem', color: '#475569' }}>المرجع النظري الكامل لامتحان رخصة القيادة</p>
          </div>
        </div>
        <p style={{ fontSize: '.95rem', color: '#475569', lineHeight: 1.9, marginBottom: '1.5rem' }}>
          يحتوي كتاب التؤوريا على كل ما تحتاجه من قوانين السير، آداب القيادة، السلامة المرورية، وأنظمة الطريق.
          اقرأ الكتاب جيداً ثم درّب نفسك على الأسئلة في قسم الاختبار النظري.
        </p>
        <a href={PDF_PATH} download="كتاب-التؤوريا.pdf" style={{
          display: 'inline-flex', alignItems: 'center', gap: '.5rem',
          padding: '.8rem 1.8rem', borderRadius: 12, fontWeight: 800, fontSize: '.95rem',
          background: '#1a56db', color: '#fff', textDecoration: 'none',
        }}>⬇️ تحميل الكتاب</a>
      </div>

<div style={{ textAlign: 'center' }}>
        <Btn variant="blue" onClick={() => navigate('/quiz')}>📝 ابدأ الاختبار النظري</Btn>
      </div>
    </div>
  )
}

function SignsSection() {
  const [active, setActive] = useState('all')
  const [query, setQuery] = useState('')

  const q = query.trim()
  const filtered = useMemo(() => {
    return SIGN_CATEGORIES
      .filter(c => active === 'all' || c.id === active)
      .map(c => ({
        ...c,
        items: q
          ? c.items.filter(it => it.code.includes(q) || it.desc.includes(q))
          : c.items,
      }))
      .filter(c => c.items.length > 0)
  }, [active, q])

  const total = SIGN_CATEGORIES.reduce((n, c) => n + c.items.length, 0)

  return (
    <div className="page-enter">
      {/* Search */}
      <div style={{ maxWidth: 480, margin: '0 auto 1.5rem' }}>
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="🔍 ابحث برمز الإشارة أو معناها..."
          style={{
            width: '100%', padding: '.85rem 1.2rem', borderRadius: 12,
            border: '1.5px solid #e2e8f0', background: '#fff', fontSize: '.95rem',
            fontFamily: "'Cairo',sans-serif", outline: 'none', textAlign: 'right', color: '#1e293b',
          }}
        />
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {[{ id: 'all', icon: '🗂️', title: `الكل (${total})` }, ...SIGN_CATEGORIES.map(c => ({ id: c.id, icon: c.icon, title: c.title }))].map(c => {
          const on = active === c.id
          return (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              display: 'flex', alignItems: 'center', gap: '.4rem',
              padding: '.5rem 1.1rem', borderRadius: 50, fontWeight: 700, fontSize: '.85rem',
              fontFamily: "'Cairo',sans-serif", cursor: 'pointer', transition: 'all .2s',
              border: `2px solid ${on ? '#1a56db' : '#e2e8f0'}`,
              background: on ? '#eff6ff' : '#fff', color: on ? '#1a56db' : '#475569',
            }}>
              <span>{c.icon}</span>{c.title}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>لا توجد نتائج مطابقة لبحثك</p>
      )}

      {/* Category sections */}
      {filtered.map(cat => (
        <div key={cat.id} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1.2rem', paddingBottom: '.7rem', borderBottom: '2px solid #e2e8f0' }}>
            <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0a2463' }}>{cat.title}</h3>
              <p style={{ fontSize: '.82rem', color: '#94a3b8' }}>{cat.sub}</p>
            </div>
            <span style={{ marginRight: 'auto', fontSize: '.8rem', fontWeight: 700, color: '#1a56db', background: '#eff6ff', padding: '.3rem .8rem', borderRadius: 50 }}>{cat.items.length} إشارة</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1rem' }}>
            {cat.items.map(it => (
              <div key={it.img} style={{
                background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,.05)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,86,219,.15)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ height: 130, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                  <img src={import.meta.env.BASE_URL + it.img.replace(/^\//, '')} alt={it.code} draggable={false} loading="lazy" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ padding: '.9rem 1rem', display: 'flex', flexDirection: 'column', gap: '.4rem', flex: 1 }}>
                  <span style={{ alignSelf: 'flex-start', fontSize: '.78rem', fontWeight: 800, color: '#1a56db', background: '#eff6ff', padding: '.2rem .7rem', borderRadius: 6 }}>{it.code}</span>
                  <p style={{ fontSize: '.85rem', color: '#1e293b', fontWeight: 600, lineHeight: 1.6 }}>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
