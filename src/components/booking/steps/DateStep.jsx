import { Calendar } from 'lucide-react'

const formatIso = (d) => d.toISOString().slice(0, 10)

export default function DateStep({ value, onChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const minDate = formatIso(today)

  const maxDateObj = new Date(today)
  maxDateObj.setMonth(maxDateObj.getMonth() + 3)
  const maxDate = formatIso(maxDateObj)

  const quickDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return d
  })

  const weekdayLabel = (d) => d.toLocaleDateString('sq-AL', { weekday: 'short' })
  const dayNumber = (d) => d.getDate()

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-2">Zgjedhje e shpejtë</label>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickDates.map((d) => {
            const iso = formatIso(d)
            const selected = value === iso
            return (
              <button
                key={iso}
                type="button"
                onClick={() => onChange(iso)}
                className={[
                  'min-w-[68px] py-2.5 rounded-xl border text-center transition-all shrink-0',
                  selected
                    ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10'
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
                ].join(' ')}
              >
                <div className="text-[10px] uppercase tracking-wide text-slate-500">
                  {weekdayLabel(d)}
                </div>
                <div className="text-lg font-bold text-slate-900 mt-0.5">{dayNumber(d)}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label htmlFor="bookingDate" className="block text-xs font-medium text-slate-600 mb-2">
          Ose zgjidh një datë tjetër
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="bookingDate"
            type="date"
            value={value || ''}
            min={minDate}
            max={maxDate}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-11 pl-10 pr-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>
    </div>
  )
}
