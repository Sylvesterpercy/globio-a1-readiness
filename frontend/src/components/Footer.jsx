import { Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-violet-600 rounded-md flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-700">Globio A1 Readiness Checker</span>
          </div>
          <p className="text-sm text-slate-500 text-center">
            This is a practice-readiness indicator, not an official exam prediction.
          </p>
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Globio</p>
        </div>
      </div>
    </footer>
  )
}
