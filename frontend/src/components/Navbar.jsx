import { Link, useNavigate } from 'react-router-dom'
import { Globe } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-lg">Globio</span>
              <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">GERMAN A1 • READINESS CHECK</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <a href="/#how-it-works" className="hidden sm:block text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors">
              About
            </a>
            <button
              onClick={() => navigate('/assessment')}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 py-2 text-sm font-semibold transition-colors"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
