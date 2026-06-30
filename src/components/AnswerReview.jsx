/* مراجعة إجابات امتحان: يعرض كل سؤال مع إجابة المستخدم والإجابة الصحيحة. */

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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem', marginTop: '.6rem' }}>
      {codes.map(c => (
        <span key={c.key} style={{ display: 'inline-block', border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff', padding: 5, boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
          <i className={`signal ${c.key}`} style={{ display: 'block' }} />
        </span>
      ))}
    </div>
  )
}

const LABELS = ['أ', 'ب', 'ج', 'د', 'ه', 'و']

export default function AnswerReview({ questions = [], answers = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {questions.map((q, qi) => {
        const userAns = answers[qi]
        const unanswered = userAns === null || userAns === undefined
        return (
          <div key={qi} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '1.2rem 1.3rem', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.6rem' }}>
              <span style={{ fontSize: '.75rem', fontWeight: 800, color: '#fff', background: '#0a2463', borderRadius: 7, padding: '.2rem .6rem' }}>سؤال {qi + 1}</span>
              {unanswered
                ? <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#b45309', background: '#fef3c7', borderRadius: 7, padding: '.2rem .6rem' }}>لم تُجب</span>
                : userAns === q.ans
                  ? <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: 7, padding: '.2rem .6rem' }}>✓ صحيحة</span>
                  : <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#b91c1c', background: '#fee2e2', borderRadius: 7, padding: '.2rem .6rem' }}>✗ خاطئة</span>}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.7, marginBottom: '.6rem' }}>{stripSignCodes(q.q)}</div>
            <SignImages text={q.q} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '.7rem' }}>
              {q.opts.map((opt, i) => {
                const isCorrect = i === q.ans
                const isUserWrong = i === userAns && i !== q.ans
                const bg = isCorrect ? '#f0fdf4' : isUserWrong ? '#fff5f5' : '#fff'
                const border = isCorrect ? '#16a34a' : isUserWrong ? '#ef4444' : '#e2e8f0'
                const tag = isCorrect ? '✓ الإجابة الصحيحة' : isUserWrong ? '✗ إجابتك' : ''
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '.8rem', padding: '.7rem .9rem',
                    border: `2px solid ${border}`, borderRadius: 11, background: bg,
                  }}>
                    <span style={{
                      minWidth: 28, height: 28, borderRadius: 7, flexShrink: 0,
                      background: isCorrect ? '#16a34a' : isUserWrong ? '#ef4444' : '#f1f5f9',
                      color: isCorrect || isUserWrong ? '#fff' : '#475569',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '.82rem',
                    }}>{LABELS[i]}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: '.2rem', flex: 1 }}>
                      <span style={{ fontSize: '.92rem', color: '#1e293b', fontWeight: isCorrect || isUserWrong ? 700 : 500 }}>{stripSignCodes(opt)}</span>
                      <SignImages text={opt} />
                      {tag && <span style={{ fontSize: '.74rem', fontWeight: 800, color: isCorrect ? '#15803d' : '#b91c1c' }}>{tag}</span>}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
