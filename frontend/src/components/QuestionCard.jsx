import OptionButton from './OptionButton.jsx'

export default function QuestionCard({ question, selectedAnswer, onSelect }) {
  if (!question) return null
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
      {question.passage && (
        <blockquote className="mb-6 p-4 bg-slate-50 border-l-4 border-blue-400 rounded-r-xl text-slate-700 text-sm leading-relaxed italic">
          {question.passage}
        </blockquote>
      )}
      <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6">
        {question.question_text}
      </h2>
      <div className="flex flex-col gap-3">
        {Object.entries(question.options).map(([label, text]) => (
          <OptionButton
            key={label}
            label={label}
            text={text}
            selected={selectedAnswer === label}
            onClick={() => onSelect(label)}
          />
        ))}
      </div>
    </div>
  )
}
