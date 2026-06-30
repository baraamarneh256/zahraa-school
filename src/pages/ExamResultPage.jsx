import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import Btn from '../components/ui/Btn'

const INPUT_STYLE = {
  padding: '.85rem 1.1rem', border: '1.5px solid #e2e8f0', borderRadius: 12,
  fontSize: '1rem', color: '#1e293b', background: '#f8fafc', width: '100%',
  fontFamily: "'Cairo',sans-serif", transition: 'all .3s', outline: 'none',
  textAlign: 'center', letterSpacing: '.05em',
}

const STATUS_META = {
  pass: { label: 'ناجح', icon: '✅', col: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  fail: { label: 'راسب', icon: '❌', col: '#dc2626', bg: '#fff5f5', border: '#fecaca' },
  none: { label: 'لا توجد نتيجة', icon: '⏳', col: '#b45309', bg: '#fffbeb', border: '#fde68a' },
}

const CONFIG = {
  theory: {
    label: 'النظري',
    badge: 'النتيجة النظرية',
    title: 'نتيجة الامتحان النظري',
    subtitle: 'أدخل رقم هويتك لعرض نتيجة الامتحان النظري مباشرةً من وزارة النقل',
    icon: '📝',
    showPractice: true,
  },
  practical: {
    label: 'العملي',
    badge: 'النتيجة العملية',
    title: 'نتيجة الامتحان العملي',
    subtitle: 'أدخل رقم هويتك لعرض نتيجة الامتحان العملي مباشرةً من وزارة النقل',
    icon: '🚗',
    showPractice: false,
  },
}

function fmtDate(d) {
  if (!d) return ''
  const date = new Date(d)
  if (isNaN(date)) return d
  return date.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })
}

function detailRows(type, details = {}) {
  if (type === 'theory') {
    return [
      ['المستوى', details.level],
      ['الإجابات الصحيحة', details.correctAnswers],
      ['عدد الأسئلة للنجاح', details.questionsToPass],
    ].filter(([, v]) => v !== undefined && v !== null && v !== '')
  }
  return [
    ['المستوى', details.examLevel],
    ['اسم الموقع', details.siteName],
    ['رمز المدرسة', details.schoolCode],
  ].filter(([, v]) => v !== undefined && v !== null && v !== '')
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.5rem', fontSize: '.82rem', borderBottom: '1px dashed #e2e8f0', paddingBottom: '.35rem' }}>
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ color: '#1e293b', fontWeight: 700 }}>{value}</span>
    </div>
  )
}

function ExamCard({ title, icon, type, data }) {
  const status = !data || !data.found ? 'none' : data.result === 'pass' ? 'pass' : 'fail'
  const meta = STATUS_META[status]
  const rows = data && data.found ? detailRows(type, data.details) : []
  return (
    <div style={{ background: meta.bg, border: `1.5px solid ${meta.border}`, borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '.4rem' }}>{icon}</div>
      <div style={{ fontWeight: 800, color: '#0a2463', fontSize: '1rem', marginBottom: '.8rem' }}>{title}</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '.4rem',
        background: '#fff', borderRadius: 50, padding: '.4rem 1rem',
        fontWeight: 800, color: meta.col, fontSize: '.95rem', border: `1.5px solid ${meta.border}`,
      }}>
        <span>{meta.icon}</span>{meta.label}
      </div>
      {data && data.found && (
        <div style={{ marginTop: '1rem', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
          {data.date && <Row label="تاريخ الامتحان" value={fmtDate(data.date)} />}
          {rows.map(([label, value]) => <Row key={label} label={label} value={String(value)} />)}
        </div>
      )}
      {data && !data.found && (
        <div style={{ fontSize: '.8rem', color: '#94a3b8', marginTop: '.7rem' }}>
          {data.message || 'لم تُسجَّل نتيجة بعد'}
        </div>
      )}
    </div>
  )
}

const firstName = (name) => (name ? ` يا ${name.split(' ')[0]}` : '')

const CONFETTI_COLORS = ['#fde047', '#fb7185', '#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#ffffff']

function Confetti({ count = 36 }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 2.5, dur: 2.6 + Math.random() * 1.8,
    size: 6 + Math.random() * 6, color: CONFETTI_COLORS[i % CONFETTI_COLORS.length], round: i % 3 === 0,
  })), [count])
  return (
    <div className="confetti-wrap" aria-hidden="true">
      {pieces.map((p, i) => (
        <span key={i} className="confetti-piece" style={{
          left: `${p.left}%`, width: p.size, height: p.size * 1.6,
          background: p.color, borderRadius: p.round ? '50%' : 2,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
        }} />
      ))}
    </div>
  )
}

