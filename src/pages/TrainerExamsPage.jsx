import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TRAINER_EXAMS } from '../data/trainerExams'
import SectionHeader from '../components/ui/SectionHeader'
import Btn from '../components/ui/Btn'
import AnswerReview from '../components/AnswerReview'

const PASS_THRESHOLD = 40
const EXAM_SECONDS = 60 * 60
const HISTORY_KEY = 'trainer_quiz_history'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] }
}

/* ── صور الشاخصات داخل النص (نفس صيغة الاختبار النظري) ── */
const SIGN_LETTER = { 'أ': 'a', 'إ': 'a', 'آ': 'a', 'ا': 'a', 'ب': 'b', 'ج': 'c', 'د': 'd', 'ه': 'e', 'و': 'f' }

function stripSignCodes(text) {
  if (!text) return ''
  return text
    .replace(/\[\[[a-f]\d+[a-z]*\]\]/g, '')
    .replace(/([أإآابجدهو])ـ?-(\d+)/g, '')
    .trim()
}

function findSignCodes(text) {
  if (!text) return []
  const seen = new Set()
  const out = []
  let m
  const re1 = /\[\[([a-f])(\d+[a-z]*)\]\]/g
  while ((m = re1.exec(text)) !== null) {
    const cssKey = `${m[1]}${m[2]}`
    if (!seen.has(cssKey)) { seen.add(cssKey); out.push({ key: cssKey }) }
  }
  const re2 = /([أإآابجدهو])ـ?-(\d+)/g
  while ((m = re2.exec(text)) !== null) {
    const letter = SIGN_LETTER[m[1]]
    if (!letter) continue
    const cssKey = `${letter}${m[2]}`
    if (!seen.has(cssKey)) { seen.add(cssKey); out.push({ key: cssKey }) }
  }
  return out
}

function SignImages({ text }) {
  const codes = findSignCodes(text)
  if (!codes.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginTop: '.7rem' }}>
      {codes.map(c => (
        <span key={c.key} style={{ display: 'inline-block', border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff', padding: 5, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <i className={`signal ${c.key}`} style={{ display: 'block' }} />
        </span>
      ))}
    </div>
  )
}

