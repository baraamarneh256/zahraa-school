import SavedResults from '../components/SavedResults'
import { QUIZ_TYPES } from '../data/quizData'

const typeName = (id) => QUIZ_TYPES.find(t => t.id === id)?.name || ''

export default function MyResultsPage() {
  return (
    <SavedResults
      storageKey="quiz_history"
      badge="نتائجي"
      title="نتائج اختباراتي المحفوظة"
      subtitle="راجع محاولاتك السابقة وتفقّد إجاباتك على كل امتحان"
      label={(h) => `${typeName(h.type)} — ${h.examName}`}
      emptyCta={{ text: '📝 ابدأ الاختبار النظري', to: '/quiz' }}
    />
  )
}
