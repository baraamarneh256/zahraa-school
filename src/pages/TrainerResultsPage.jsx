import SavedResults from '../components/SavedResults'

export default function TrainerResultsPage() {
  return (
    <SavedResults
      storageKey="trainer_quiz_history"
      badge="الشامل للمدربين"
      title="نتائج امتحانات الشامل المحفوظة"
      subtitle="راجع محاولاتك السابقة في امتحانات الشامل للمدربين وتفقّد إجاباتك"
      label={(h) => `الشامل للمدربين — ${h.examName}`}
      emptyCta={{ text: '📝 ابدأ امتحانات الشامل', to: '/trainers/exams' }}
    />
  )
}