export default function TrainerExamsPage() {
  const navigate = useNavigate()

  const [phase, setPhase]           = useState('exams') // 'exams' | 'active' | 'result' | 'timeout'
  const [selectedExam, setSelectedExam] = useState(null)
  const [questions, setQuestions]   = useState([])
  const [current, setCurrent]       = useState(0)
  const [answers, setAnswers]       = useState([])
  const [timeLeft, setTimeLeft]     = useState(0)
  const [resultData, setResultData] = useState(null)
  const [history, setHistory]       = useState(loadHistory)
  const timerRef = useRef(null)

  const persistHistory = (updated) => {
    setHistory(updated)
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)) } catch {}
  }

  const startQuiz = useCallback((exam) => {
    const processed = exam.questions.map(q => {
      const optsWithMeta = q.opts.map((opt, i) => ({
        text: opt.replace(/^[أبجدهوزحطيكلمنسعفصقرشت]-\s*/, '').trim(),
        isCorrect: i === q.ans,
      }))
      const shuffled = shuffle(optsWithMeta)
      return {
        q: q.q,
        opts: shuffled.map(o => o.text),
        ans: shuffled.findIndex(o => o.isCorrect),
      }
    })
    clearInterval(timerRef.current)
    setSelectedExam(exam)
    setQuestions(processed)
    setAnswers(new Array(processed.length).fill(null))
    setCurrent(0)
    setTimeLeft(EXAM_SECONDS)
    setResultData(null)
    setPhase('active')
  }, [])

  useEffect(() => {
    if (phase !== 'active') { clearInterval(timerRef.current); return }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setPhase('timeout'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  const chooseAnswer = (chosen) => {
    setAnswers(prev => { const a = [...prev]; a[current] = chosen; return a })
  }

  const submitExam = useCallback((answersSnap, qs, exam) => {
    clearInterval(timerRef.current)
    let correctCount = 0
    answersSnap.forEach((ans, i) => { if (ans === qs[i]?.ans) correctCount++ })
    const passed = correctCount >= PASS_THRESHOLD
    const entry = {
      date: new Date().toISOString(),
      examName: exam.name,
      correct: correctCount,
      total: qs.length,
      passed,
      questions: qs,            // لحفظ الأسئلة ومراجعتها لاحقاً
      answers: answersSnap,     // إجابات المستخدم
    }
    const updated = [entry, ...history].slice(0, 50)
    persistHistory(updated)
    setResultData({ correctCount, passed, answersSnap, qs })
    setPhase('result')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history])

  useEffect(() => {
    if (phase === 'timeout' && questions.length > 0) {
      submitExam(answers, questions, selectedExam)
    }
  }, [phase, answers, questions, selectedExam, submitExam])

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')
  const timerColor = timeLeft < 60 ? '#842029' : timeLeft < 300 ? '#856404' : '#1a56db'
  const timerBg   = timeLeft < 60 ? '#f8d7da' : timeLeft < 300 ? '#fff3cd' : '#eff6ff'
  const answeredCount = answers.filter(a => a !== null).length

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader badge="الشامل للمدربين" title="امتحانات الشامل للمدربين" subtitle="نماذج امتحانات تدريبية للمدربين مع مؤقت وتصحيح فوري" />
          <div style={{ maxWidth: 800, margin: '0 auto' }}>

            {/* ── قائمة النماذج ── */}
            {phase === 'exams' && (
              <div className="page-enter">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                    <button onClick={() => navigate('/trainers')} style={{ background: '#eff6ff', border: 'none', borderRadius: 8, padding: '.5rem .9rem', cursor: 'pointer', color: '#1a56db', fontWeight: 700, fontFamily: "'Cairo',sans-serif" }}>← رجوع</button>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0a2463' }}>اختر النموذج لبدء الامتحان:</h3>
                  </div>
                  {history.length > 0 && (
                    <button onClick={() => navigate('/trainers/results')} style={{
                      background: '#eff6ff', border: '2px solid #dbeafe', borderRadius: 10,
                      padding: '.5rem 1rem', cursor: 'pointer', color: '#1a56db', fontWeight: 800,
                      fontFamily: "'Cairo',sans-serif", fontSize: '.85rem',
                    }}>📊 نتائجي المحفوظة ({history.length})</button>
                  )}
                </div>

                {TRAINER_EXAMS.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#94a3b8', fontWeight: 600, fontSize: '.95rem', padding: '3rem 0' }}>🔜 ستُضاف النماذج قريباً</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                    {TRAINER_EXAMS.map((exam, i) => (
                      <div key={i} onClick={() => startQuiz(exam)} style={{
                        background: '#fff', border: '2px solid #e2e8f0', borderRadius: 14,
                        padding: '1.2rem 1.5rem', cursor: 'pointer', transition: 'all .25s',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        boxShadow: '0 2px 8px rgba(0,0,0,.06)',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#1a56db'; e.currentTarget.style.background = '#eff6ff' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#0a2463,#1a56db)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '1rem' }}>{i + 1}</div>
                          <div>
                            <div style={{ fontWeight: 800, color: '#0a2463' }}>{exam.name}</div>
                            <div style={{ fontSize: '.82rem', color: '#475569', marginTop: '.2rem' }}>{exam.questions.length} سؤال • 60 دقيقة • النجاح: 40 من 50</div>
                          </div>
                        </div>
                        <span style={{ color: '#1a56db', fontWeight: 700, fontSize: '1.2rem' }}>←</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── الامتحان الجاري ── */}
            {phase === 'active' && questions.length > 0 && (
              <div className="page-enter">
                <div style={{ background: '#fff', borderRadius: 20, padding: '1.2rem 1.5rem', marginBottom: '1.2rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.8rem' }}>
                    <span style={{ fontSize: '.88rem', color: '#475569' }}>
                      سؤال <strong style={{ color: '#1a56db' }}>{current + 1}</strong> / <strong style={{ color: '#1a56db' }}>{questions.length}</strong>
                      <span style={{ marginRight: '.6rem', color: '#94a3b8' }}>• أجبت على {answeredCount}</span>
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: timerBg, color: timerColor, padding: '.4rem 1rem', borderRadius: 50, fontWeight: 700, fontSize: '.95rem', direction: 'ltr' }}>
                      ⏱️ {mm}:{ss}
                    </div>
                  </div>
                  <div style={{ background: '#e2e8f0', borderRadius: 50, height: 7, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg,#1a56db,#60a5fa)', borderRadius: 50, width: `${((current + 1) / questions.length) * 100}%`, transition: 'width .4s' }} />
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,.08)', marginBottom: '1.2rem' }}>
                  <div style={{ fontSize: '.78rem', fontWeight: 700, color: '#2563eb', marginBottom: '.7rem', letterSpacing: '.04em' }}>السؤال {current + 1}</div>
                  <div style={{ fontSize: '1.08rem', fontWeight: 700, color: '#1e293b', marginBottom: findSignCodes(questions[current].q).length ? '.5rem' : '1.5rem', lineHeight: 1.7 }}>{stripSignCodes(questions[current].q)}</div>
                  <SignImages text={questions[current].q} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
                    {questions[current].opts.map((opt, i) => {
                      const selected = answers[current] === i
                      const labels = ['أ', 'ب', 'ج', 'د']
                      return (
                        <button key={i} onClick={() => chooseAnswer(i)} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '.9rem 1.2rem',
                          border: `2px solid ${selected ? '#1a56db' : '#e2e8f0'}`,
                          borderRadius: 12, background: selected ? '#eff6ff' : '#fff',
                          cursor: 'pointer', transition: 'all .2s',
                          textAlign: 'right', width: '100%', fontFamily: "'Cairo',sans-serif",
                        }}>
                          <span style={{
                            minWidth: 32, height: 32, borderRadius: 8,
                            background: selected ? '#1a56db' : '#f1f5f9',
                            color: selected ? '#fff' : '#475569',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '.85rem', flexShrink: 0, transition: 'all .2s',
                          }}>{labels[i]}</span>
                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '.92rem', color: selected ? '#0a2463' : '#1e293b', fontWeight: selected ? 700 : 500 }}>{stripSignCodes(opt)}</span>
                            <SignImages text={opt} />
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Btn variant="gray" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>→ السابق</Btn>
                  <div style={{ fontSize: '.85rem', color: '#475569', fontWeight: 600 }}>{answeredCount} / {questions.length}</div>
                  <Btn variant="blue" onClick={() => setCurrent(c => Math.min(questions.length - 1, c + 1))} disabled={current === questions.length - 1}>← التالي</Btn>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => submitExam(answers, questions, selectedExam)}
                    style={{
                      background: 'linear-gradient(135deg,#10b981,#059669)',
                      color: '#fff', border: 'none', borderRadius: 14,
                      padding: '.85rem 2.5rem', fontSize: '1rem', fontWeight: 800,
                      cursor: 'pointer', fontFamily: "'Cairo',sans-serif",
                      boxShadow: '0 4px 14px rgba(16,185,129,.3)', transition: 'all .25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    ✅ تسليم الامتحان ({answeredCount}/{questions.length} أجوبة)
                  </button>
                </div>
              </div>
            )}

            {/* ── النتيجة ── */}
            {phase === 'result' && resultData && (
              <ResultScreen
                resultData={resultData}
                onRetry={() => startQuiz(selectedExam)}
                onHome={() => navigate('/')}
                onContact={() => navigate('/contact')}
                onExams={() => setPhase('exams')}
              />
            )}

          </div>
        </div>
      </section>
    </div>
  )
}

function ResultScreen({ resultData, onRetry, onHome, onContact, onExams }) {
  const { correctCount, passed, answersSnap, qs } = resultData
  const wrongCount = answersSnap.filter((a, i) => a !== null && a !== qs[i]?.ans).length
  const unanswered = answersSnap.filter(a => a === null).length
  const [showReview, setShowReview] = useState(false)

  return (
    <div className="page-enter" style={{ background: '#fff', borderRadius: 20, padding: '3rem 2rem', textAlign: 'center', border: `2px solid ${passed ? '#10b981' : '#ef4444'}`, boxShadow: '0 4px 24px rgba(0,0,0,.10)' }}>
      <div style={{
        width: 150, height: 150, borderRadius: '50%', margin: '0 auto 1.5rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: passed ? 'linear-gradient(135deg,#d1fae5,#a7f3d0)' : 'linear-gradient(135deg,#fee2e2,#fecaca)',
        border: `4px solid ${passed ? '#10b981' : '#ef4444'}`,
        color: passed ? '#065f46' : '#991b1b',
      }}>
        <div style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1 }}>{correctCount}</div>
        <div style={{ fontSize: '.8rem', fontWeight: 600 }}>من {qs.length}</div>
      </div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0a2463', marginBottom: '.5rem' }}>
        {passed ? '🎉 مبروك! اجتزت الامتحان' : '😔 لم تنجح هذه المرة'}
      </h3>
      <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '.95rem' }}>
        {passed
          ? `ممتاز! أجبت على ${correctCount} سؤالاً صحيحاً. الحد الأدنى للنجاح 40 من 50.`
          : `حصلت على ${correctCount} من ${qs.length}. تحتاج 40 إجابة صحيحة على الأقل من 50.`}
      </p>
      <div className="result-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { val: correctCount, lbl: 'صحيحة',   col: '#10b981', bg: '#d1fae5' },
          { val: wrongCount,   lbl: 'خاطئة',    col: '#ef4444', bg: '#fee2e2' },
          { val: unanswered,   lbl: 'لم تُجب',  col: '#94a3b8', bg: '#f1f5f9' },
        ].map(s => (
          <div key={s.lbl} style={{ background: s.bg, borderRadius: 12, padding: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: s.col }}>{s.val}</div>
            <div style={{ fontSize: '.78rem', color: '#475569', marginTop: '.2rem' }}>{s.lbl}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Btn variant="blue" onClick={() => setShowReview(s => !s)}>{showReview ? '🙈 إخفاء المراجعة' : '📝 مراجعة إجاباتي'}</Btn>
        <Btn variant="blue" onClick={onRetry}>🔄 حاول مرة أخرى</Btn>
        <Btn variant="gray" onClick={onExams}>📋 نماذج أخرى</Btn>
        <Btn variant="blue" onClick={onContact}>💬 تواصل معنا</Btn>
        <Btn variant="gray" onClick={onHome}>🏠 الرئيسية</Btn>
      </div>

      {showReview && (
        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <AnswerReview questions={qs} answers={answersSnap} />
        </div>
      )}
    </div>
  )
}
