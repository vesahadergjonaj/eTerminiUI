import { UserRound } from 'lucide-react'
import { doctors } from '../../../data/bookingCatalog'

export default function DoctorStep({ service, value, onChange }) {
  const filtered = service
    ? doctors.filter((d) => d.serviceIds.includes(service.id))
    : doctors

  if (filtered.length === 0) {
    return (
      <div className="text-sm text-slate-500 text-center py-8">
        Asnjë mjek nuk është i disponueshëm për këtë shërbim.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {filtered.map((doctor) => {
        const initials = doctor.fullName.split(' ').slice(-2).map((w) => w[0]).join('').toUpperCase()
        const selected = value?.id === doctor.id
        return (
          <button
            key={doctor.id}
            type="button"
            onClick={() => onChange(doctor)}
            className={[
              'text-left p-4 rounded-xl border transition-all flex items-center gap-3',
              selected
                ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            <div
              className={[
                'w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm shrink-0',
                selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700',
              ].join(' ')}
            >
              {initials || <UserRound className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 leading-snug">{doctor.fullName}</div>
              <div className="text-xs text-slate-500 mt-0.5">{doctor.title}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
