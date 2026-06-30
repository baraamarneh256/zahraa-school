import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import MyResultsPage from './pages/MyResultsPage'
import BookingPage from './pages/BookingPage'
import StepsPage from './pages/StepsPage'
import StudyPage from './pages/StudyPage'
import ResultsPage from './pages/ResultsPage'
import ExamResultPage from './pages/ExamResultPage'
import TrainersPage from './pages/TrainersPage'
import TrainerExamsPage from './pages/TrainerExamsPage'
import TrainerResultsPage from './pages/TrainerResultsPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function NoSelect() {
  useEffect(() => {
    const block = e => e.preventDefault()
    document.addEventListener('copy', block)
    document.addEventListener('cut', block)
    document.addEventListener('contextmenu', block)
    return () => {
      document.removeEventListener('copy', block)
      document.removeEventListener('cut', block)
      document.removeEventListener('contextmenu', block)
    }
  }, [])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NoSelect />
      <Navbar />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/quiz"         element={<QuizPage />} />
        <Route path="/quiz/:type"   element={<QuizPage />} />
        <Route path="/my-results"   element={<MyResultsPage />} />
        <Route path="/study"   element={<StudyPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/results/theory"    element={<ExamResultPage examType="theory" />} />
        <Route path="/results/practical" element={<ExamResultPage examType="practical" />} />
        <Route path="/trainers"       element={<TrainersPage />} />
        <Route path="/trainers/results" element={<TrainerResultsPage />} />
        <Route path="/trainers/exams" element={<TrainerExamsPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/faq"     element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/steps"   element={<StepsPage />} />
        <Route path="*"        element={<HomePage />} />
      </Routes>
      <Footer />
      <ScrollTop />
    </>
  )
}
