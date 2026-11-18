import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Loader2, ChevronLeft, ChevronRight, Send } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import QuestionCard from '../components/QuestionCard.jsx'
import { fetchQuestions, submitAssessment } from '../services/api.js'

const SKILL_COLORS = {
  vocabulary: 'bg-blue-100 text-blue-700',
  grammar: 'bg-violet-100 text-violet-700',
  reading: 'bg-emerald-100 text-emerald-700',
}

export default function Assessment() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { questionId: 'A'|'B'|'C'|'D' }
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const loadQuestions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchQuestions()
      setQuestions(data)
    } catch (err) {
      setError(err.message || 'Failed to load questions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadQuestions()
  }, [])

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : null
  const isFirstQuestion = currentIndex === 0
  const isLastQuestion = currentIndex === questions.length - 1
  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id])

  const handleSelect = (option) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }))
  }

  const handleNext = () => {
    if (!isLastQuestion) setCurrentIndex(i => i + 1)
  }

  const handlePrev = () => {
    if (!isFirstQuestion) setCurrentIndex(i => i - 1)
  }

  const handleSubmitClick = () => {
    setShowConfirm(true)
  }

  const handleConfirmSubmit = async () => {
    setShowConfirm(false)
    setIsSubmitting(true)
    try {
      const results = await submitAssessment(answers)
      navigate('/results', { state: { results } })
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-slate-600 font-medium">Loading assessment...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-md w-full text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Could not load assessment</h2>
            <p className="text-slate-500 mb-6">{error}</p>
            <button
              onClick={loadQuestions}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Submit Assessment?</h3>
            <p className="text-slate-500 mb-6">You have answered all 12 questions. Ready to submit?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-2 border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold hover:bg-slate-50 transition-colors"
              >
                Review Answers
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-6">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        {currentQuestion && (
          <div className="mb-4">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize ${SKILL_COLORS[currentQuestion.skill] || 'bg-slate-100 text-slate-600'}`}>
              {currentQuestion.skill}
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
        />

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={isFirstQuestion}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmitClick}
              disabled={!selectedAnswer || isSubmitting}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="w-5 h-5" /> Submit Assessment</>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Question <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Answer dots */}
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex ? 'bg-blue-600 scale-125' :
                answers[q.id] ? 'bg-blue-300' : 'bg-slate-300'
              }`}
              title={`Question ${i + 1}`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
