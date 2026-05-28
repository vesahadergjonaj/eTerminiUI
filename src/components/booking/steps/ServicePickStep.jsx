import { Loader2 } from 'lucide-react'
import { useServicesForInstitution } from '../../../hooks/useCatalog'

export default function ServicePickStep({ institutionId, categoryId, value, onChange }) {
  const { items, loading, error } = useServicesForInstitution(institutionId, categoryId)

  if (!institutionId) return <p className="text-sm text-slate-500 text-center py-4">Fillimisht zgjedh një institucion.</p>
  if (loading) return <div className="flex items-center justify-center py-8 text-slate-500 text-sm"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Po ngarkohen shërbimet...</div>
  if (error) return <p className="text-sm text-red-600 text-center py-4">{error}</p>
  if (items.length === 0) return <p className="text-sm text-slate-500 text-center py-4">Asnjë shërbim i disponueshëm.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((s) => {
        const selected = value?.id === s.id
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s)}
            className={[
              'text-left p-4 rounded-xl border transition-all',
              selected
                ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            <div className="font-semibold text-slate-900 leading-snug">{s.name}</div>
            {s.description && <div className="text-xs text-slate-500 mt-1">{s.description}</div>}
            <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
              <span>Kohëzgjatja: {s.durationMinutes} min</span>
              <span>· {s.departmentName}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
