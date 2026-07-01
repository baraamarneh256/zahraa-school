import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import FeatureCard from '../components/ui/FeatureCard'
import Btn from '../components/ui/Btn'
import Reveal from '../components/ui/Reveal'
import { useCountUp } from '../hooks/useCountUp'
import zahraaCarImg from '../public/zahraa-car.png'

/* ── Hero stat with counter ── */
function HeroStat({ target, suffix = '', label, active }) {
  const val = useCountUp(target, active)
  return (
    <div style={{
      background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)',
      borderRadius: 12, padding: '1rem', textAlign: 'center', backdropFilter: 'blur(8px)',
    }}>
      <div className="hero-stat-num" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>
        {val.toLocaleString('ar')}{suffix}
      </div>
      <div style={{ fontSize: '.78rem', opacity: .8, marginTop: '.15rem', color: '#fff' }}>{label}</div>
    </div>
  )
}

/* ── Quick link card ── */
function QuickLink({ icon, label, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem',
        padding: '1.2rem .8rem', borderRadius: 12, cursor: 'pointer', transition: 'all .3s',
        background: hov ? '#1a56db' : '#eff6ff',
        color: hov ? '#fff' : '#1034a6', fontWeight: 700, fontSize: '.88rem', textAlign: 'center',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>
      <span style={{ fontSize: '1.8rem' }}>{icon}</span>
      <span>{label}</span>
    </div>
  )
}

const FEATURES = [
  { icon: '👨‍🏫', title: 'مدربون معتمدون', desc: 'فريق من المدربين ذوي الخبرة والشهادات المعتمدة من وزارة المواصلات' },
  { icon: '🚗', title: 'سيارات حديثة', desc: 'أسطول من السيارات الحديثة المجهزة بأحدث معدات السلامة ومزدوجة التحكم' },
  { icon: '📅', title: 'مواعيد مرنة', desc: 'احجز موعدك في الوقت الذي يناسبك، صباحاً أو مساءً، أيام الأسبوع أو العطل' },
  { icon: '📝', title: 'دورات نظرية مجانية', desc: 'اختبارات ودورات مجانية لمساعدتك على اجتياز اختبار التؤوريا بسهولة' },
  { icon: '💳', title: 'أسعار تنافسية', desc: 'باقات متنوعة تناسب جميع الميزانيات مع إمكانية التقسيط المريح' },
  { icon: '🏆', title: 'نسبة نجاح عالية', desc: '98% من طلابنا ينجحون في الاختبار من أول محاولة بفضل منهجنا المتطور' },
]


