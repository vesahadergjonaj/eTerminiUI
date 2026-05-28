import { Building2, Calendar, CalendarClock, Clock, FileText, UserRound, Ban, Loader2 } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { getCategoryVisual } from '../booking/categoryIcons'

const isActive = (status) => status === 'Pending' || status === 'Confirmed'

const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('sq-AL', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

const formatDayName = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('sq-AL', { weekday: 'long' })
}

const formatTime = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })
}

function Field({ Icon, label, primary, secondary, full }) {
  return (
    <div className={`flex items-start gap-2.5 ${full ? 'col-span-2' : ''}`}>
      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</p>
        <p className="text-slate-800 text-sm font-semibold leading-tight truncate">{primary}</p>
        {secondary && <p className="text-slate-400 text-xs mt-0.5 truncate">{secondary}</p>}
      </div>
    </div>
  )
}

export default function AppointmentCard({ appointment, cancelling, rescheduling, onCancel, onReschedule }) {
  const showActions = isActive(appointment.status)
  const { Icon: CategoryIcon, tone: categoryTone } = getCategoryVisual(appointment.categoryName)
  const headerTitle = appointment.serviceName || appointment.doctorFullName || 'Termin'
  const headerSub = appointment.serviceName
    ? (appointment.institutionName || 'Shërbim publik')
    : (appointment.doctorTitle || 'Termin')

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <StatusBadge status={appointment.status} />
          {appointment.categoryName && (
            <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${categoryTone}`}>
              <CategoryIcon className="w-3 h-3" />
              {appointment.categoryName}
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold shrink-0">
          ID: {String(appointment.id).slice(0, 8)}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${categoryTone}`}>
            <CategoryIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-base leading-tight truncate">{headerTitle}</h3>
            <p className="text-slate-500 text-sm truncate">{headerSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            Icon={Calendar}
            label="Data"
            primary={formatDate(appointment.appointmentDate)}
            secondary={formatDayName(appointment.appointmentDate)}
          />
          <Field
            Icon={Clock}
            label="Ora"
            primary={formatTime(appointment.appointmentDate)}
          />
          {appointment.doctorFullName && (
            <Field
              Icon={UserRound}
              label="Zyrtari"
              primary={appointment.doctorFullName}
              secondary={appointment.doctorTitle}
            />
          )}
          {appointment.institutionName && (
            <Field
              Icon={Building2}
              label="Institucioni"
              primary={appointment.institutionName}
            />
          )}
          {appointment.notes && (
            <Field
              Icon={FileText}
              label="Shënime"
              primary={appointment.notes}
              full
            />
          )}
        </div>

        {showActions && (
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={onReschedule}
              disabled={cancelling || rescheduling}
              className="inline-flex items-center gap-1.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {rescheduling ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Duke riprogramuar...
                </>
              ) : (
                <>
                  <CalendarClock className="w-3.5 h-3.5" /> Riprogramo
                </>
              )}
            </button>
            <button
              onClick={onCancel}
              disabled={cancelling || rescheduling}
              className="inline-flex items-center gap-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelling ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Duke anuluar...
                </>
              ) : (
                <>
                  <Ban className="w-3.5 h-3.5" /> Anulo
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
