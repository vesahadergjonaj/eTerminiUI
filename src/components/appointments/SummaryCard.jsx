export default function SummaryCard({ label, value, Icon, tone = 'slate' }) {
  const tones = {
    blue:    { card: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white',   num: 'text-white',        sub: 'text-blue-100',  icon: 'text-blue-200' },
    emerald: { card: 'bg-white border border-slate-200',                            num: 'text-emerald-600',  sub: 'text-slate-400', icon: 'text-emerald-500' },
    slate:   { card: 'bg-white border border-slate-200',                            num: 'text-slate-800',    sub: 'text-slate-400', icon: 'text-slate-400' },
  }
  const t = tones[tone] ?? tones.slate

  return (
    <div className={`rounded-2xl p-3 sm:p-4 shadow-sm ${t.card}`}>
      <div className="flex items-center justify-between mb-2 gap-1">
        <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wide truncate ${t.sub}`}>{label}</span>
        {Icon && <Icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${t.icon}`} />}
      </div>
      <p className={`text-2xl sm:text-3xl font-bold ${t.num}`}>{value}</p>
    </div>
  )
}
