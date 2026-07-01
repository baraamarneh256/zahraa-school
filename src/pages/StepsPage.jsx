import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import Btn from '../components/ui/Btn'
import { QUIZ_TYPES } from '../data/quizData'

const qIcon = (id) => QUIZ_TYPES.find(t => t.id === id)?.icon

const LICENSE_TYPES = [
  { id: 'private',    icon: '🚗', name: 'خصوصي',          grade: 'B',  desc: 'سيارات خاصة' },
  { id: 'truck',      icon: '🚐', name: 'شحن خفيف',       grade: 'C1', desc: 'مركبات الشحن الخفيف' },
  { id: 'haulage',    icon: '🚚', name: 'شحن ثقيل',       grade: 'C',  desc: 'شاحنات الشحن الثقيل' },
  { id: 'trella',     icon: '🚛', name: 'تريلا',           grade: 'E',  desc: 'المقطورات والتريلات' },
  { id: 'taxi',       icon: '🚕', name: 'تكسي',            grade: 'D1', desc: 'سيارات الأجرة' },
  { id: 'bus',        icon: '🚌', name: 'باص',             grade: 'D',  desc: 'الحافلات الكبيرة' },
  { id: 'motorcycle', icon: '🏍️', name: 'دراجة نارية',    grade: 'A',  desc: 'الدراجات النارية' },
  { id: 'tractor',    icon: '🚜', name: 'تركتور',          desc: 'الجرارات الزراعية' },
  { id: 'forklift',   icon: qIcon('forklift'),   name: 'رافعة شوكية',   desc: 'تشغيل الرافعة الشوكية' },
  { id: 'telescopic', icon: qIcon('telescopic'), name: 'رافعة تلسكوبية', desc: 'تشغيل الرافعة التلسكوبية' },
]

const PHOTOS = '٤ صور شخصية بخلفية بيضاء'

