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

function fmtDate(d) {
  if (!d) return ''
  const date = new Date(d)
  if (isNaN(date)) return d
  return date.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })
}

/** صفوف التفاصيل لكل نوع امتحان من حقول الوزارة الأصلية. */
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

function ExamCard({ title, icon, type, data }) {
  // data: استجابة الوسيط لهذا النوع، أو null
  const status = !data || !data.found ? 'none' : data.result === 'pass' ? 'pass' : 'fail'
  const meta = STATUS_META[status]
  const rows = data && data.found ? detailRows(type, data.details) : []

  return (
    <div style={{
      background: meta.bg, border: `1.5px solid ${meta.border}`, borderRadius: 16,
      padding: '1.5rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '.4rem' }}>{icon}</div>
      <div style={{ fontWeight: 800, color: '#0a2463', fontSize: '1rem', marginBottom: '.8rem' }}>{title}</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '.4rem',
        background: '#fff', borderRadius: 50, padding: '.4rem 1rem',
        fontWeight: 800, color: meta.col, fontSize: '.95rem',
        border: `1.5px solid ${meta.border}`,
      }}>
        <span>{meta.icon}</span>{meta.label}
      </div>

      {data && data.found && (
        <div style={{ marginTop: '1rem', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
          {data.date && (
            <Row label="تاريخ الامتحان" value={fmtDate(data.date)} />
          )}
          {rows.map(([label, value]) => (
            <Row key={label} label={label} value={String(value)} />
          ))}
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

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.5rem', fontSize: '.82rem', borderBottom: '1px dashed #e2e8f0', paddingBottom: '.35rem' }}>
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ color: '#1e293b', fontWeight: 700 }}>{value}</span>
    </div>
  )
}

const firstName = (name) => (name ? ` يا ${name.split(' ')[0]}` : '')
const joinAr = (arr) => arr.join(' و')

const CONFETTI_COLORS = ['#fde047', '#fb7185', '#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#ffffff']

/** قصاصات ورق متساقطة للاحتفال. */
function Confetti({ count = 40 }) {
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 2.5,
    dur: 2.6 + Math.random() * 1.8,
    size: 6 + Math.random() * 6,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    round: i % 3 === 0,
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

/** لافتة المباركة عند النجاح الكامل. */
function SuccessBanner({ name }) {
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
        <div style={{ fontSize: '.85rem', fontWeight: 700, opacity: .9, marginBottom: '.3rem' }}>
          🚗 مدرسة الزهراء لتعليم السواقة
        </div>
        <h3 style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '.6rem' }}>
          تبارك لك النجاح{firstName(name)}! 🎊
        </h3>
        <p style={{ fontSize: '.98rem', opacity: .95, marginBottom: '.4rem' }}>
          مبروك اجتيازك الامتحانين النظري والعملي بنجاح.
        </p>
        <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>ألف مبروك الرخصة 🚗💚</p>
      </div>
    </div>
  )
}

/** لافتة التشجيع عند الرسوب — "حظاً موفقاً في المرة القادمة". */
function GoodLuckBanner({ name, passedLabels, failedLabels, onPractice }) {
  return (
    <div className="result-pop" style={{
      background: 'linear-gradient(135deg,#f59e0b,#f97316)', color: '#fff',
      borderRadius: 20, padding: '2.6rem 2rem', textAlign: 'center', marginBottom: '1.5rem',
      boxShadow: '0 10px 30px rgba(245,158,11,.35)',
    }}>
      <div className="emoji-pulse" style={{ fontSize: '3.6rem', marginBottom: '.4rem' }}>💪</div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '.6rem' }}>
        حظاً موفقاً في المرة القادمة{firstName(name)}
      </h3>
      <p style={{ fontSize: '.95rem', opacity: .96, marginBottom: '1.4rem', lineHeight: 1.8 }}>
        {passedLabels.length > 0
          ? <>نجحت في الامتحان {joinAr(passedLabels)} 👏 — وبقي امتحان {joinAr(failedLabels)}. لا تستسلم، النجاح صار قريباً!</>
          : <>لم يحالفك الحظ هذه المرة في الامتحان {joinAr(failedLabels)}. راجِع وتدرّب، وستنجح بإذن الله 🌟</>}
      </p>
      <button onClick={onPractice} style={{
        background: '#fff', color: '#c2410c', fontWeight: 800, fontSize: '.95rem',
        padding: '.8rem 1.8rem', borderRadius: 12, fontFamily: "'Cairo',sans-serif",
        boxShadow: '0 4px 14px rgba(0,0,0,.15)',
      }}>
        📝 تدرّب على الاختبار النظري
      </button>
    </div>
  )
}

