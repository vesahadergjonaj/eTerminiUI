import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Calendar,
  CalendarPlus,
  CheckCircle2,
  RefreshCw,
  Ticket,
  XCircle,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../hooks/useAppointments'

import SummaryCard from '../components/appointments/SummaryCard'
import FilterTabs from '../components/appointments/FilterTabs'
import EmptyState from '../components/appointments/EmptyState'
import AppointmentCard from '../components/appointments/AppointmentCard'
import RescheduleDialog from '../components/appointments/RescheduleDialog'

const isActiveStatus = (s) => s === 'Pending' || s === 'Confirmed'
const isUpcoming = (apt) =>
  apt.appointmentDate && new Date(apt.appointmentDate) > new Date()

export default function MyAppointments() {
  const { user } = useAuth()
  const { appointments, loading, error, cancel, cancelling, reschedule, rescheduling, refetch } = useAppointments()

  const [activeTab, setActiveTab] = useState('all')
  const [pendingCancel, setPendingCancel] = useState(null)
  const [reschedulingApt, setReschedulingApt] = useState(null)
  const [rescheduleError, setRescheduleError] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const counts = useMemo(() => ({
    all:       appointments.length,
    active:    appointments.filter(isActiveStatus).length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
  }), [appointments])

  const tabs = useMemo(() => ([
    { key: 'all',       label: 'Të gjitha',  count: counts.all },
    { key: 'active',    label: 'Aktive',     count: counts.active },
    { key: 'Completed', label: 'Përfunduar', count: counts.completed },
  ]), [counts])

  const filtered = useMemo(() => {
    const list = activeTab === 'all'
      ? appointments
      : activeTab === 'active'
        ? appointments.filter(isActiveStatus)
        : appointments.filter((a) => a.status === activeTab)

    return [...list].sort((a, b) => {
      const da = a.appointmentDate ? new Date(a.appointmentDate).getTime() : 0
      const db = b.appointmentDate ? new Date(b.appointmentDate).getTime() : 0
      return da - db
    })
  }, [appointments, activeTab])

  const handleConfirmCancel = async () => {
    if (!pendingCancel) return
    const id = pendingCancel.id
    setPendingCancel(null)
    const result = await cancel(id)
    setToast(result.ok
      ? { type: 'success', message: 'Termini u anulua me sukses.' }
      : { type: 'error',   message: result.error || 'Anulimi dështoi.' })
  }

  const handleReschedule = (apt) => {
    setRescheduleError(null)
    setReschedulingApt(apt)
  }

  const handleConfirmReschedule = async (payload) => {
    if (!reschedulingApt) return
    setRescheduleError(null)
    const result = await reschedule(reschedulingApt.id, payload)
    if (result.ok) {
      setReschedulingApt(null)
      setToast({ type: 'success', message: 'Termini u riprogramua me sukses.' })
    } else {
      setRescheduleError(result.error || 'Riprogramimi dështoi.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <Sidebar user={user} />

        <main className="flex-1 min-w-0">
          <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Terminet e mia</h1>
              <p className="text-slate-500 text-sm">
                Mirë se vini, {user?.fullName || user?.email}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={refetch}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Rifresko
              </button>
              <Link
                to="/book"
                className="inline-flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-xl font-semibold transition-colors shadow-sm shadow-blue-600/20"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                Rezervo termin
              </Link>
            </div>
          </header>

          {!loading && !error && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <SummaryCard tone="blue"    label="Aktive"     value={counts.active}    Icon={Calendar} />
              <SummaryCard tone="emerald" label="Përfunduar" value={counts.completed} Icon={CheckCircle2} />
              <SummaryCard tone="slate"   label="Të gjitha"  value={counts.all}       Icon={Ticket} />
            </div>
          )}

          <div className="mb-6">
            <FilterTabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && !loading && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4 mb-4 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <EmptyState filtered={activeTab !== 'all'} />
          )}

          {!loading && filtered.length > 0 && (
            <div className="flex flex-col gap-4">
              {filtered.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  cancelling={cancelling === apt.id}
                  rescheduling={rescheduling === apt.id}
                  onCancel={() => setPendingCancel(apt)}
                  onReschedule={() => handleReschedule(apt)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {pendingCancel && (
        <ConfirmDialog
          title="Anulo terminin?"
          message={`Jeni i sigurt që dëshironi të anuloni terminin me ${pendingCancel.doctorFullName || 'mjekun'}? Ky veprim nuk mund të zhbëhet.`}
          confirmLabel="Po, anulo"
          confirmTone="danger"
          onConfirm={handleConfirmCancel}
          onCancel={() => setPendingCancel(null)}
        />
      )}

      {reschedulingApt && (
        <RescheduleDialog
          appointment={reschedulingApt}
          submitting={rescheduling === reschedulingApt.id}
          error={rescheduleError}
          onConfirm={handleConfirmReschedule}
          onClose={() => {
            setReschedulingApt(null)
            setRescheduleError(null)
          }}
        />
      )}

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  )
}

function Sidebar({ user }) {
  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <aside className="lg:w-64 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 lg:sticky lg:top-24">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 text-sm truncate">
              {user?.fullName || 'Përdoruesi'}
            </p>
            <p className="text-slate-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <span className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm bg-blue-600 text-white font-medium shadow-sm shadow-blue-600/20">
            <Ticket className="w-4 h-4" />
            Terminet e mia
          </span>
          <Link
            to="/book"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors"
          >
            <CalendarPlus className="w-4 h-4" />
            Rezervo termin
          </Link>
        </nav>
      </div>
    </aside>
  )
}

function ConfirmDialog({ title, message, confirmLabel, confirmTone = 'primary', onConfirm, onCancel }) {
  const confirmClasses = confirmTone === 'danger'
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : 'bg-blue-600 hover:bg-blue-700 text-white'

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm text-slate-600 mb-5">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-10 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Jo, kthehu
          </button>
          <button
            onClick={onConfirm}
            className={`h-10 px-4 rounded-xl text-sm font-semibold transition-colors ${confirmClasses}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function Toast({ type, message, onClose }) {
  const styles = type === 'success'
    ? 'bg-emerald-600 text-white'
    : 'bg-red-600 text-white'
  const Icon = type === 'success' ? CheckCircle2 : XCircle

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg ${styles}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
