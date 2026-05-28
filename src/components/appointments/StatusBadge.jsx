import { Clock3, CheckCircle2, Ban, AlertCircle } from 'lucide-react'

const config = {
  Pending:   { color: 'bg-amber-50 text-amber-700 border-amber-200',           label: 'Në pritje',  Icon: Clock3 },
  Confirmed: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200',     label: 'Konfirmuar', Icon: CheckCircle2 },
  Cancelled: { color: 'bg-red-50 text-red-700 border-red-200',                 label: 'Anuluar',    Icon: Ban },
  Completed: { color: 'bg-slate-50 text-slate-600 border-slate-200',           label: 'Përfunduar', Icon: CheckCircle2 },
  NoShow:    { color: 'bg-orange-50 text-orange-700 border-orange-200',        label: 'Mungoi',     Icon: AlertCircle },
}

export default function StatusBadge({ status }) {
  const cfg = config[status] ?? config.Pending
  const Icon = cfg.Icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${cfg.color}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  )
}