const STEPS = {
  private: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة عن الهوية الشخصية. يجب أن لا يقل العمر عن 17 سنة، ويمكن استلام الرخصة بعد عمر 17.5 سنة.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء للسياقة مع الوثائق المطلوبة لتجهيز معاملة الالتحاق.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة المُجهَّزة من المدرسة لإجراء الفحص الطبي اللازم.' },
    { icon: '📚', title: 'دورة التؤوريا', desc: 'تتواصل المدرسة مع الطالب لتحديد موعد دورة التؤوريا، وتتكون عادةً من 7 محاضرات تغطي مواضيع السير المختلفة.' },
    { icon: '📝', title: 'امتحان التؤوريا', desc: 'بعد الدراسة والتدرب، يُجرى الامتحان الرسمي في دائرة المرور عبر المدرسة. الحد الأقصى للأخطاء المسموح بها هو 5 أخطاء.' },
    { icon: '🚗', title: 'دروس السياقة العملية', desc: 'بعد اجتياز التؤوريا، يبدأ الطالب دروس السياقة الفعلية مع مدرب معتمد لاكتساب المهارات المطلوبة.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'عند إتقان المهارات، يحدد المدرب موعد التست أمام فاحص من سلطة الترخيص. عند النجاح تُصدر رخصة القيادة.' },
  ],
  truck: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة عن الهوية. يجب أن لا يقل العمر عن 17.5 سنة، ويمكن استلام الرخصة بعد عمر 18 سنة.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء للسياقة بالوثائق اللازمة لتحضير الملف الإداري.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة المُجهَّزة لإجراء الفحص الطبي اللازم.' },
    { icon: '📚', title: 'دورة التؤوريا', desc: 'دورة التؤوريا وتتكون عادةً من 7 محاضرات تتناول مواضيع التؤوريا المختلفة.' },
    { icon: '📝', title: 'امتحان التؤوريا', desc: 'اجتياز الامتحان الرسمي في دائرة المرور. الحد الأقصى للأخطاء المسموح بها هو 5 أخطاء.' },
    { icon: '🚐', title: 'دروس السياقة العملية', desc: 'اكتساب المهارات العملية من خلال دروس فردية مع مدرب معتمد حسب تقدم الطالب.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'يختبر فاحص السائقين في سلطة الترخيص مهارات الطالب، وعند النجاح يمكنه الحصول على الرخصة.' },
  ],
  haulage: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة هوية، نسخة رخصة سارية المفعول. يشترط عمر 19+ سنة، ومضي سنة على رخصة الشحن الخفيف، وشهادة مدرسية موثقة تثبت اجتياز الصف الخامس.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه لمدرسة الزهراء مع الوثائق اللازمة لإعداد المعاملة الرسمية.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة لإجراء الفحص الطبي المطلوب.' },
    { icon: '🏢', title: 'التسجيل للدورة', desc: 'التوجه لدائرة السير بالمعاملة والفحص الطبي للتسجيل في دورة الشحن الثقيل.' },
    { icon: '📚', title: 'حضور الدورة', desc: 'الالتحاق بالدورة التدريبية بعد اجتياز امتحان القبول.' },
    { icon: '📝', title: 'امتحان التؤوريا', desc: 'اجتياز الامتحان النظري الرسمي بحد أقصى 5 أخطاء.' },
    { icon: '🚚', title: 'دروس السياقة العملية', desc: 'اكتساب المهارات اللازمة من خلال الدروس العملية مع مدرب معتمد.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز اختبار المهارات العملية أمام الفاحص للحصول على رخصة الشحن الثقيل.' },
  ],
  trella: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، شهادة دورة شحن ثقيل، نسخة هوية، رخصة سارية مع مضي سنة على رخصة الشحن الثقيل، شهادة صف خامس موثقة. العمر 20+ سنة.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء بجميع الوثائق لإعداد ملف الالتحاق.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'إجراء الفحص الطبي اللازم في دائرة الصحة باستخدام المعاملة المُعدَّة.' },
    { icon: '📝', title: 'امتحان التؤوريا', desc: 'قد يُعفى من امتحان التؤوريا إذا لم يمضِ على امتحان تؤوريا رخصة الشحن الثقيل أكثر من 4 سنوات.' },
    { icon: '🚛', title: 'دروس السياقة العملية', desc: 'تلقي دروس السياقة العملية لاكتساب مهارات قيادة التريلا والمقطورات.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز اختبار عملي أمام فاحص متخصص للحصول على رخصة التريلا.' },
  ],
  taxi: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة هوية، رخصة سارية المفعول، شهادة مدرسية (صف ثاني إعدادي على الأقل) موثقة من التربية والتعليم، شهادة حسن سلوك من وزارة الداخلية.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء وتقديم جميع الوثائق لتحضير ملف المتقدم.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'إجراء الكشف الطبي اللازم في دائرة الصحة بعد تقديم المعاملة المحضرة.' },
    { icon: '🏢', title: 'التسجيل لدورة عمومي', desc: 'التوجه إلى دائرة السير لتسجيل المتقدم في دورة العمومي المطلوبة.' },
    { icon: '✅', title: 'امتحان القبول', desc: 'اجتياز امتحان قبول مجاني يحتوي على أسئلة بسيطة. يُبلَّغ الطالب بموعده فور التسجيل.' },
    { icon: '📚', title: 'حضور دورة العمومي', desc: 'حضور الدورة التدريبية المخصصة في كليات التعليم الاستكمالي.' },
    { icon: '📝', title: 'الامتحان الشامل', desc: 'امتحان من 30 سؤالاً يشمل قانون السير، السياقة الصحيحة، ومعرفة المركبة. الحد الأقصى للأخطاء هو 8 أخطاء.' },
    { icon: '🎓', title: 'صدور شهادة الدورة', desc: 'الحصول على شهادة إتمام دورة العمومي، وهي صالحة مدى الحياة.' },
    { icon: '📋', title: 'امتحان التؤوريا', desc: 'اجتياز امتحان التؤوريا الرسمي بحد أقصى 5 أخطاء.' },
    { icon: '🚕', title: 'دروس السياقة العملية', desc: 'أخذ الدروس العملية اللازمة لاكتساب مهارات قيادة سيارة الأجرة.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'إجراء الاختبار العملي أمام فاحص السائقين للحصول على رخصة التكسي النهائية.' },
  ],
  bus: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة هوية، رخصة شحن سارية مع مضي سنتين عليها، شهادة مدرسية (صف ثاني إعدادي على الأقل) موثقة من التربية، شهادة حسن سلوك من وزارة الداخلية.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء بالوثائق المطلوبة لإعداد الملف الإداري.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'زيارة دائرة الصحة مع المعاملة المُعدَّة لإجراء الكشف الطبي اللازم.' },
    { icon: '🏢', title: 'التسجيل لدورة عمومي', desc: 'التوجه لدائرة السير مع الملف والفحص الطبي للتسجيل في دورة العمومي.' },
    { icon: '✅', title: 'امتحان القبول', desc: 'اجتياز اختبار قبول مجاني يختبر القدرة على القراءة.' },
    { icon: '📚', title: 'حضور دورة العمومي', desc: 'حضور الدورة المخصصة في كلية التعليم الاستكمالي.' },
    { icon: '📝', title: 'الامتحان الشامل', desc: 'اجتياز امتحان من 30 سؤالاً بحد أقصى 8 أخطاء يشمل قانون السير والسياقة الصحيحة.' },
    { icon: '🎓', title: 'شهادة الدورة', desc: 'الحصول على شهادة إتمام دورة العمومي، صالحة مدى الحياة.' },
    { icon: '📋', title: 'امتحان التؤوريا', desc: 'اجتياز امتحان التؤوريا الرسمي بحد أقصى 5 أخطاء.' },
    { icon: '🚌', title: 'دروس السياقة العملية', desc: 'تلقي الدروس العملية اللازمة لاكتساب مهارات قيادة الحافلة.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز الاختبار العملي أمام فاحص السائقين للحصول على رخصة الباص النهائية.' },
  ],
  motorcycle: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة عن الهوية الشخصية.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء للسياقة بالوثائق المطلوبة لتجهيز معاملة الالتحاق.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة لإجراء الفحص الطبي اللازم.' },
    { icon: '📚', title: 'دورة التؤوريا', desc: 'حضور دورة التؤوريا التي تغطي قوانين السير ومواضيع السلامة المرورية.' },
    { icon: '📝', title: 'امتحان التؤوريا', desc: 'اجتياز الامتحان النظري الرسمي بحد أقصى 5 أخطاء.' },
    { icon: '🏍️', title: 'دروس السياقة العملية', desc: 'تلقي الدروس العملية على الدراجة النارية مع مدرب معتمد لاكتساب مهارات القيادة والاتزان.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز الاختبار العملي أمام فاحص السائقين للحصول على رخصة الدراجة النارية.' },
  ],
  tractor: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة عن الهوية الشخصية.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء للسياقة بالوثائق المطلوبة لتجهيز معاملة الالتحاق.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة لإجراء الفحص الطبي اللازم.' },
    { icon: '📚', title: 'دورة التؤوريا', desc: 'حضور دورة التؤوريا التي تغطي قوانين السير ومواضيع السلامة المرورية.' },
    { icon: '📝', title: 'امتحان التؤوريا', desc: 'اجتياز الامتحان النظري الرسمي بحد أقصى 5 أخطاء.' },
    { icon: '🚜', title: 'دروس السياقة العملية', desc: 'تلقي الدروس العملية على الجرار الزراعي مع مدرب معتمد لاكتساب المهارات المطلوبة.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز الاختبار العملي أمام الفاحص للحصول على رخصة التركتور.' },
  ],
  forklift: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة عن الهوية الشخصية.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء للسياقة بالوثائق المطلوبة لتجهيز معاملة الالتحاق.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة لإجراء الفحص الطبي اللازم.' },
    { icon: '📚', title: 'الدورة التدريبية', desc: 'حضور الدورة التدريبية الخاصة بتشغيل الرافعة الشوكية وقواعد السلامة أثناء المناولة.' },
    { icon: '📝', title: 'الامتحان النظري', desc: 'اجتياز الامتحان النظري الخاص بتشغيل الرافعة الشوكية.' },
    { icon: '🛠️', title: 'التدريب العملي', desc: 'تدريب عملي على تشغيل الرافعة الشوكية والمناولة الآمنة مع مدرب معتمد.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز الاختبار العملي أمام الفاحص للحصول على رخصة تشغيل الرافعة الشوكية.' },
  ],
  telescopic: [
    { icon: '📄', title: 'تجهيز الوثائق', desc: `${PHOTOS}، نسخة عن الهوية الشخصية.` },
    { icon: '🏫', title: 'تجهيز المعاملة', desc: 'التوجه إلى مدرسة الزهراء للسياقة بالوثائق المطلوبة لتجهيز معاملة الالتحاق.' },
    { icon: '🏥', title: 'الفحص الطبي', desc: 'التوجه إلى دائرة الصحة واصطحاب المعاملة لإجراء الفحص الطبي اللازم.' },
    { icon: '📚', title: 'الدورة التدريبية', desc: 'حضور الدورة التدريبية الخاصة بتشغيل الرافعة التلسكوبية وقواعد السلامة أثناء الرفع.' },
    { icon: '📝', title: 'الامتحان النظري', desc: 'اجتياز الامتحان النظري الخاص بتشغيل الرافعة التلسكوبية.' },
    { icon: '🛠️', title: 'التدريب العملي', desc: 'تدريب عملي على تشغيل الرافعة التلسكوبية والرفع الآمن مع مدرب معتمد.' },
    { icon: '🏆', title: 'الامتحان العملي (التست)', desc: 'اجتياز الاختبار العملي أمام الفاحص للحصول على رخصة تشغيل الرافعة التلسكوبية.' },
  ],
}

