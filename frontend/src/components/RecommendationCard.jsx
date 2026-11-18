import { Lightbulb } from 'lucide-react'

export default function RecommendationCard({ topic, reason, action }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
        <Lightbulb className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h4 className="font-semibold text-slate-900 mb-1">{topic}</h4>
        <p className="text-sm text-slate-500 mb-2">{reason}</p>
        <p className="text-sm font-medium text-slate-700">{action}</p>
      </div>
    </div>
  )
}
