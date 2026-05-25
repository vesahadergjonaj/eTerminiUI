import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Hash,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock3,
  Ban,
  Bell,
  User,
  Plus,
  Ticket,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../hooks/useAppointments'

const statusConfig = {
  Pending:   { color: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-500',   label: 'Në pritje',  Icon: Clock3 },
  Confirmed: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', label: 'Konfirmuar', Icon: CheckCircle2 },
  Cancelled: { color: 'bg-red-50 text-red-700 border-red-200',          dot: 'bg-red-500',     label: 'Anuluar',    Icon: Ban },
  Completed: { color: 'bg-slate-50 text-slate-600 border-slate-200',    dot: 'bg-slate-400',   label: 'Përfunduar', Icon: CheckCircle2 },
  NoShow:    { color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500',  label: 'Mungoi',     Icon: AlertCircle },
}

const tabs = [
  { key: null,        label: 'Të gjitha' },
  { key: 'active',    label: 'Aktive' },
  { key: 'Completed', label: 'Përfunduar' },
  { key: 'Cancelled', label: 'Anuluar' },
]

const isActiveStatus = (status) => status === 'Pending' || status === 'Confirmed'

// Reference number fallback if backend doesn't return one
const refOf = (apt) =>
  apt.referenceNumber || `eT-${String(apt.id ?? '').slice(0, 8).toUpperCase()}`

export default function MyAppointments() {
  const { user } = useAuth()
  const { appointments, loading, error, cancel, cancelling } = useAppointments()
  const [activeTab, setActiveTab] = useState(null)

  const filtered = useMemo(() => appointments.filter((apt) => {
    if (!activeTab) return true
    if (activeTab === 'active') return isActiveStatus(apt.status)
    return apt.status === activeTab
  }), [appointments, activeTab])

  const counts = useMemo(() => ({
    active:    appointments.filter((a) => isActiveStatus(a.status)).length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
    cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
  }), [appointments])

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sticky top-24">
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
              <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left bg-blue-600 text-white font-medium shadow-sm shadow-blue-600/20">
                <Ticket className="w-4 h-4" />
                <span className="flex-1">Terminet e mia</span>
              </button>
              <Link to="/institutions" className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Rezervo termin</span>
              </Link>
              <button disabled className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left text-slate-400 cursor-default">
                <User className="w-4 h-4" />
                <span className="flex-1">Profili im</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">Së shpejti</span>
              </button>
              <button disabled className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left text-slate-400 cursor-default">
                <Bell className="w-4 h-4" />
                <span className="flex-1">Njoftimet</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">Së shpejti</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">Dashboardi im</h1>
            <p className="text-slate-500 text-sm">
              Mirë se vini, {user?.fullName || user?.email}
            </p>
          </div>

          {/* Summary */}
          {!loading && !error && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <SummaryCard
                tone="blue"
                label="Aktive"
                value={counts.active}
                Icon={Calendar}
              />
              <SummaryCard
                tone="green"
                label="Përfunduar"
                value={counts.completed}
                Icon={CheckCircle2}
              />
              <SummaryCard
                tone="red"
                label="Anuluar"
                value={counts.cancelled}
                Icon={XCircle}
              />
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1 shadow-sm mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 text-sm py-2 px-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4 mb-4 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm text-center py-16 px-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-7 h-7 text-blue-600" />
              </div>
              <p className="text-slate-800 font-semibold mb-1">
                {activeTab ? 'Nuk ka termin në këtë kategori' : 'Nuk keni termin të rezervuar'}
              </p>
              <p className="text-slate-500 text-sm mb-6">
                {activeTab ? 'Provoni një filtër tjetër' : 'Rezervoni terminin tuaj të parë tani'}
              </p>
              <Link
                to="/institutions"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Rezervo termin
              </Link>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="flex flex-col gap-4">
              {filtered.map((apt) => (
                <TicketCard
                  key={apt.id}
                  apt={apt}
                  cancelling={cancelling === apt.id}
                  onCancel={() => cancel(apt.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ tone, label, value, Icon }) {
  const tones = {
    blue:  'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm shadow-blue-600/20',
    green: 'bg-white border border-slate-200 text-slate-800',
    red:   'bg-white border border-slate-200 text-slate-800',
  }
  const accent = {
    blue:  { num: 'text-white', sub: 'text-blue-100', icon: 'text-blue-200' },
    green: { num: 'text-emerald-600', sub: 'text-slate-400', icon: 'text-emerald-500' },
    red:   { num: 'text-red-500', sub: 'text-slate-400', icon: 'text-red-400' },
  }
  const c = accent[tone]
  return (
    <div className={`rounded-2xl p-4 ${tones[tone]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs font-medium uppercase tracking-wide ${c.sub}`}>{label}</span>
        <Icon className={`w-5 h-5 ${c.icon}`} />
      </div>
      <p className={`text-3xl font-bold ${c.num}`}>{value}</p>
    </div>
  )
}

function TicketCard({ apt, cancelling, onCancel }) {
  const cfg = statusConfig[apt.status] ?? statusConfig.Pending
  const StatusIcon = cfg.Icon
  const reference = refOf(apt)
  const startDate = new Date(apt.startTime)
  const dateStr = startDate.toLocaleDateString('sq-AL', { day: '2-digit', month: 'short', year: 'numeric' })
  const dayName = startDate.toLocaleDateString('sq-AL', { weekday: 'long' })
  const timeStr = startDate.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })

  const active = isActiveStatus(apt.status)

  // QR encodes a verification URL so officials can validate the ticket
  const qrValue = `https://etermini.rks-gov.net/verify/${reference}`

  return (
    <article className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Top status strip */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50/70 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${cfg.color}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {cfg.label}
          </span>
          <span className="text-xs text-slate-400 hidden sm:flex items-center gap-1">
            <Hash className="w-3 h-3" />
            {reference}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Biletë digjitale
        </span>
      </div>

      {/* Body — perforated ticket */}
      <div className="flex flex-col sm:flex-row">
        {/* Left: info */}
        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-slate-900 text-base leading-tight truncate">
                {apt.institutionName}
              </h3>
              <p className="text-slate-500 text-sm truncate">{apt.serviceName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              Icon={Calendar}
              label="Data"
              primary={dateStr}
              secondary={dayName}
            />
            <Field
              Icon={Clock}
              label="Ora"
              primary={timeStr}
              secondary={apt.duration ? `${apt.duration} min` : 'Termin'}
            />
            {apt.location && (
              <Field
                Icon={MapPin}
                label="Lokacioni"
                primary={apt.location}
                full
              />
            )}
          </div>

          {active && (
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={onCancel}
                disabled={cancelling}
                className="inline-flex items-center gap-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                <Ban className="w-3.5 h-3.5" />
                {cancelling ? 'Duke anuluar...' : 'Anulo terminin'}
              </button>
              <button className="inline-flex items-center gap-1.5 text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl font-medium transition-colors">
                Detajet
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {apt.status === 'Cancelled' && (
            <div className="mt-5">
              <Link
                to="/institutions"
                className="inline-flex items-center gap-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Rezervo përsëri
              </Link>
            </div>
          )}
        </div>

        {/* Perforation divider */}
        <div className="hidden sm:flex flex-col items-center px-1 relative shrink-0">
          <div className="absolute -top-2.5 w-5 h-5 rounded-full bg-slate-50 border-r border-b border-slate-200 -translate-y-1/2 translate-x-0" />
          <div className="flex-1 my-3 border-l-2 border-dashed border-slate-200" />
          <div className="absolute -bottom-2.5 w-5 h-5 rounded-full bg-slate-50 border-r border-t border-slate-200 translate-y-1/2 translate-x-0" />
        </div>

        {/* Right: QR */}
        <div className="bg-slate-50/50 sm:w-52 flex flex-col items-center justify-center p-5 sm:p-6 border-t sm:border-t-0 sm:border-l border-dashed border-slate-200">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 mb-3">
            <QRCodeSVG
              value={qrValue}
              size={104}
              level="M"
              bgColor="#ffffff"
              fgColor="#1e293b"
            />
          </div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Kodi i biletës
          </p>
          <p className="text-slate-800 font-mono text-xs font-semibold tracking-wide">
            {reference}
          </p>
        </div>
      </div>
    </article>
  )
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
