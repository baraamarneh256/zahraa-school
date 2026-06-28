import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer-root" style={{ background: '#0a2463', color: 'rgba(255,255,255,.85)', padding: '3.5rem 1.5rem 1.5rem' }}>
      <div className="footer-grid" style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
        gap: '3rem', marginBottom: '2.5rem',
      }}>
        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem', textDecoration: 'none' }}>
            <div>
              <div style={{ fontWeight: 900, color: '#fff', fontSize: '1rem' }}>مدرسة الزهراء لتعليم السواقة</div>
              <div style={{ fontSize: '.75rem', opacity: .7 }}>تعليم القيادة الاحترافي</div>
            </div>
          </Link>
          <p style={{ fontSize: '.85rem', lineHeight: 1.8, opacity: .75 }}>
            نحن ملتزمون بتقديم أفضل تجربة تعليمية لتعلم القيادة منذ عام 1984. مدربون معتمدون وسيارات حديثة لضمان سلامتك.
          </p>
          <div style={{ marginTop: '1.2rem' }}>
            <a href="https://www.facebook.com/profile.php?id=100063706263827" target="_blank" rel="noopener noreferrer"
              style={{ width: 38, height: 38, background: '#1877f2', borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 style={{ fontSize: '.95rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>روابط سريعة</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {[['/', 'الرئيسية'], ['/study', 'دراسة التؤوريا'], ['/quiz', 'الاختبار النظري'], ['/trainers', 'الشامل للمدربين'], ['/steps', 'خطوات الرخصة'], ['/faq', 'أسئلة متكررة'], ['/contact', 'تواصل معنا']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} style={{ fontSize: '.85rem', opacity: .75, textDecoration: 'none', color: 'inherit' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: '.95rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>خدماتنا</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {['رخصة خصوصي', 'رخصة شحن', 'رخصة عمومي', 'رخصة دراجة نارية'].map(s => (
              <li key={s} style={{ fontSize: '.85rem', opacity: .75 }}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '.95rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>تواصل معنا</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', fontSize: '.85rem', opacity: .8 }}>
              <span style={{ flexShrink: 0, marginTop: 2 }}>📍</span>
              <span>جنين - دوار البطيخة - بجانب بازار السعد للسجاد</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', fontSize: '.85rem', opacity: .8 }}>
              <span style={{ flexShrink: 0, marginTop: 2 }}>📞</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.2rem' }}>
                <a href="tel:0597055200" style={{ color: 'inherit', textDecoration: 'none' }}>0597055200 — عز</a>
                <a href="tel:0599201030" style={{ color: 'inherit', textDecoration: 'none' }}>0599201030 — كامل</a>
                <a href="tel:0599788821" style={{ color: 'inherit', textDecoration: 'none' }}>0599788821 — حسام</a>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', fontSize: '.85rem', opacity: .8 }}>
              <span style={{ flexShrink: 0, marginTop: 2 }}>✉️</span>
              <a href="mailto:k2_badawi@hotmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>k2_badawi@hotmail.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.6rem', fontSize: '.85rem', opacity: .8 }}>
              <span style={{ flexShrink: 0, marginTop: 2 }}>🕐</span>
              <span>الأحد - الخميس: 7ص - 6م</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{
        maxWidth: 1200, margin: '0 auto', paddingTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,.1)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
        gap: '.5rem', fontSize: '.82rem', opacity: .6, textAlign: 'center',
      }}>
        <span style={{ flex: 1, minWidth: 0 }}>© 2025 مدرسة الزهراء لتعليم السواقة. جميع الحقوق محفوظة.</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          برمجه{' '}
          <a href="https://www.linkedin.com/in/bara-amarneh-b73925160/" target="_blank" rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}>Bara Amarneh</a>
        </span>
      </div>
    </footer>
  )
}
