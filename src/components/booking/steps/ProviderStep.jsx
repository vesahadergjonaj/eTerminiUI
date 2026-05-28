import { Loader2, UserRound } from 'lucide-react'
import { useProvidersForService } from '../../../hooks/useCatalog'

export default function ProviderStep({ serviceId, value, onChange }) {
  const { items, loading, error } = useProvidersForService(serviceId)

  if (!serviceId) return <p className="text-sm text-slate-500 text-center py-4">Fillimisht zgjedh një shërbim.</p>
  if (loading) return <div className="flex items-center justify-center py-8 text-slate-500 text-sm"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Po ngarkohen zyrtarët...</div>
  if (error) return <p className="text-sm text-red-600 text-center py-4">{error}</p>
  if (items.length === 0) return <p className="text-sm text-slate-500 text-center py-4">Asnjë zyrtar i disponueshëm për këtë shërbim.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((p) => {
        const initials = (p.fullName || '?')
          .split(' ').slice(-2).map((w) => w[0] || '').join('').toUpperCase()
        const selected = value?.id === p.id
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onChange(p)}
            className={[
              'text-left p-4 rounded-xl border transition-all flex items-center gap-3',
              selected
                ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            <div className={[
              'w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm shrink-0',
              selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700',
            ].join(' ')}>
              {initials || <UserRound className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 leading-snug">{p.fullName}</div>
              <div className="text-xs text-slate-500 mt-0.5">{p.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{p.departmentName}</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
