import { useNavigate } from 'react-router-dom'
import { BookOpen, PenTool, FileText, ChevronRight, Clock, Shield, Zap, Info } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide">
              GERMAN A1 • READINESS CHECK
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Are you ready for your German A1 exam?
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Find out where you stand before booking your Goethe or ÖSD exam. Take a quick assessment and get a clear picture of your preparation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/assessment')}
                className="bg-white text-blue-700 hover:bg-blue-50 rounded-xl px-8 py-4 font-bold text-lg transition-colors shadow-lg"
              >
                Start Free Assessment
              </button>
              <a
                href="#how-it-works"
                className="border-2 border-white/40 hover:border-white text-white rounded-xl px-8 py-4 font-semibold text-lg transition-colors"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skill cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">What we assess</h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Check your vocabulary, grammar and reading skills. Discover your strengths and understand what to practise next.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: 'Vocabulary', desc: 'Test common German A1 words and everyday expressions.', color: 'text-blue-600 bg-blue-50' },
            { icon: PenTool, title: 'Grammar', desc: 'Check your understanding of basic German sentence structures.', color: 'text-violet-600 bg-violet-50' },
            { icon: FileText, title: 'Reading', desc: 'Test your ability to understand simple German texts and messages.', color: 'text-emerald-600 bg-emerald-50' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-2">{title}</h3>
              <p className="text-slate-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-10">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Answer 12 questions', desc: 'Four questions each on vocabulary, grammar and reading.' },
              { n: '2', title: 'Discover your performance', desc: 'See your skill-by-skill breakdown and overall readiness score.' },
              { n: '3', title: 'Get recommendations', desc: 'Receive specific, actionable tips on what to practise next.' },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-white font-bold text-2xl flex items-center justify-center mb-4 shadow-md">
                  {n}
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">What to expect</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, text: 'Takes approximately 5–7 minutes.' },
              { icon: Zap, text: 'No registration required.' },
              { icon: Shield, text: 'Free assessment — no payment needed.' },
              { icon: Info, text: 'This is a practice-readiness indicator, not an official exam prediction.' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/assessment')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-bold text-lg transition-colors inline-flex items-center gap-2"
          >
            Check Your Readiness <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
