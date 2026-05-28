import { useState } from 'react'
import { Calendar, Clock, Loader2, X } from 'lucide-react'

import DateStep from '../booking/steps/DateStep'
import TimeSlotStep from '../booking/steps/TimeSlotStep'

const formatDateTime = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('sq-AL', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const formatIsoDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10)
}

export default function RescheduleDialog({ appointment, submitting, error, onConfirm, onClose }) {
  const initialDate = formatIsoDate(appointment.appointmentDate)
  const [date, setDate] = useState(initialDate)
  const [slot, setSlot] = useState('')
  const [reason, setReason] = useState('')

  const canSubmit = Boolean(date) && Boolean(slot) && !submitting

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <header className="px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Riprogramo terminin</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aktualisht: {formatDateTime(appointment.appointmentDate)} ·{' '}
              {appointment.doctorFullName || 'Mjeku'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={submitting}
            className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            aria-label="Mbyll"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="px-6 py-5 overflow-y-auto space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              Data e re
            </div>
            <DateStep value={date} onChange={(d) => { setDate(d); setSlot('') }} />
          </section>

          {date && (
            <section>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-700">
                <Clock className="w-4 h-4 text-blue-600" />
                Ora e re
              </div>
              <TimeSlotStep
                doctorId={appointment.doctorId}
                date={date}
                durationMinutes={30}
                value={slot}
                onChange={setSlot}
              />
            </section>
          )}

          <section>
            <label htmlFor="reschedule-reason" className="block text-xs font-medium text-slate-600 mb-2">
              Arsyeja (opsionale)
            </label>
            <textarea
              id="reschedule-reason"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="P.sh. nuk mund të vij në kohën aktuale..."
              className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
            />
          </section>

          {error && (
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <footer className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={submitting}
            className="h-10 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-white disabled:opacity-50 transition-colors"
          >
            Anulo
          </button>
          <button
            onClick={() => onConfirm({ appointmentDate: slot, reason: reason || null })}
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Po riprogramohet...
              </>
            ) : (
              'Konfirmo orën e re'
            )}
          </button>
        </footer>
      </div>
    </div>
  )
}
