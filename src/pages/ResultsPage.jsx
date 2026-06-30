import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

const CHOICES = [
  {
    to: '/results/theory',
    icon: '📝',
    title: 'نتيجة الامتحان النظري',
    desc: 'استعلم عن نتيجة امتحان التؤوريا (النظري) برقم هويتك مباشرةً من وزارة النقل.',
    grad: 'linear-gradient(135deg,#0a2463,#1a56db)',
  },
  {
    to: '/results/practical',
    icon: '🚗',
    title: 'نتيجة الامتحان العملي',
    desc: 'استعلم عن نتيجة الامتحان العملي برقم هويتك مباشرةً من وزارة النقل.',
    grad: 'linear-gradient(135deg,#059669,#10b981)',
  },
]

export default function ResultsPage() {
  const navigate = useNavigate()
  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <SectionHeader
              badge="نتائج الامتحانات"
              title="استعلم عن نتيجتك"
              subtitle="اختر نوع الامتحان للاستعلام عن نتيجتك مباشرةً من وزارة النقل"
            />
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem', maxWidth: 760, margin: '0 auto' }}>
            {CHOICES.map((c, i) => (
              <Reveal key={c.to} delay={i * 120}>
                <div
                  onClick={() => navigate(c.to)}
                  style={{
                    background: '#fff', borderRadius: 20, padding: '2.5rem 2rem', height: '100%',
                    border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,.07)',
                    textAlign: 'center', cursor: 'pointer', transition: 'all .25s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(26,86,219,.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.07)' }}
                >
                  <div style={{ width: 72, height: 72, borderRadius: 18, background: c.grad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.2rem' }}>{c.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0a2463', marginBottom: '.6rem' }}>{c.title}</h3>
                  <p style={{ fontSize: '.9rem', color: '#475569', lineHeight: 1.9, marginBottom: '1.5rem', flex: 1 }}>{c.desc}</p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                    padding: '.75rem 1.6rem', borderRadius: 12, fontWeight: 800, fontSize: '.92rem',
                    background: '#eff6ff', color: '#1a56db',
                  }}>🔍 استعلم الآن ←</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
