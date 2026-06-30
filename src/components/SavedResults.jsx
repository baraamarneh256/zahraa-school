import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from './ui/SectionHeader'
import Btn from './ui/Btn'
import AnswerReview from './AnswerReview'

/*
 * عرض النتائج المحفوظة من localStorage مع إمكانية مراجعة الإجابات.
 * props:
 *   storageKey  مفتاح التخزين (مثل 'quiz_history' أو 'trainer_quiz_history')
 *   badge, title, subtitle  نصوص الترويسة
 *   label(entry)  دالة تُعيد عنوان المحاولة
 *   emptyCta { text, to }  زر يظهر عند عدم وجود نتائج
 */
export default function SavedResults({ storageKey, badge, title, subtitle, label, emptyCta }) {
  const navigate = useNavigate()
  const load = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]') } catch { return [] } }
  const [history, setHistory] = useState(load)
  const [openDate, setOpenDate] = useState(null)

  const persist = (updated) => {
    setHistory(updated)
    try { localStorage.setItem(storageKey, JSON.stringify(updated)) } catch {}
  }
  const deleteEntry = (date) => { if (openDate === date) setOpenDate(null); persist(history.filter(h => h.date !== date)) }
  const clearAll = () => { setOpenDate(null); persist([]) }

  const open = history.find(h => h.date === openDate)

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionHeader badge={badge} title={title} subtitle={subtitle} />

          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '.6rem' }}>🗂️</div>
              <p style={{ color: '#64748b', fontWeight: 600, marginBottom: '1.5rem' }}>لا توجد نتائج محفوظة بعد. ابدأ امتحاناً لتظهر نتائجك هنا.</p>
              {emptyCta && <Btn variant="blue" onClick={() => navigate(emptyCta.to)}>{emptyCta.text}</Btn>}
            </div>
          ) : open ? (
            /* ── مراجعة محاولة ── */
            <div className="page-enter">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.8rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                <button onClick={() => setOpenDate(null)} style={{ background: '#eff6ff', border: 'none', borderRadius: 8, padding: '.5rem .9rem', cursor: 'pointer', color: '#1a56db', fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>← رجوع للنتائج</button>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 800, color: '#0a2463' }}>{label(open)}</div>
                  <div style={{ fontSize: '.82rem', color: '#64748b' }}>
                    {new Date(open.date).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })} • {open.correct}/{open.total} {open.passed ? '✅ ناجح' : '❌ راسب'}
                  </div>
                </div>
              </div>

              {Array.isArray(open.questions) && open.questions.length > 0 ? (
                <AnswerReview questions={open.questions} answers={open.answers || []} />
              ) : (
                <p style={{ textAlign: 'center', color: '#94a3b8', fontWeight: 600, padding: '2rem 0' }}>
                  هذه المحاولة قديمة ولا تحتوي على تفاصيل الإجابات للمراجعة.
                </p>
              )}
            </div>
          ) : (
            /* ── قائمة المحاولات ── */
            <div className="page-enter">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button onClick={clearAll} style={{ background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 9, padding: '.5rem 1rem', cursor: 'pointer', color: '#dc2626', fontWeight: 700, fontFamily: "'Cairo',sans-serif", fontSize: '.85rem' }}>🗑 مسح كل النتائج</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                {history.map(h => {
                  const reviewable = Array.isArray(h.questions) && h.questions.length > 0
                  return (
                    <div key={h.date} style={{
                      background: '#fff', border: `2px solid ${h.passed ? '#bbf7d0' : '#fecaca'}`,
                      borderRadius: 14, padding: '1rem 1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                        <div style={{
                          width: 50, height: 50, borderRadius: 12, flexShrink: 0,
                          background: h.passed ? 'linear-gradient(135deg,#16a34a,#22c55e)' : 'linear-gradient(135deg,#ef4444,#f87171)',
                          color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
                        }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: 900 }}>{h.correct}</span>
                          <span style={{ fontSize: '.62rem' }}>من {h.total}</span>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 800, color: '#0a2463' }}>{label(h)}</div>
                          <div style={{ fontSize: '.8rem', color: '#64748b', marginTop: '.15rem' }}>
                            {new Date(h.date).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })}
                            <span style={{ fontWeight: 700, color: h.passed ? '#16a34a' : '#dc2626', marginRight: '.5rem' }}>• {h.passed ? 'ناجح ✅' : 'راسب ❌'}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                        <button
                          onClick={() => reviewable && setOpenDate(h.date)}
                          disabled={!reviewable}
                          title={reviewable ? 'مراجعة الإجابات' : 'غير متاح لهذه المحاولة'}
                          style={{
                            background: reviewable ? '#1a56db' : '#e2e8f0', color: reviewable ? '#fff' : '#94a3b8',
                            border: 'none', borderRadius: 10, padding: '.55rem 1.1rem',
                            cursor: reviewable ? 'pointer' : 'not-allowed', fontWeight: 800, fontFamily: "'Cairo',sans-serif", fontSize: '.85rem',
                          }}
                        >📝 مراجعة الإجابات</button>
                        <button
                          onClick={() => deleteEntry(h.date)}
                          title="حذف"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '1.3rem', lineHeight: 1, padding: '0 .3rem' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                        >×</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
