import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'

const CONTACTS = [
  {
    name: 'عز',
    phone: '0597055200',
    wa: 'https://wa.me/972597055200',
    color: '#25d366',
  },
  {
    name: 'كامل',
    phone: '0599201030',
    wa: 'https://wa.me/972599201030',
    color: '#25d366',
  },
  {
    name: 'حسام',
    phone: '0599788821',
    wa: 'https://wa.me/972599788821',
    color: '#25d366',
  },
]

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function ContactPage() {
  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <SectionHeader
              badge="تواصل معنا"
              title="نحن هنا لمساعدتك"
              subtitle="تواصل معنا مباشرة عبر واتساب وسنرد عليك في أقرب وقت ممكن"
            />
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem', maxWidth: 700, margin: '0 auto 3rem' }}>
            {CONTACTS.map((c, i) => (
              <Reveal key={c.name} delay={i * 120}>
                <div style={{
                  background: '#fff', borderRadius: 20, padding: '2.5rem 2rem',
                  border: '2px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,.07)',
                  textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
                }}>
                  <div style={{
                    width: 70, height: 70, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#25d366,#128c7e)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    boxShadow: '0 6px 20px rgba(37,211,102,.35)',
                  }}>
                    <WhatsAppIcon size={34} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#0a2463', marginBottom: '.2rem' }}>{c.name}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#475569', direction: 'ltr' }}>{c.phone}</div>
                  </div>
                  <a href={c.wa} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.6rem',
                    padding: '.85rem 2rem', borderRadius: 14, fontWeight: 800, fontSize: '1rem',
                    background: '#25d366', color: '#fff', textDecoration: 'none', width: '100%',
                    justifyContent: 'center', boxShadow: '0 4px 14px rgba(37,211,102,.4)',
                    transition: 'transform .2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <WhatsAppIcon size={18} /> راسل عبر واتساب
                  </a>
                  <a href={`tel:${c.phone}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                    padding: '.7rem 2rem', borderRadius: 14, fontWeight: 700, fontSize: '.95rem',
                    background: '#eff6ff', color: '#1a56db', textDecoration: 'none', width: '100%',
                    justifyContent: 'center', border: '2px solid #dbeafe',
                  }}>
                    📞 اتصل مباشرة
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Info */}
          <Reveal>
            <div style={{
              maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 20,
              padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,.05)',
            }}>
              <h3 style={{ fontWeight: 800, color: '#0a2463', marginBottom: '1.2rem', textAlign: 'center', fontSize: '1.1rem' }}>معلومات إضافية</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.9rem' }}>
                {[
                  ['📍', 'جنين - دوار البطيخة - بجانب بازار السعد للسجاد'],
                  ['✉️', 'k2_badawi@hotmail.com'],
                  ['🕐', 'الأحد - الخميس: 7:00 ص - 6:00 م'],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '.8rem', fontSize: '.92rem', color: '#475569' }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
