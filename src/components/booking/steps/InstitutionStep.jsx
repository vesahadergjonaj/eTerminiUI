import { Building2, Loader2, MapPin } from 'lucide-react'
import { useInstitutionsForCategory } from '../../../hooks/useCatalog'

export default function InstitutionStep({ categoryId, value, onChange }) {
  const { items, loading, error } = useInstitutionsForCategory(categoryId)

  if (!categoryId) return <p className="text-sm text-slate-500 text-center py-4">Fillimisht zgjedh një kategori.</p>
  if (loading) return <div className="flex items-center justify-center py-8 text-slate-500 text-sm"><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Po ngarkohen institucionet...</div>
  if (error) return <p className="text-sm text-red-600 text-center py-4">{error}</p>
  if (items.length === 0) return <p className="text-sm text-slate-500 text-center py-4">Asnjë institucion për këtë kategori.</p>

  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((inst) => {
        const selected = value?.id === inst.id
        return (
          <button
            key={inst.id}
            type="button"
            onClick={() => onChange(inst)}
            className={[
              'text-left p-4 rounded-xl border transition-all',
              selected
                ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 shadow-sm'
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <div className={[
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600',
              ].join(' ')}>
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-slate-900 leading-snug">{inst.name}</div>
                {inst.description && <div className="text-xs text-slate-500 mt-0.5">{inst.description}</div>}
                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {inst.city}</span>
                  <span>{inst.serviceCount} shërbim{inst.serviceCount === 1 ? '' : 'e'}</span>
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