/** يعرض الأيقونة سواء كانت إيموجي نصياً أو SVG مرسوماً. */
function Icon({ icon }) {
  if (typeof icon === 'string' && icon.trim().startsWith('<svg')) {
    return <span style={{ display: 'inline-flex', verticalAlign: 'middle' }} dangerouslySetInnerHTML={{ __html: icon }} />
  }
  return <>{icon}</>
}

function useIsMobile(bp = 640) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(`(max-width:${bp}px)`).matches)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`)
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [bp])
  return mobile
}

function TypeCard({ lt, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? 'linear-gradient(135deg,#0a2463,#1a56db)' : '#fff',
        border: `2px solid ${isActive ? '#1a56db' : '#e2e8f0'}`,
        borderRadius: 16, padding: '1.4rem 1.2rem',
        cursor: 'pointer', transition: 'all .25s', textAlign: 'center',
        boxShadow: isActive ? '0 8px 24px rgba(26,86,219,.3)' : '0 2px 8px rgba(0,0,0,.06)',
        transform: isActive ? 'translateY(-3px)' : 'none', height: '100%',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}><Icon icon={lt.icon} /></div>
      <div style={{ fontWeight: 800, fontSize: '1rem', color: isActive ? '#fff' : '#0a2463' }}>{lt.name}</div>
      {lt.grade && (
        <div style={{
          display: 'inline-block', marginTop: '.4rem',
          background: isActive ? 'rgba(255,255,255,.2)' : '#eff6ff',
          color: isActive ? '#fff' : '#1a56db',
          borderRadius: 20, padding: '.2rem .7rem', fontSize: '.75rem', fontWeight: 700,
        }}>درجة {lt.grade}</div>
      )}
      <div style={{ fontSize: '.8rem', marginTop: '.4rem', color: isActive ? 'rgba(255,255,255,.8)' : '#64748b' }}>{lt.desc}</div>
    </div>
  )
}

function StepsBlock({ selected, steps, navigate }) {
  return (
    <div key={selected.id} className="page-enter">
      <div style={{
        display: 'flex', alignItems: 'center', gap: '.8rem',
        marginBottom: '2rem', padding: '1rem 1.4rem',
        background: 'linear-gradient(135deg,#0a2463,#1a56db)', borderRadius: 14, color: '#fff',
      }}>
        <span style={{ fontSize: '1.8rem' }}><Icon icon={selected.icon} /></span>
        <div>
          <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>خطوات رخصة {selected.name}</div>
          <div style={{ fontSize: '.82rem', opacity: .8 }}>{steps.length} خطوات للحصول على الرخصة</div>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 27, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#1a56db,#3b82f6)', borderRadius: 2 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
              <div style={{
                width: 56, height: 56, minWidth: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg,#0a2463,#1a56db)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 900, fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(26,86,219,.35)', position: 'relative', zIndex: 1, flexShrink: 0,
              }}>{i + 1}</div>
              <div style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '1.2rem 1.4rem', boxShadow: '0 2px 10px rgba(0,0,0,.06)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{step.icon}</span>
                  <h3 style={{ fontWeight: 800, fontSize: '.95rem', color: '#0a2463' }}>{step.title}</h3>
                </div>
                <p style={{ fontSize: '.85rem', color: '#475569', lineHeight: 1.8 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '2rem', background: '#fff', borderRadius: 16, border: '1.5px solid #e2e8f0', padding: '1.4rem 1.6rem', boxShadow: '0 2px 10px rgba(0,0,0,.05)' }}>
        <div style={{ fontWeight: 800, fontSize: '.95rem', color: '#0a2463', marginBottom: '1rem' }}>🏛️ نتائج الامتحانات الرسمية</div>
        <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/results/theory')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '.4rem', border: 'none', cursor: 'pointer',
            padding: '.65rem 1.3rem', borderRadius: 10, fontWeight: 700, fontSize: '.88rem',
            background: '#1a56db', color: '#fff', fontFamily: "'Cairo',sans-serif",
          }}>📝 نتيجة امتحان التؤوريا</button>
          <button onClick={() => navigate('/results/practical')} style={{
            display: 'inline-flex', alignItems: 'center', gap: '.4rem', border: 'none', cursor: 'pointer',
            padding: '.65rem 1.3rem', borderRadius: 10, fontWeight: 700, fontSize: '.88rem',
            background: '#0f7a4a', color: '#fff', fontFamily: "'Cairo',sans-serif",
          }}>🚗 نتيجة امتحان التست</button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Btn variant="primary" onClick={() => navigate('/contact')}>💬 تواصل معنا</Btn>
      </div>
    </div>
  )
}

export default function StepsPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState(null)

  const toggle = (lt) => setSelected(prev => (prev?.id === lt.id ? null : lt))
  const stepsFor = (lt) => STEPS[lt.id] || []

  return (
    <div className="page-enter" style={{ paddingTop: 70, minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <Reveal>
            <SectionHeader
              badge="خطوات الحصول على الرخصة"
              title="كيف تحصل على رخصة القيادة؟"
              subtitle="اختر نوع الرخصة لعرض الخطوات التفصيلية"
            />
          </Reveal>

          {isMobile ? (
            /* الجوال: الخطوات تظهر تحت نوع الرخصة المختار مباشرة */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {LICENSE_TYPES.map(lt => {
                const isActive = selected?.id === lt.id
                return (
                  <div key={lt.id}>
                    <TypeCard lt={lt} isActive={isActive} onClick={() => toggle(lt)} />
                    {isActive && (
                      <div style={{ marginTop: '1.2rem', marginBottom: '.5rem' }}>
                        <StepsBlock selected={selected} steps={stepsFor(lt)} navigate={navigate} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            /* سطح المكتب: شبكة الأنواع ثم الخطوات أسفلها */
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                {LICENSE_TYPES.map((lt, i) => (
                  <Reveal key={lt.id} delay={i * 60}>
                    <TypeCard lt={lt} isActive={selected?.id === lt.id} onClick={() => toggle(lt)} />
                  </Reveal>
                ))}
              </div>
              {selected && <StepsBlock selected={selected} steps={stepsFor(selected)} navigate={navigate} />}
            </>
          )}

        </div>
      </section>
    </div>
  )
}
