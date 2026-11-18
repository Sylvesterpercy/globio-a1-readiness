export default function OptionButton({ label, text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-150 ${
        selected
          ? 'border-blue-500 bg-blue-50 text-blue-900'
          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-700'
      }`}
    >
      <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
        selected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
      }`}>
        {label}
      </span>
      <span className="font-medium pt-0.5">{text}</span>
    </button>
  )
}
