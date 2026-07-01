import { useState, useMemo, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import Btn from '../components/ui/Btn'

const INPUT_STYLE = {
  padding: '.85rem 1.1rem', border: '1.5px solid #e2e8f0', borderRadius: 12,
  fontSize: '1rem', color: '#1e293b', background: '#f8fafc', width: '100%',
  fontFamily: "'Cairo',sans-serif", transition: 'all .3s', outline: 'none',
  textAlign: 'center', letterSpacing: '.05em',
}

const CONFIG = {
  theory: {
    label: 'النظري',
    badge: 'النتيجة النظرية',
    title: 'نتيجة الامتحان النظري',
    subtitle: 'أدخل رقم هويتك لعرض نتيجة الامتحان النظري مباشرةً من وزارة النقل',
    showPractice: true,
  },
  practical: {
    label: 'العملي',
    badge: 'النتيجة العملية',
    title: 'نتيجة الامتحان العملي',
    subtitle: 'أدخل رقم هويتك لعرض نتيجة الامتحان العملي مباشرةً من وزارة النقل',
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

const firstName = (name) => (name ? ` يا ${name.split(' ')[0]}` : '')

const CONFETTI_COLORS = ['#fde047', '#fb7185', '#60a5fa', '#34d399', '#f472b6', '#fbbf24', '#ffffff']

function Confetti({ count = 28 }) {
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

function InfoRow({ label, value, strong }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.6rem', fontSize: '.85rem', borderBottom: '1px solid rgba(255,255,255,.18)', paddingBottom: '.4rem' }}>
      <span style={{ opacity: .85 }}>{label}</span>
      <span style={{ fontWeight: strong ? 900 : 700 }}>{value}</span>
    </div>
  )
}

/** بطاقة واحدة مدمجة (مباركة + النتيجة) تظهر كاملة في شاشة واحدة على الجوال. */
function ResultCard({ examType, cfg, id, data, onReset, onSwitch, onPractice }) {
  const name = data.name || ''
  const passed = data.result === 'pass'
  const grad = passed ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#f59e0b,#f97316)'
  const shadow = passed ? '0 10px 30px rgba(16,185,129,.4)' : '0 10px 30px rgba(245,158,11,.35)'
  const rows = detailRows(examType, data.details)

  return (
    <div>
      <div className="result-pop" style={{
        position: 'relative', overflow: 'hidden', background: grad, color: '#fff',
        borderRadius: 20, padding: '1.8rem 1.4rem', textAlign: 'center', boxShadow: shadow,
      }}>
        {passed && <Confetti />}
        <div style={{ position: 'relative' }}>
          <div className={passed ? 'emoji-bounce' : 'emoji-pulse'} style={{ fontSize: '2.8rem', marginBottom: '.2rem' }}>{passed ? '🎉' : '💪'}</div>
          <div style={{ fontSize: '.78rem', fontWeight: 700, opacity: .9, marginBottom: '.3rem' }}>🚗 مدرسة الزهراء لتعليم السواقة</div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '.5rem' }}>
            {passed ? <>تبارك لك النجاح{firstName(name)}! 🎊</> : <>حظاً موفقاً في المرة القادمة{firstName(name)}</>}
          </h3>
          <p style={{ fontSize: '.88rem', opacity: .96, marginBottom: '1.1rem', lineHeight: 1.7 }}>
            {passed
              ? <>مبروك اجتيازك الامتحان {cfg.label} بنجاح. {examType === 'theory' ? 'والآن استعد للامتحان العملي 🚗💚' : 'ألف مبروك الرخصة 🚗💚'}</>
              : <>لم يحالفك الحظ هذه المرة في الامتحان {cfg.label}. راجِع وتدرّب، وستنجح بإذن الله 🌟</>}
          </p>

          <div style={{ background: 'rgba(255,255,255,.15)', borderRadius: 14, padding: '1rem 1.1rem', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {name && <InfoRow label="الطالب" value={name} />}
            <InfoRow label="رقم الهوية" value={id} />
            <InfoRow label="الامتحان" value={`الامتحان ${cfg.label}`} />
            {rows.map(([label, value]) => <InfoRow key={label} label={label} value={String(value)} />)}
            {data.date && <InfoRow label="تاريخ الامتحان" value={fmtDate(data.date)} />}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.6rem', fontSize: '.95rem', paddingTop: '.15rem' }}>
              <span style={{ opacity: .9, fontWeight: 700 }}>النتيجة</span>
              <span style={{ fontWeight: 900 }}>{passed ? 'ناجح ✅' : 'راسب ❌'}</span>
            </div>
          </div>

          {!passed && cfg.showPractice && (
            <button onClick={onPractice} style={{
              marginTop: '1.1rem', background: '#fff', color: '#c2410c', fontWeight: 800, fontSize: '.9rem',
              padding: '.7rem 1.6rem', borderRadius: 12, fontFamily: "'Cairo',sans-serif", boxShadow: '0 4px 14px rgba(0,0,0,.15)',
            }}>📝 تدرّب على الاختبار النظري</button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '.7rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <Btn variant="blue" onClick={onReset}>🔄 بحث جديد</Btn>
        <Btn variant="gray" onClick={onSwitch}>{examType === 'theory' ? '🚗 نتيجة العملي' : '📝 نتيجة النظري'}</Btn>
      </div>
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

  const doSearch = useCallback(async (searchId) => {
    const q = String(searchId || '').trim()
    if (!q) return
    setLoading(true); setError(''); setData(null); setSearched(false)
    try {
      const r = await fetch(`/api/exam-result?type=${examType}&id=${encodeURIComponent(q)}`)
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
  }, [examType])

  const submit = (e) => { e.preventDefault(); doSearch(id) }

  // عند تبديل نوع الامتحان (نظري ↔ عملي) بنفس الرقم: أعِد الجلب للنوع الجديد تلقائياً
  useEffect(() => {
    if (id.trim()) doSearch(id)
    else { setData(null); setSearched(false); setError('') }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examType])

  const reset = () => { setId(''); setData(null); setSearched(false); setError('') }

  const notFound = searched && data && !data.found
  const showResult = searched && data && data.found   // ناجح أو راسب — بطاقة واحدة مدمجة

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: showResult ? '2rem 1.5rem' : '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {showResult ? (
            /* عرض النتيجة: بطاقة واحدة تظهر كاملة في لقطة شاشة واحدة */
            <div className="page-enter" style={{ maxWidth: 480, margin: '0 auto' }}>
              <ResultCard
                examType={examType} cfg={cfg} id={id} data={data}
                onReset={reset}
                onSwitch={() => navigate(examType === 'theory' ? '/results/practical' : '/results/theory')}
                onPractice={() => navigate('/quiz')}
              />
            </div>
          ) : (
            <>
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
                <form onSubmit={submit} style={{ background: '#fff', borderRadius: 20, padding: '2.5rem 2rem', boxShadow: '0 4px 16px rgba(0,0,0,.10)', border: '1px solid #e2e8f0' }}>
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
              </div>
            </>
          )}

        </div>
      </section>
    </div>
  )
}
