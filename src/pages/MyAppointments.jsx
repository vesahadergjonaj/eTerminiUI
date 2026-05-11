import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../hooks/useAppointments'

const statusConfig = {
  Pending:   { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', dot: 'bg-yellow-400', label: 'Në pritje' },
  Confirmed: { color: 'bg-green-50 text-green-700 border-green-200',  dot: 'bg-green-500',  label: 'Konfirmuar' },
  Cancelled: { color: 'bg-red-50 text-red-700 border-red-200',        dot: 'bg-red-500',    label: 'Anuluar' },
  Completed: { color: 'bg-slate-50 text-slate-600 border-slate-200',  dot: 'bg-slate-400',  label: 'Përfunduar' },
  NoShow:    { color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-400', label: 'Mungoi' },
}

const tabs = [
  { key: null,        label: 'Të gjitha' },
  { key: 'active',   label: 'Aktive' },
  { key: 'Completed', label: 'Përfunduar' },
  { key: 'Cancelled', label: 'Anuluar' },
]

const isActive = (status) => status === 'Pending' || status === 'Confirmed'

export default function MyAppointments() {
  const { user } = useAuth()
  const { appointments, loading, error, cancel, cancelling } = useAppointments()
  const [activeTab, setActiveTab] = useState(null)

  const filtered = appointments.filter((apt) => {
    if (!activeTab) return true
    if (activeTab === 'active') return isActive(apt.status)
    return apt.status === activeTab
  })

  const countActive    = appointments.filter((a) => isActive(a.status)).length
  const countCompleted = appointments.filter((a) => a.status === 'Completed').length
  const countCancelled = appointments.filter((a) => a.status === 'Cancelled').length

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="lg:w-60 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            {/* User info */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">
                  {user?.fullName || 'Përdoruesi'}
                </p>
                <p className="text-slate-400 text-xs truncate">{user?.email}</p>
              </div>
            </div>

            {/* Sidebar nav */}
            <nav className="flex flex-col gap-1">
              {[
                { icon: '📅', label: 'Terminet e mia', active: true },
                { icon: '🏛️', label: 'Rezervo termin', to: '/institutions' },
                { icon: '👤', label: 'Profili im', soon: true },
                { icon: '🔔', label: 'Njoftimet', soon: true },
              ].map((item) => (
                item.to ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={item.label}
                    disabled={item.soon}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors ${
                      item.active
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'
                    } ${item.soon ? 'opacity-50 cursor-default' : ''}`}
                  >
                    <span>{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.soon && <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full">Së shpejti</span>}
                  </button>
                )
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Terminet e mia</h1>
            <p className="text-slate-500 text-sm">
              Mirë se vini, {user?.fullName || user?.email}
            </p>
          </div>

          {/* Summary cards */}
          {!loading && !error && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-600 text-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-200 text-xs font-medium uppercase tracking-wide">Aktive</span>
                  <span className="text-2xl">📅</span>
                </div>
                <p className="text-3xl font-bold">{countActive}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Përfunduar</span>
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-3xl font-bold text-green-600">{countCompleted}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Anuluar</span>
                  <span className="text-2xl">❌</span>
                </div>
                <p className="text-3xl font-bold text-red-500">{countCancelled}</p>
              </div>
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex gap-1 bg-white border border-slate-100 rounded-2xl p-1 shadow-sm mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 text-sm py-2 px-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4 mb-4">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-16 px-6">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                📭
              </div>
              <p className="text-slate-600 font-semibold mb-1">
                {activeTab ? 'Nuk ka termin në këtë kategori' : 'Nuk keni termin të rezervuar'}
              </p>
              <p className="text-slate-400 text-sm mb-5">
                {activeTab ? 'Provoni një filtër tjetër' : 'Rezervoni terminin tuaj të parë tani'}
              </p>
              <Link
                to="/institutions"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Rezervo termin →
              </Link>
            </div>
          )}

          {/* Appointment list */}
          {!loading && filtered.length > 0 && (
            <div className="flex flex-col gap-3">
              {filtered.map((apt) => {
                const cfg = statusConfig[apt.status] ?? statusConfig.Pending
                const startDate = new Date(apt.startTime)
                const dateStr = startDate.toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
                const timeStr = startDate.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })

                return (
                  <div
                    key={apt.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Left: institution icon */}
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                        🏛️
                      </div>

                      {/* Middle: info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full border font-medium ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-800 text-base truncate">
                          {apt.institutionName}
                        </h3>
                        <p className="text-slate-500 text-sm truncate">{apt.serviceName}</p>
                      </div>

                      {/* Right: date + action */}
                      <div className="flex items-center gap-5 flex-shrink-0">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-slate-700 text-sm font-medium">
                            <span>📅</span>
                            <span>{dateStr}</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-sm mt-0.5 justify-end">
                            <span>🕙</span>
                            <span>{timeStr}</span>
                          </div>
                        </div>

                        {isActive(apt.status) ? (
                          <button
                            onClick={() => cancel(apt.id)}
                            disabled={cancelling === apt.id}
                            className="text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50 whitespace-nowrap"
                          >
                            {cancelling === apt.id ? 'Duke anuluar...' : 'Anulo'}
                          </button>
                        ) : apt.status === 'Cancelled' ? (
                          <Link
                            to="/institutions"
                            className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
                          >
                            Rezervo përsëri
                          </Link>
                        ) : (
                          <button className="text-sm text-slate-500 border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                            Detajet
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
