import { Loader2 } from 'lucide-react'
import { useCategories } from '../../../hooks/useCatalog'
import { getCategoryVisual } from '../categoryIcons'

export default function CategoryStep({ value, onChange }) {
  const { items, loading, error } = useCategories()

  if (loading) return <StateRow><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Po ngarkohen kategoritë...</StateRow>
  if (error) return <p className="text-sm text-red-600 text-center py-4">{error}</p>
  if (items.length === 0) return <p className="text-sm text-slate-500 text-center py-4">Asnjë kategori e disponueshme.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((c) => {
        const { Icon, tone } = getCategoryVisual(c.name)
        const selected = value?.id === c.id
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c)}
            className={[
              'text-left p-4 rounded-xl border transition-all',
              selected
                ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tone}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-slate-900 leading-snug">{c.name}</div>
                {c.description && <div className="text-xs text-slate-500 mt-0.5">{c.description}</div>}
                <div className="text-[11px] text-slate-400 mt-1.5">
                  {c.serviceCount} shërbim{c.serviceCount === 1 ? '' : 'e'} · {c.institutionCount} institucion{c.institutionCount === 1 ? '' : 'e'}
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function StateRow({ children }) {
  return (
    <div className="flex items-center justify-center py-8 text-slate-500 text-sm">
      {children}
    </div>
  )
}