/** مباركة المدرسة عند نجاح هذا الامتحان. */
function SuccessBanner({ name, label, examType }) {
  return (
    <div className="result-pop" style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff',
      borderRadius: 20, padding: '2.8rem 2rem', textAlign: 'center', marginBottom: '1.5rem',
      boxShadow: '0 10px 30px rgba(16,185,129,.4)',
    }}>
      <Confetti />
      <div style={{ position: 'relative' }}>
        <div className="emoji-bounce" style={{ fontSize: '4rem', marginBottom: '.3rem' }}>🎉</div>
        <div style={{ fontSize: '.85rem', fontWeight: 700, opacity: .9, marginBottom: '.3rem' }}>🚗 مدرسة الزهراء لتعليم السواقة</div>
        <h3 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '.6rem' }}>تبارك لك النجاح{firstName(name)}! 🎊</h3>
        <p style={{ fontSize: '.98rem', opacity: .95, marginBottom: '.4rem' }}>مبروك اجتيازك الامتحان {label} بنجاح.</p>
        <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>
          {examType === 'theory' ? 'والآن استعد للامتحان العملي 🚗💚' : 'ألف مبروك الرخصة 🚗💚'}
        </p>
      </div>
    </div>
  )
}

/** تشجيع عند الرسوب — "حظاً موفقاً في المرة القادمة". */
function GoodLuckBanner({ name, label, showPractice, onPractice }) {
  return (
    <div className="result-pop" style={{
      background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#fff',
      borderRadius: 20, padding: '2.6rem 2rem', textAlign: 'center', marginBottom: '1.5rem',
      boxShadow: '0 10px 30px rgba(245,158,11,.35)',
    }}>
      <div className="emoji-pulse" style={{ fontSize: '3.6rem', marginBottom: '.4rem' }}>💪</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '.6rem' }}>حظاً موفقاً في المرة القادمة{firstName(name)}</h3>
      <p style={{ fontSize: '.95rem', opacity: .96, marginBottom: showPractice ? '1.4rem' : 0, lineHeight: 1.8 }}>
        لم يحالفك الحظ هذه المرة في الامتحان {label}. راجِع وتدرّب، وستنجح بإذن الله 🌟
      </p>
      {showPractice && (
        <button onClick={onPractice} style={{
          background: '#fff', color: '#c2410c', fontWeight: 800, fontSize: '.95rem',
          padding: '.8rem 1.8rem', borderRadius: 12, fontFamily: "'Cairo',sans-serif",
          boxShadow: '0 4px 14px rgba(0,0,0,.15)',
        }}>📝 تدرّب على الاختبار النظري</button>
      )}
    </div>
  )
}

