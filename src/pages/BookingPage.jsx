import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'

const INPUT_STYLE = {
  padding: '.75rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: 10,
  fontSize: '.9rem', color: '#1e293b', background: '#f8fafc', width: '100%',
  fontFamily: "'Cairo',sans-serif", transition: 'all .3s', outline: 'none',
}

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
      <label style={{ fontSize: '.85rem', fontWeight: 700, color: '#1e293b' }}>
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
}

export default function BookingPage() {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [form, setForm] = useState({
    fname: '', lname: '', phone: '', email: '',
    license: '', pkg: '', date: '', time: '', notes: '',
  })

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = e => { e.preventDefault(); setShowSuccess(true) }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const INFO_ITEMS = [
    { icon: '⚡', title: 'تأكيد فوري', desc: 'ستتلقى اتصالاً خلال ساعة' },
    { icon: '🔄', title: 'إلغاء مجاني', desc: 'الإلغاء قبل 24 ساعة بدون رسوم' },
    { icon: '👨‍🏫', title: 'مدرب متخصص', desc: 'سيُختار لك مدرب يناسب مستواك' },
    { icon: '📍', title: 'موقعنا', desc: 'جنين - دوار البطيخة - بجانب بازار السعد للسجاد' },
    { icon: '📞', title: 'للاستفسار', desc: '0597055200 عز / 0599201030 كامل / 0599788821 حسام' },
  ]

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader badge="حجز موعد" title="احجز درسك الأول" subtitle="احجز موعدك الآن وابدأ رحلتك نحو رخصة القيادة" />

          <div className="booking-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start' }}>

            {/* Info panel */}
            <div style={{ background: 'linear-gradient(135deg,#0a2463,#1a56db)', borderRadius: 20, padding: '2.5rem', color: '#fff', position: 'sticky', top: 90 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '.5rem' }}>🚗 ابدأ رحلتك معنا</h3>
              <p style={{ fontSize: '.88rem', opacity: .85, marginBottom: '2rem' }}>احجز موعدك وسنتواصل معك لتأكيد الحجز</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {INFO_ITEMS.map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, minWidth: 40, background: 'rgba(255,255,255,.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{item.title}</div>
                      <div style={{ fontSize: '.82rem', opacity: .8 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ background: '#fff', borderRadius: 20, padding: '2.5rem', boxShadow: '0 4px 16px rgba(0,0,0,.10)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0a2463', marginBottom: '.5rem' }}>📋 بيانات الحجز</h3>
              <p style={{ fontSize: '.88rem', color: '#475569', marginBottom: '2rem' }}>أدخل بياناتك وسنتواصل معك لتأكيد الموعد</p>

              <form onSubmit={submit}>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

                  <Field label="الاسم الأول" required>
                    <input name="fname" required value={form.fname} onChange={handle} placeholder="أدخل اسمك الأول" style={INPUT_STYLE} />
                  </Field>

                  <Field label="الاسم الأخير" required>
                    <input name="lname" required value={form.lname} onChange={handle} placeholder="أدخل اسمك الأخير" style={INPUT_STYLE} />
                  </Field>

                  <Field label="رقم الهاتف" required>
                    <input name="phone" required type="tel" value={form.phone} onChange={handle} placeholder="05X-XXX-XXXX" style={INPUT_STYLE} />
                  </Field>

                  <Field label="البريد الإلكتروني">
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="example@email.com" style={INPUT_STYLE} />
                  </Field>

                  <Field label="نوع الرخصة" required>
                    <select name="license" required value={form.license} onChange={handle} style={INPUT_STYLE}>
                      <option value="" disabled>اختر نوع الرخصة</option>
                      {['رخصة خصوصي', 'رخصة شحن خفيف', 'رخصة عمومي', 'رخصة دراجة نارية'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </Field>

                  <Field label="الباقة المطلوبة">
                    <select name="pkg" value={form.pkg} onChange={handle} style={INPUT_STYLE}>
                      <option value="" disabled>اختر الباقة</option>
                      {['الباقة الأساسية - 350 ₪', 'الباقة الكاملة - 650 ₪', 'باقة الضمان - 950 ₪'].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </Field>

                  <Field label="التاريخ المفضل" required>
                    <input name="date" required type="date" min={minDate} value={form.date} onChange={handle} style={INPUT_STYLE} />
                  </Field>

                  <Field label="الوقت المفضل">
                    <select name="time" value={form.time} onChange={handle} style={INPUT_STYLE}>
                      <option value="" disabled>اختر الوقت</option>
                      {['8:00 - 9:00 صباحاً', '9:00 - 10:00 صباحاً', '10:00 - 11:00 صباحاً', '2:00 - 3:00 مساءً', '3:00 - 4:00 مساءً', '4:00 - 5:00 مساءً'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>

                  <div style={{ gridColumn: '1/-1', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                    <label style={{ fontSize: '.85rem', fontWeight: 700, color: '#1e293b' }}>ملاحظات إضافية</label>
                    <textarea name="notes" rows={3} value={form.notes} onChange={handle}
                      placeholder="أي طلبات أو ملاحظات..." style={{ ...INPUT_STYLE, resize: 'vertical' }} />
                  </div>

                  <div style={{ gridColumn: '1/-1' }}>
                    <button type="submit" style={{
                      width: '100%', padding: '1rem', background: '#1a56db', color: '#fff',
                      borderRadius: 10, fontSize: '1rem', fontWeight: 700, border: 'none',
                      cursor: 'pointer', fontFamily: "'Cairo',sans-serif", transition: 'all .3s',
                    }}>📅 تأكيد الحجز</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div
          onClick={e => { if (e.target === e.currentTarget) { setShowSuccess(false); navigate('/') } }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="modal-enter" style={{ background: '#fff', borderRadius: 20, padding: '3rem', maxWidth: 420, width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0a2463', marginBottom: '.5rem' }}>تم استلام طلبك بنجاح!</h3>
            <p style={{ color: '#475569', fontSize: '.9rem', marginBottom: '2rem' }}>شكراً لاختيارك مدرسة الزهراء. سنتواصل معك خلال ساعة لتأكيد موعدك.</p>
            <button onClick={() => { setShowSuccess(false); navigate('/') }}
              style={{ padding: '.85rem 2rem', background: '#1a56db', color: '#fff', borderRadius: 10, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Cairo',sans-serif", fontSize: '1rem' }}>
              حسناً 👍
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
