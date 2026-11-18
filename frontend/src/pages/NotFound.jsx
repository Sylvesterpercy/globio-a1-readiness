import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-8xl font-bold text-slate-200 mb-4">404</p>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Page not found</h1>
          <p className="text-slate-500 mb-8">The page you are looking for does not exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