export default function ExamResultPage({ examType }) {
  const navigate = useNavigate()
  const cfg = CONFIG[examType] || CONFIG.theory
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [searched, setSearched] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!id.trim()) return
    setLoading(true); setError(''); setData(null); setSearched(false)
    try {
      const r = await fetch(`/api/exam-result?type=${examType}&id=${encodeURIComponent(id.trim())}`)
      if (!r.ok) {
        const er = await r.json().catch(() => ({}))
        throw new Error(er.error || 'تعذّر جلب النتيجة')
      }
      setData(await r.json()); setSearched(true)
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء الاتصال بخادم الوزارة')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setId(''); setData(null); setSearched(false); setError('') }

  const studentName = data?.name || ''
  const found = data?.found
  const passed = found && data.result === 'pass'
  const failed = found && data.result === 'fail'
  const notFound = searched && data && !data.found

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader badge={cfg.badge} title={cfg.title} subtitle={cfg.subtitle} />

          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            {/* تبديل بين النظري والعملي */}
            <div style={{ display: 'flex', gap: '.6rem', marginBottom: '1.5rem' }}>
              {[
                { id: 'theory', label: '📝 النظري', to: '/results/theory' },
                { id: 'practical', label: '🚗 العملي', to: '/results/practical' },
              ].map(t => {
                const active = examType === t.id
                return (
                  <button key={t.id} onClick={() => navigate(t.to)} style={{
                    flex: 1, padding: '.7rem', borderRadius: 12, fontWeight: 800, fontSize: '.95rem',
                    fontFamily: "'Cairo',sans-serif", cursor: 'pointer', transition: 'all .2s',
                    border: `2px solid ${active ? '#1a56db' : '#e2e8f0'}`,
                    background: active ? '#1a56db' : '#fff', color: active ? '#fff' : '#475569',
                  }}>{t.label}</button>
                )
              })}
            </div>

            {/* نموذج البحث */}
            <form onSubmit={submit} style={{
              background: '#fff', borderRadius: 20, padding: '2.5rem 2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,.10)', border: '1px solid #e2e8f0',
            }}>
              <label style={{ display: 'block', fontSize: '.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '.7rem', textAlign: 'center' }}>🆔 رقم الهوية</label>
              <input
                value={id}
                onChange={e => setId(e.target.value.replace(/[^\d]/g, ''))}
                inputMode="numeric" placeholder="أدخل رقم الهوية" style={INPUT_STYLE} autoFocus disabled={loading}
              />
              <button type="submit" disabled={!id.trim() || loading} style={{
                width: '100%', marginTop: '1.2rem', padding: '1rem',
                background: (!id.trim() || loading) ? '#94a3b8' : '#1a56db', color: '#fff',
                borderRadius: 12, fontSize: '1rem', fontWeight: 800, border: 'none',
                cursor: (!id.trim() || loading) ? 'not-allowed' : 'pointer',
                fontFamily: "'Cairo',sans-serif", transition: 'all .3s',
              }}>
                {loading ? '⏳ جارٍ الاستعلام...' : `🔍 عرض نتيجة الامتحان ${cfg.label}`}
              </button>
              <p style={{ fontSize: '.72rem', color: '#94a3b8', textAlign: 'center', marginTop: '.9rem' }}>
                النتائج رسمية ومأخوذة مباشرةً من وزارة النقل والمواصلات
              </p>
            </form>

            {/* خطأ في الاتصال */}
            {error && (
              <div className="page-enter" style={{ marginTop: '2rem', background: '#fff', borderRadius: 20, padding: '2rem', textAlign: 'center', border: '2px solid #fecaca', boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>⚠️</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#991b1b', marginBottom: '.5rem' }}>تعذّر جلب النتيجة</h3>
                <p style={{ color: '#475569', fontSize: '.88rem', marginBottom: '1.5rem' }}>{error}</p>
                <Btn variant="blue" onClick={reset}>🔄 حاول مجدداً</Btn>
              </div>
            )}

            {/* لا نتيجة */}
            {notFound && (
              <div className="page-enter" style={{ marginTop: '2rem', background: '#fff', borderRadius: 20, padding: '2.5rem 2rem', textAlign: 'center', border: '2px solid #fde68a', boxShadow: '0 4px 16px rgba(0,0,0,.08)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>🔎</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#92400e', marginBottom: '.5rem' }}>لا توجد نتيجة بهذا الرقم</h3>
                <p style={{ color: '#475569', fontSize: '.9rem', marginBottom: '1.5rem' }}>
                  تأكد من رقم الهوية، أو ربما لم تُصدَر نتيجة امتحانك {cfg.label} بعد لدى الوزارة.
                </p>
                <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Btn variant="blue" onClick={reset}>🔄 بحث جديد</Btn>
                  <Btn variant="gray" onClick={() => navigate('/contact')}>💬 تواصل معنا</Btn>
                </div>
              </div>
            )}

            {/* عرض النتيجة */}
            {searched && !notFound && (
              <div className="page-enter" style={{ marginTop: '2rem' }}>
                {passed ? (
                  <SuccessBanner name={studentName} label={cfg.label} examType={examType} />
                ) : failed ? (
                  <GoodLuckBanner name={studentName} label={cfg.label} showPractice={cfg.showPractice} onPractice={() => navigate('/quiz')} />
                ) : null}

                <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(0,0,0,.10)', border: '1px solid #e2e8f0' }}>
                  {studentName && (
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '.82rem', color: '#94a3b8', fontWeight: 600, marginBottom: '.3rem' }}>الطالب</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0a2463' }}>{studentName}</div>
                      <div style={{ fontSize: '.82rem', color: '#475569', marginTop: '.3rem' }}>رقم الهوية: {id}</div>
                    </div>
                  )}
                  <ExamCard title={cfg.title} icon={cfg.icon} type={examType} data={data} />
                  <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.8rem' }}>
                    <Btn variant="blue" onClick={reset}>🔄 بحث جديد</Btn>
                    <Btn variant="gray" onClick={() => navigate(examType === 'theory' ? '/results/practical' : '/results/theory')}>
                      {examType === 'theory' ? '🚗 نتيجة العملي' : '📝 نتيجة النظري'}
                    </Btn>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