/** لافتة عند نجاح امتحان واحد وانتظار الآخر — مباركة من المدرسة. */
function PartialBanner({ name, passedLabels, pendingLabels }) {
  return (
    <div className="result-pop" style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff',
      borderRadius: 20, padding: '2.6rem 2rem', textAlign: 'center', marginBottom: '1.5rem',
      boxShadow: '0 10px 30px rgba(16,185,129,.4)',
    }}>
      <Confetti count={28} />
      <div style={{ position: 'relative' }}>
        <div className="emoji-bounce" style={{ fontSize: '3.4rem', marginBottom: '.3rem' }}>🎉</div>
        <div style={{ fontSize: '.85rem', fontWeight: 700, opacity: .9, marginBottom: '.3rem' }}>
          🚗 مدرسة الزهراء لتعليم السواقة
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '.6rem' }}>
          تبارك لك النجاح{firstName(name)}! 🎊
        </h3>
        <p style={{ fontSize: '.95rem', opacity: .96, lineHeight: 1.8 }}>
          مبروك نجاحك في الامتحان {joinAr(passedLabels)} ✅
          {pendingLabels.length > 0 && (
            <> — وبالتوفيق في الامتحان {joinAr(pendingLabels)}، بانتظار صدور نتيجته 🤍</>
          )}
        </p>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [theory, setTheory] = useState(null)
  const [practical, setPractical] = useState(null)
  const [searched, setSearched] = useState(false)

  const fetchOne = async (type) => {
    const r = await fetch(`/api/exam-result?type=${type}&id=${encodeURIComponent(id.trim())}`)
    if (!r.ok) {
      const e = await r.json().catch(() => ({}))
      throw new Error(e.error || 'تعذّر جلب النتيجة')
    }
    return r.json()
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!id.trim()) return
    setLoading(true); setError(''); setTheory(null); setPractical(null); setSearched(false)
    try {
      const [th, pr] = await Promise.all([fetchOne('theory'), fetchOne('practical')])
      setTheory(th); setPractical(pr); setSearched(true)
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء الاتصال بخادم الوزارة')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setId(''); setTheory(null); setPractical(null); setSearched(false); setError('')
  }

  const studentName = theory?.name || practical?.name || ''
  const labelOf = (e) => (e.type === 'theory' ? 'النظري' : 'العملي')
  const examList = [theory, practical].filter(Boolean)
  const passedLabels = examList.filter(e => e.found && e.result === 'pass').map(labelOf)
  const failedLabels = examList.filter(e => e.found && e.result === 'fail').map(labelOf)
  const pendingLabels = examList.filter(e => !e.found).map(labelOf)

  const bothPassed = theory?.found && practical?.found &&
    theory.result === 'pass' && practical.result === 'pass'
  const anyFailed = failedLabels.length > 0
  const nothingFound = searched && !theory?.found && !practical?.found

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader
            badge="نتائج الامتحانات"
            title="استعلم عن نتيجتك"
            subtitle="أدخل رقم هويتك لعرض نتيجة الامتحان النظري والعملي مباشرةً من وزارة النقل"
          />

          <div style={{ maxWidth: 560, margin: '0 auto' }}>

            {/* نموذج البحث */}
            <form onSubmit={submit} style={{
              background: '#fff', borderRadius: 20, padding: '2.5rem 2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,.10)', border: '1px solid #e2e8f0',
            }}>
              <label style={{ display: 'block', fontSize: '.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '.7rem', textAlign: 'center' }}>
                🆔 رقم الهوية
              </label>
              <input
                value={id}
                onChange={e => setId(e.target.value.replace(/[^\d]/g, ''))}
                inputMode="numeric"
                placeholder="أدخل رقم الهوية"
                style={INPUT_STYLE}
                autoFocus
                disabled={loading}
              />
              <button type="submit" disabled={!id.trim() || loading} style={{
                width: '100%', marginTop: '1.2rem', padding: '1rem',
                background: (!id.trim() || loading) ? '#94a3b8' : '#1a56db', color: '#fff',
                borderRadius: 12, fontSize: '1rem', fontWeight: 800, border: 'none',
                cursor: (!id.trim() || loading) ? 'not-allowed' : 'pointer',
                fontFamily: "'Cairo',sans-serif", transition: 'all .3s',
              }}>
                {loading ? '⏳ جارٍ الاستعلام...' : '🔍 عرض النتيجة'}
              </button>
              <p style={{ fontSize: '.72rem', color: '#94a3b8', textAlign: 'center', marginTop: '.9rem' }}>
                النتائج رسمية ومأخوذة مباشرةً من وزارة النقل والمواصلات
              </p>
            </form>

            {/* خطأ في الاتصال */}
            {error && (
              <div className="page-enter" style={{
                marginTop: '2rem', background: '#fff', borderRadius: 20, padding: '2rem',
                textAlign: 'center', border: '2px solid #fecaca', boxShadow: '0 4px 16px rgba(0,0,0,.08)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>⚠️</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#991b1b', marginBottom: '.5rem' }}>تعذّر جلب النتيجة</h3>
                <p style={{ color: '#475569', fontSize: '.88rem', marginBottom: '1.5rem' }}>{error}</p>
                <Btn variant="blue" onClick={reset}>🔄 حاول مجدداً</Btn>
              </div>
            )}

            {/* لا نتيجة في الامتحانين */}
            {nothingFound && (
              <div className="page-enter" style={{
                marginTop: '2rem', background: '#fff', borderRadius: 20, padding: '2.5rem 2rem',
                textAlign: 'center', border: '2px solid #fde68a', boxShadow: '0 4px 16px rgba(0,0,0,.08)',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '.8rem' }}>🔎</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#92400e', marginBottom: '.5rem' }}>
                  لا توجد نتائج بهذا الرقم
                </h3>
                <p style={{ color: '#475569', fontSize: '.9rem', marginBottom: '1.5rem' }}>
                  تأكد من رقم الهوية، أو ربما لم تُصدَر نتيجتك بعد لدى الوزارة.
                </p>
                <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Btn variant="blue" onClick={reset}>🔄 بحث جديد</Btn>
                  <Btn variant="gray" onClick={() => navigate('/contact')}>💬 تواصل معنا</Btn>
                </div>
              </div>
            )}

            {/* عرض النتيجة */}
            {searched && !nothingFound && (
              <div className="page-enter" style={{ marginTop: '2rem' }}>

                {/* لافتة النتيجة: مباركة / تشجيع / نجاح جزئي */}
                {bothPassed ? (
                  <SuccessBanner name={studentName} />
                ) : anyFailed ? (
                  <GoodLuckBanner
                    name={studentName}
                    passedLabels={passedLabels}
                    failedLabels={failedLabels}
                    onPractice={() => navigate('/quiz')}
                  />
                ) : passedLabels.length > 0 ? (
                  <PartialBanner
                    name={studentName}
                    passedLabels={passedLabels}
                    pendingLabels={pendingLabels}
                  />
                ) : null}

                <div style={{
                  background: '#fff', borderRadius: 20, padding: '2rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,.10)', border: '1px solid #e2e8f0',
                }}>
                  {studentName && (
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '.82rem', color: '#94a3b8', fontWeight: 600, marginBottom: '.3rem' }}>الطالب</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0a2463' }}>{studentName}</div>
                      <div style={{ fontSize: '.82rem', color: '#475569', marginTop: '.3rem' }}>رقم الهوية: {id}</div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <ExamCard title="الامتحان النظري" icon="📝" type="theory" data={theory} />
                    <ExamCard title="الامتحان العملي" icon="🚗" type="practical" data={practical} />
                  </div>

                  <div style={{ display: 'flex', gap: '.8rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.8rem' }}>
                    <Btn variant="blue" onClick={reset}>🔄 بحث جديد</Btn>
                    <Btn variant="gray" onClick={() => navigate('/contact')}>💬 تواصل معنا</Btn>
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
