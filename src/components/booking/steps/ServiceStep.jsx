import { services } from '../../../data/bookingCatalog'

export default function ServiceStep({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {services.map((service) => {
        const Icon = service.icon
        const selected = value?.id === service.id
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onChange(service)}
            className={[
              'text-left p-4 rounded-xl border transition-all',
              selected
                ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <div
                className={[
                  'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                  selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600',
                ].join(' ')}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 leading-snug">{service.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{service.description}</div>
                <div className="text-[11px] text-slate-400 mt-1.5">
                  Kohëzgjatja: {service.durationMinutes} min
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
