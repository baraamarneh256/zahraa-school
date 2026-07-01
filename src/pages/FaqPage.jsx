import { useState } from 'react'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

const FAQS = [
  {
    q: 'ما هي الوثائق المطلوبة للتسجيل في المدرسة؟',
    a: 'تحتاج إلى: بطاقة هوية سارية المفعول، صورة شخصية حديثة، وشهادة لياقة طبية من طبيب معتمد. يمكنك التواصل معنا لمعرفة التفاصيل الكاملة.',
  },
  {
    q: 'كم تستغرق فترة تعلم القيادة؟',
    a: 'تختلف المدة حسب قدرة المتدرب، لكن في الغالب تتراوح بين 4 إلى 8 أسابيع للحصول على الجاهزية الكاملة لاجتياز الاختبار.',
  },
  {
    q: 'هل يمكنني اختبار التؤوريا قبل الدروس العملية؟',
    a: 'نعم، اختبار التؤوريا (النظري) يسبق الدروس العملية. يمكنك التدرب على أسئلة التؤوريا مجاناً من خلال قسم "الاختبار النظري" في موقعنا.',
  },
  {
    q: 'هل تقدمون دروساً للسيدات مع مدربات؟',
    a: 'نعم، نوفر مدربات متخصصات للسيدات اللواتي يفضلن التعلم مع مدربة. يُرجى التواصل معنا لتحديد الموعد المناسب.',
  },
  {
    q: 'ما هي أنواع رخص القيادة التي تُدرّسونها؟',
    a: 'ندرّس جميع أنواع الرخص: رخصة خصوصي (B)، رخصة شحن خفيف (C1)، رخصة شحن ثقيل (C)، رخصة تكسي (D1)، رخصة باص (D)، ورخصة تريلا (E).',
  },
  {
    q: 'ما هو عدد الدروس المطلوبة للحصول على الرخصة؟',
    a: 'يحدد المدرب عدد الدروس بناءً على مستوى المتدرب. في المعدل نحتاج بين 15 و30 درساً عملياً لضمان الجاهزية التامة للاختبار.',
  },
  {
    q: 'ما هي أوقات العمل في المدرسة؟',
    a: 'نعمل من الأحد إلى الخميس من الساعة 7 صباحاً حتى 6 مساءً. يمكن ترتيب مواعيد إضافية حسب الطلب.',
  },
  {
    q: 'هل يمكن حجز موعد عبر الهاتف؟',
    a: 'نعم، يمكنك التواصل معنا مباشرة عبر الهاتف أو واتساب على الأرقام المتاحة في صفحة "تواصل معنا" لحجز موعدك بسهولة.',
  },
  {
    q: 'ما الفرق بين رخصة B ورخصة C1؟',
    a: 'رخصة B (خصوصي) تتيح قيادة السيارات الخصوصية. رخصة C1 (شحن خفيف) تتيح قيادة الشاحنات الصغيرة التي يصل وزنها حتى 7.5 طن.',
  },
  {
    q: 'كيف أتدرب على أسئلة التؤوريا؟',
    a: 'يمكنك التدرب مجاناً عبر موقعنا في قسم "الاختبار النظري". يحتوي على امتحانات حقيقية بنفس أسلوب الامتحان الرسمي مع مؤقت وتقييم فوري.',
  },
]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: `2px solid ${open ? '#1a56db' : '#e2e8f0'}`,
      overflow: 'hidden', transition: 'border-color .25s', boxShadow: '0 2px 8px rgba(0,0,0,.05)',
    }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: "'Cairo',sans-serif", textAlign: 'right', gap: '1rem',
      }}>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0a2463', flex: 1 }}>{q}</span>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: open ? '#1a56db' : '#eff6ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .25s', transform: open ? 'rotate(180deg)' : 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={open ? '#fff' : '#1a56db'} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 1.5rem 1.2rem', borderTop: '1px solid #eff6ff' }}>
          <p style={{ fontSize: '.93rem', color: '#475569', lineHeight: 1.8, marginTop: '.8rem' }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <SectionHeader
              badge="أسئلة متكررة"
              title="الأسئلة الأكثر شيوعاً"
              subtitle="إجابات على أكثر الأسئلة التي يسألها المتدربون قبل الالتحاق بمدرسة الزهراء"
            />
          </Reveal>

          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
            {FAQS.map((item, i) => (
              <Reveal key={i} delay={i * 50}>
                <FaqItem
                  q={item.q}
                  a={item.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', maxWidth: 560, margin: '3rem auto 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.7rem' }}>💬</div>
              <h3 style={{ fontWeight: 800, color: '#0a2463', marginBottom: '.5rem' }}>لم تجد إجابة سؤالك؟</h3>
              <p style={{ color: '#475569', fontSize: '.9rem', marginBottom: '1.2rem' }}>تواصل معنا مباشرة عبر واتساب وسنرد عليك في أقرب وقت</p>
              <a href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                padding: '.8rem 2rem', borderRadius: 12, fontWeight: 800, fontSize: '.95rem',
                background: '#25d366', color: '#fff', textDecoration: 'none',
              }}>
                <WhatsAppIcon /> تواصل معنا
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
