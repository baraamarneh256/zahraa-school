import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

// ضع ملف الكتاب باسم shamel-trainers.pdf داخل مجلد public لتفعيل التحميل.
const BOOK_PATH = '/shamel-trainers.pdf'

export default function TrainersPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <SectionHeader
              badge="الشامل للمدربين"
              title="الشامل للمدربين"
              subtitle="مرجع شامل وامتحانات تدريبية مخصّصة للمدربين — أعدّتها مدرسة الزهراء لتعليم السواقة"
            />
          </Reveal>

          {/* البطاقتان الرئيسيتان */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem', maxWidth: 880, margin: '0 auto 2.5rem' }}>
            {/* بطاقة الكتاب */}
            <Reveal>
              <div style={{
                background: '#fff', borderRadius: 20, padding: '2.2rem', height: '100%',
                border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,.07)',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg,#0a2463,#1a56db)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '1.1rem' }}>📘</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0a2463', marginBottom: '.5rem' }}>كتاب الشامل للمدربين</h3>
                <p style={{ fontSize: '.92rem', color: '#475569', lineHeight: 1.9, marginBottom: '1.5rem', flex: 1 }}>
                  المرجع الكامل للمدربين: قوانين السير، السلامة المرورية، أساليب التدريب، والأسئلة المعتمدة.
                  حمّل الكتاب أو تصفّحه مباشرة من المتصفح.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.7rem' }}>
                  <a href={BOOK_PATH} download="كتاب-الشامل-للمدربين.pdf" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                    padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 800, fontSize: '.95rem',
                    background: '#1a56db', color: '#fff', textDecoration: 'none',
                  }}>⬇️ تحميل الكتاب</a>
                </div>
              </div>
            </Reveal>

            {/* بطاقة الامتحانات */}
            <Reveal delay={120}>
              <div
                onClick={() => navigate('/trainers/exams')}
                style={{
                  background: '#fff', borderRadius: 20, padding: '2.2rem', height: '100%',
                  border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,.07)',
                  display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all .25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(26,86,219,.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.07)' }}
              >
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg,#059669,#10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '1.1rem' }}>📝</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0a2463', marginBottom: '.5rem' }}>امتحانات الشامل للمدربين</h3>
                <p style={{ fontSize: '.92rem', color: '#475569', lineHeight: 1.9, marginBottom: '1.5rem', flex: 1 }}>
                  نماذج امتحانات تدريبية للمدربين مع مؤقت وتصحيح فوري، بنمط عادي أو تكميلي.
                  اختر النموذج وابدأ الامتحان مباشرة.
                </p>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                  padding: '.8rem 1.6rem', borderRadius: 12, fontWeight: 800, fontSize: '.95rem',
                  background: '#10b981', color: '#fff', alignSelf: 'flex-start',
                }}>📋 ابدأ الامتحانات ←</span>
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </div>
  )
}
