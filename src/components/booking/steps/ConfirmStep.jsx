import { Calendar, Clock, Stethoscope, UserRound } from 'lucide-react'

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('sq-AL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-b-0">
      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-slate-400 font-medium">{label}</div>
        <div className="text-sm text-slate-800 mt-0.5">{value}</div>
      </div>
    </div>
  )
}

export default function ConfirmStep({ service, doctor, date, slot, notes, onNotesChange }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50/40 px-4">
        <Row icon={Stethoscope} label="Shërbimi" value={service?.name || '—'} />
        <Row icon={UserRound}   label="Mjeku"    value={doctor ? `${doctor.fullName} · ${doctor.title}` : '—'} />
        <Row icon={Calendar}    label="Data"     value={date ? formatDate(date) : '—'} />
        <Row icon={Clock}       label="Ora"      value={slot ? formatTime(slot) : '—'} />
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-medium text-slate-600 mb-2">
          Shënime (opsionale)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="P.sh. simptoma, alergji, kërkesa të veçanta..."
          className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
        />
      </div>
    </div>
  )
}
