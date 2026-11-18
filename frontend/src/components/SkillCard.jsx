const STATUS_COLORS = {
  Strong: 'bg-emerald-100 text-emerald-700',
  Developing: 'bg-amber-100 text-amber-700',
  'Needs Improvement': 'bg-red-100 text-red-700',
}

const BAR_COLORS = {
  Strong: 'from-emerald-400 to-emerald-500',
  Developing: 'from-amber-400 to-amber-500',
  'Needs Improvement': 'from-red-400 to-red-500',
}

export default function SkillCard({ skill, score, correct, total, status }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900 capitalize">{skill}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[status] || 'bg-slate-100 text-slate-600'}`}>
          {status}
        </span>
      </div>
      <div className="mb-3">
        <span className="text-3xl font-bold text-slate-900">{score}</span>
        <span className="text-slate-500 font-medium">%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full bg-gradient-to-r ${BAR_COLORS[status] || 'from-slate-400 to-slate-500'} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm text-slate-500">{correct} of {total} correct</p>
    </div>
  )
}
