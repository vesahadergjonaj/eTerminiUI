import { Clock, RefreshCw } from 'lucide-react'
import { useAvailableSlots } from '../../../hooks/useAvailableSlots'

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })

export default function TimeSlotStep({ doctorId, date, durationMinutes, value, onChange }) {
  const { slots, loading, error, refetch } = useAvailableSlots({
    doctorId,
    date,
    durationMinutes,
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-slate-500 text-sm">
        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
        Po ngarkohen terminet e lira...
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-red-600 mb-3">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="text-sm font-medium text-blue-700 hover:text-blue-800 underline"
        >
          Provo përsëri
        </button>
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-slate-500">
        <Clock className="w-6 h-6 mx-auto mb-2 text-slate-400" />
        Nuk ka termine të lira për këtë datë. Provo një datë tjetër.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {slots.map((slot) => {
        const iso = slot.startTime
        const selected = value === iso
        return (
          <button
            key={iso}
            type="button"
            onClick={() => onChange(iso)}
            className={[
              'h-11 rounded-xl border text-sm font-medium transition-all',
              selected
                ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
                : 'border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            {formatTime(iso)}
          </button>
        )
      })}
    </div>
  )
}
