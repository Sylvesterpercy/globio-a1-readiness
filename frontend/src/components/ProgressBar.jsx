export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">Question {current} of {total}</span>
        <span className="text-sm font-medium text-blue-600">{pct}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
