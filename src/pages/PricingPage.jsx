import SectionHeader from '../components/ui/SectionHeader'
import PricingCard from '../components/ui/PricingCard'

const PLANS = [
  {
    icon: '🌱', name: 'الباقة الأساسية', desc: 'مثالية للمبتدئين', price: 350, popular: false,
    features: ['10 دروس عملية (45 دقيقة)', 'اختبار التيوريا النظري', 'مواد دراسة مجانية', 'تقرير تقدم أسبوعي'],
    missing: ['اختبار الطريق', 'ضمان النجاح'],
  },
  {
    icon: '🚀', name: 'الباقة الكاملة', desc: 'الخيار المثالي للأغلبية', price: 650, popular: true,
    features: ['20 درساً عملياً (45 دقيقة)', 'اختبار التيوريا النظري', 'اختبار الطريق مع المدرب', 'مواد دراسة شاملة', 'دعم هاتفي 24/7'],
    missing: ['ضمان النجاح'],
  },
  {
    icon: '🏆', name: 'باقة الضمان', desc: 'للوصول إلى النجاح المضمون', price: 950, popular: false,
    features: ['دروس عملية غير محدودة', 'اختبار التيوريا النظري', 'اختبار الطريق مع المدرب', 'ضمان النجاح أو استعادة المال', 'دعم VIP على مدار الساعة', 'تقرير أداء تفصيلي'],
    missing: [],
  },
]

const LICENSE_TYPES = [
  { icon: '🚗', name: 'رخصة خصوصي',   sub: 'سيارات خاصة' },
  { icon: '🚛', name: 'رخصة شحن',     sub: 'مركبات الشحن الخفيف' },
  { icon: '🚕', name: 'رخصة عمومي',   sub: 'سيارات الأجرة' },
  { icon: '🏍️', name: 'رخصة دراجة', sub: 'الدراجات النارية' },
]

export default function PricingPage({ setPage }) {
  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section className="section" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeader
            badge="الأسعار والباقات"
            title="باقات تناسب احتياجاتك"
            subtitle="اختر الباقة المناسبة لك واحصل على رخصة قيادتك بأفضل الأسعار"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
            {PLANS.map(plan => (
              <PricingCard key={plan.name} plan={plan} onBook={() => setPage('booking')} />
            ))}
          </div>

          {/* License types */}
          <div style={{ marginTop: '3rem', background: '#fff', borderRadius: 20, padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,.08)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0a2463', marginBottom: '1.5rem', textAlign: 'center' }}>🎓 أنواع الرخص المتاحة</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1rem' }}>
              {LICENSE_TYPES.map(lt => (
                <div key={lt.name} style={{ textAlign: 'center', padding: '1.5rem', background: '#eff6ff', borderRadius: 12 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{lt.icon}</div>
                  <div style={{ fontWeight: 700, color: '#0a2463' }}>{lt.name}</div>
                  <div style={{ fontSize: '.82rem', color: '#475569', marginTop: '.3rem' }}>{lt.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', background: '#eff6ff', borderRadius: 12, fontSize: '.88rem', color: '#1034a6', fontWeight: 600, textAlign: 'center' }}>
              💳 التقسيط متاح · 📞 للاستفسار اتصل: 0599-123-456
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