export default function HomePage() {
  const setPage = useNavigate()
  const [statsActive, setStatsActive] = useState(false)
  const statsRef = useRef(null)
  const heroBgRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true) }, { threshold: .3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (heroBgRef.current)
        heroBgRef.current.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="page-enter">
      {/* ══ HERO ══ */}
      <section style={{
        minHeight: '100vh', paddingTop: 70,
        background: 'linear-gradient(135deg,#0a2463 0%,#1a56db 60%,#3b82f6 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        {/* Hero image */}
        <div ref={heroBgRef} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${zahraaCarImg})`,
          backgroundSize: '35%',
          backgroundPosition: 'center 50%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.22, pointerEvents: 'none',
          willChange: 'background-position',
        }} />
        {/* Blobs */}
        {[{ w:400,h:400,top:-100,left:-100 },{ w:300,h:300,bottom:-80,right:-80 },{ w:200,h:200,top:'40%',left:'60%' }].map((s,i) => (
          <div key={i} style={{ position:'absolute', borderRadius:'50%', background:'rgba(255,255,255,.06)', width:s.w, height:s.h, top:s.top, bottom:s.bottom, left:s.left, right:s.right, pointerEvents:'none' }} />
        ))}

        <div className="hero-layout" style={{
          maxWidth: 1200, margin: '0 auto', padding: '4rem 1.5rem',
          position: 'relative', zIndex: 1, width: '100%',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
        }}>
          {/* Left content */}
          <div style={{ color: '#fff' }}>
            {/* Logo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <img src="/zahraa-logo.png" alt="شعار مدرسة الزهراء"
                style={{ height: 130, width: 'auto', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,.35)', border: '2px solid rgba(255,255,255,.2)' }}
                onError={e => e.target.style.display = 'none'} />
            </div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'.5rem', background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)', borderRadius:50, padding:'.4rem 1rem', fontSize:'.85rem', fontWeight:600, marginBottom:'1.5rem' }}>
              <span>⭐</span> مرخصة ومعتمدة رسمياً منذ 1984
            </div>
            <h1 style={{ fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:900, lineHeight:1.2, marginBottom:'1.2rem' }}>
              تعلّم السواقة بثقة<br />مع <span style={{ color: '#f59e0b' }}>مدرسة الزهراء</span>
            </h1>
            <p style={{ fontSize:'1.05rem', opacity:.88, marginBottom:'2rem', maxWidth:440 }}>
              نقدم تعليماً احترافياً لتعلم قيادة السيارات بيد مدربين خبراء ومعتمدين. نصلك إلى رخصة القيادة بأسرع وقت وأعلى مستوى.
            </p>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
              <Btn variant="primary" onClick={() => setPage('/quiz')}>📝 جرّب الاختبار النظري</Btn>
              <Btn variant="outline" onClick={() => setPage('/contact')}>💬 تواصل معنا</Btn>
            </div>
            <div style={{ display:'flex', gap:'.75rem', flexWrap:'wrap', marginTop:'1rem' }}>
              <button onClick={() => setPage('/results')} style={{
                display:'inline-flex', alignItems:'center', gap:'.4rem',
                padding:'.6rem 1.2rem', borderRadius:10, fontWeight:700, fontSize:'.88rem',
                background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.35)',
                color:'#fff', fontFamily:"'Cairo',sans-serif", backdropFilter:'blur(6px)', cursor:'pointer',
              }}>📊 نتيجة الامتحان النظري والعملي</button>
            </div>
            <div ref={statsRef} className="hero-stats" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginTop:'2.5rem' }}>
              <HeroStat target={5000} label="طالب ناجح" active={statsActive} />
              <HeroStat target={30} suffix="+" label="سنة خبرة" active={statsActive} />
              <HeroStat target={98} suffix="%" label="نسبة النجاح" active={statsActive} />
            </div>
          </div>

          {/* Right card */}
          <div className="hero-side-card" style={{ background:'#fff', borderRadius:20, padding:'2rem', boxShadow:'0 10px 40px rgba(0,0,0,.14)' }}>
            <div style={{ textAlign:'center', marginBottom:'1.2rem' }}>
              <img src="/zahraa-logo.png" alt="شعار"
                style={{ height:90, width:'auto', borderRadius:12, margin:'0 auto', boxShadow:'0 4px 16px rgba(0,0,0,.10)' }}
                onError={e => e.target.style.display='none'} />
            </div>
            <div style={{ fontWeight:800, fontSize:'1.2rem', color:'#0a2463', marginBottom:'1.5rem', paddingBottom:'.8rem', borderBottom:'2px solid #eff6ff' }}>🚀 ابدأ رحلتك الآن</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.75rem' }}>
              <QuickLink icon="📋" label="الخطوات" onClick={() => setPage('/steps')} />
              <QuickLink icon="📚" label="المواد الدراسية" onClick={() => setPage('/study')} />
            </div>
            <div style={{ marginTop:'1.5rem', paddingTop:'1.2rem', borderTop:'1px solid #e2e8f0', display:'flex', flexDirection:'column', gap:'.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.6rem', fontSize:'.88rem', color:'#475569' }}>
                <span>📞</span>
                <div style={{ display:'flex', flexDirection:'column', gap:'.1rem' }}>
                  <a href="tel:0597055200" style={{ color:'#1a56db', textDecoration:'none', fontWeight:600 }}>0597055200 — عز</a>
                  <a href="tel:0599201030" style={{ color:'#1a56db', textDecoration:'none', fontWeight:600 }}>0599201030 — كامل</a>
                  <a href="tel:0599788821" style={{ color:'#1a56db', textDecoration:'none', fontWeight:600 }}>0599788821 — حسام</a>
                </div>
              </div>
              {[['📍','جنين - دوار البطيخة'],['🕐','يومياً 7ص - 6م']].map(([icon,text]) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:'.6rem', fontSize:'.88rem', color:'#475569' }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section className="section" style={{ padding:'5rem 1.5rem' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal><SectionHeader badge="لماذا تختارنا؟" title="مميزات مدرسة الزهراء" subtitle="نقدم تجربة تعليمية متكاملة تجمع بين الاحترافية والأمان والمرونة" /></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.5rem' }}>
            {FEATURES.map((f, i) => <Reveal key={f.title} delay={i * 100}><FeatureCard {...f} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div style={{ background:'linear-gradient(135deg,#0a2463,#1a56db)', padding:'4rem 1.5rem' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'2rem', textAlign:'center' }}>
          {[['👨‍🎓','+5000','طالب تخرج من مدرستنا'],['📅','+30','سنة من الخبرة'],['👨‍🏫','5','مدربين معتمدين'],['⭐','98%','نسبة النجاح من أول محاولة']].map(([icon,num,label], i) => (
            <Reveal key={label} delay={i * 120}>
              <div style={{ padding:'1.5rem' }}>
                <div style={{ fontSize:'2rem', marginBottom:'.8rem' }}>{icon}</div>
                <div style={{ fontSize:'3rem', fontWeight:900, color:'#fff', lineHeight:1 }}>{num}</div>
                <div style={{ fontSize:'.9rem', color:'rgba(255,255,255,.8)', marginTop:'.5rem' }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section className="section" style={{ padding:'5rem 1.5rem' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>
            <Reveal from="left"><div style={{ background:'linear-gradient(135deg,#1034a6,#2563eb)', borderRadius:20, padding:'3rem 2rem', color:'#fff', textAlign:'center', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 70% 30%,rgba(255,255,255,.1) 0%,transparent 60%)' }} />
              <div style={{ fontSize:'5rem', marginBottom:'1.5rem', position:'relative' }}>🏫</div>
              <h3 style={{ fontSize:'1.4rem', fontWeight:900, position:'relative' }}>مدرسة الزهراء لتعليم السواقة</h3>
              <p style={{ fontSize:'.9rem', opacity:.85, position:'relative', marginTop:'.5rem' }}>تأسست عام 1984 في جنين وتعد من أعرق مدارس تعليم القيادة في فلسطين</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginTop:'1.5rem', position:'relative', justifyContent:'center' }}>
                {['✅ مرخصة رسمياً','👩‍🎓 مدربات للسيدات','📋 جميع أنواع الرخص'].map(b => (
                  <span key={b} style={{ background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)', borderRadius:50, padding:'.3rem .9rem', fontSize:'.82rem', fontWeight:600 }}>{b}</span>
                ))}
              </div>
            </div></Reveal>
            <Reveal from="right"><div>
              <span style={{ display:'inline-block', background:'#dbeafe', color:'#1a56db', fontWeight:700, fontSize:'.82rem', padding:'.35rem 1rem', borderRadius:50, marginBottom:'1rem' }}>من نحن</span>
              <h2 style={{ fontSize:'1.8rem', fontWeight:900, color:'#0a2463', marginBottom:'.75rem' }}>خبرة تمتد لأكثر من 30 عاماً</h2>
              <p style={{ color:'#475569' }}>نحن مدرسة الزهراء لتعليم السواقة، نقدم خدمات تعليم القيادة منذ عام 1984. نؤمن بأن تعليم القيادة استثمار في سلامتك وسلامة الآخرين.</p>
              <div style={{ marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[
                  { icon:'🎯', title:'منهج تعليمي متطور', desc:'نتبع أحدث أساليب التعليم العالمية' },
                  { icon:'👩‍🎓', title:'مدربات للسيدات', desc:'كادر نسائي متخصص في بيئة آمنة ومريحة' },
                  { icon:'🛡️', title:'السلامة أولاً', desc:'سياراتنا مجهزة بأحدث أنظمة الأمان ومزدوجة التحكم' },
                  { icon:'📱', title:'دعم على مدار الساعة', desc:'فريق خدمة العملاء متاح في أي وقت' },
                ].map(item => (
                  <div key={item.title} style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
                    <div style={{ width:44, height:44, minWidth:44, background:'#eff6ff', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontWeight:700, color:'#0a2463', fontSize:'.95rem' }}>{item.title}</h4>
                      <p style={{ fontSize:'.85rem', color:'#475569' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div></Reveal>
          </div>
        </div>
      </section>


      {/* ══ EXAM RESULTS ══ */}
      <section style={{ padding:'3rem 1.5rem', background:'#f0f7ff' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:'1.5rem', background:'#fff', borderRadius:20, padding:'2rem 2.5rem', border:'1.5px solid #dbeafe', boxShadow:'0 4px 16px rgba(26,86,219,.08)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', flex:1, minWidth:240 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,#0a2463,#1a56db)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>📊</div>
                <div>
                  <div style={{ fontWeight:900, fontSize:'1.05rem', color:'#0a2463' }}>نتائج الامتحانات</div>
                  <div style={{ fontSize:'.83rem', color:'#64748b', marginTop:'.1rem' }}>استعلم عن نتيجة الامتحان النظري والعملي برقم هويتك</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:'.8rem', flexWrap:'wrap' }}>
                <button onClick={() => setPage('/results')} style={{
                  display:'inline-flex', alignItems:'center', gap:'.5rem',
                  padding:'.75rem 1.8rem', borderRadius:12, fontWeight:800, fontSize:'.92rem',
                  background:'#1a56db', color:'#fff', fontFamily:"'Cairo',sans-serif", cursor:'pointer',
                }}>📊 استعلم عن نتيجتك</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <div style={{ background:'linear-gradient(135deg,#1034a6,#2563eb)', padding:'4rem 1.5rem', textAlign:'center' }}>
        <h2 style={{ fontSize:'2rem', fontWeight:900, color:'#fff', marginBottom:'.8rem' }}>مستعد للانطلاق؟ 🚀</h2>
        <p style={{ color:'rgba(255,255,255,.85)', marginBottom:'2rem' }}>انضم إلى آلاف الطلاب الذين حصلوا على رخصة قيادتهم مع مدرسة الزهراء</p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Btn variant="primary" onClick={() => setPage('/quiz')}>📝 جرّب الاختبار مجاناً</Btn>
          <Btn variant="outline" onClick={() => setPage('/contact')}>💬 تواصل معنا</Btn>
        </div>
      </div>

      {/* ══ CONTACT ══ */}
      <section className="section" style={{ padding:'5rem 1.5rem' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal><SectionHeader badge="تواصل معنا" title="نحن هنا لمساعدتك" /></Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'1.5rem', maxWidth:800, margin:'0 auto' }}>
            {[['📞','الهاتف','0597055200 عز\n0599201030 كامل\n0599788821 حسام'],['📍','الموقع','جنين - دوار البطيخة\nبجانب بازار السعد للسجاد'],['🕐','أوقات العمل','الأحد - الخميس\n7:00 ص - 6:00 م']].map(([icon,title,info], i) => (
              <Reveal key={title} delay={i * 120}><FeatureCard icon={icon} title={title} desc={info} center={true} /></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
