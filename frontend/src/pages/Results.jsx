import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, XCircle, RotateCcw, Home, Info } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SkillCard from '../components/SkillCard.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'

const STATUS_CONFIG = {
  'Ready for Further Exam Preparation': { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'Almost Ready': { color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  'Needs More Practice': { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
}

const SCORE_MESSAGES = {
  high: 'Excellent work! Your preparation level is strong. Keep maintaining your skills and you should feel confident heading into your exam preparation.',
  mid: 'Good progress! You have a solid foundation but there are specific areas where more practice will make a real difference before your exam.',
  low: 'You have made a start, but there are several areas that need more attention. Focus on the recommendations below and you will improve quickly.',
}

function getScoreMessage(score) {
  if (score >= 80) return SCORE_MESSAGES.high
  if (score >= 60) return SCORE_MESSAGES.mid
  return SCORE_MESSAGES.low
}

function CircleScore({ score }) {
  const radius = 54
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={radius} fill="none"
        stroke="url(#grad)" strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
        style={{transition: 'stroke-dasharray 1s ease'}}
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <text x="70" y="65" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0f172a">{score}</text>
      <text x="70" y="83" textAnchor="middle" fontSize="13" fill="#64748b">out of 100</text>
    </svg>
  )
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()

  // Persist results across browser refreshes using sessionStorage as fallback
  const routeResults = location.state?.results
  if (routeResults) {
    sessionStorage.setItem('globio_results', JSON.stringify(routeResults))
  }
  const resolvedResults = routeResults ?? JSON.parse(sessionStorage.getItem('globio_results'))

  if (!resolvedResults) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-md w-full text-center">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">No results found</h2>
            <p className="text-slate-500 mb-6">Please complete the assessment to view your results.</p>
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors inline-block">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const { overall_score, readiness_status, total_questions, correct_answers, incorrect_answers, skills, recommendations } = resolvedResults
  const statusConfig = STATUS_CONFIG[readiness_status] || STATUS_CONFIG['Needs More Practice']

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">

        {/* Overall Score */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Readiness Results</h1>
          <div className="flex justify-center mb-4">
            <CircleScore score={overall_score} />
          </div>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-4 ${statusConfig.color} ${statusConfig.bg} ${statusConfig.border}`}>
            {readiness_status}
          </div>
          <p className="text-slate-500 text-sm mb-2">{correct_answers} out of {total_questions} correct</p>
          <p className="text-slate-600 max-w-xl mx-auto">{getScoreMessage(overall_score)}</p>
        </div>

        {/* Skill Performance */}
        <h2 className="text-xl font-bold text-slate-900 mb-4">Skill Performance</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {Object.entries(skills).map(([skill, data]) => (
            <SkillCard
              key={skill}
              skill={skill}
              score={data.score}
              correct={data.correct}
              total={data.total}
              status={data.status}
            />
          ))}
        </div>

        {/* Recommendations */}
        <h2 className="text-xl font-bold text-slate-900 mb-2">Recommendations</h2>
        <p className="text-slate-500 text-sm mb-4">Based on your answers, here is what to practise next.</p>
        <div className="flex flex-col gap-4 mb-6">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} {...rec} />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Assessment Summary</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-slate-900">{total_questions}</p>
              <p className="text-sm text-slate-500">Total Questions</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <p className="text-3xl font-bold text-emerald-600">{correct_answers}</p>
              </div>
              <p className="text-sm text-slate-500">Correct</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <XCircle className="w-5 h-5 text-red-400" />
                <p className="text-3xl font-bold text-red-500">{incorrect_answers}</p>
              </div>
              <p className="text-sm text-slate-500">Incorrect</p>
            </div>
          </div>
        </div>

        {/* Note on scope */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
          <div className="flex gap-3 mb-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Note on scope</h3>
              <p className="text-blue-700 text-sm">This assessment covers vocabulary, grammar, and reading. Listening and speaking skills are equally important for the A1 exam and are not tested here.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              sessionStorage.removeItem('globio_results')
              navigate('/assessment', { replace: true })
            }}
            className="flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" /> Retake Assessment
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
          >
            <Home className="w-5 h-5" /> Back to Home
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
