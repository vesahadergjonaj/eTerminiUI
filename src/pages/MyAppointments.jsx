import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../hooks/useAppointments'

const statusColors = {
  Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Confirmed: 'bg-green-50 text-green-700 border-green-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
  Completed: 'bg-slate-50 text-slate-600 border-slate-200',
  NoShow: 'bg-orange-50 text-orange-700 border-orange-200',
}

const statusLabels = {
  Pending: 'Në pritje',
  Confirmed: 'Konfirmuar',
  Cancelled: 'Anuluar',
  Completed: 'Përfunduar',
  NoShow: 'Mungoi',
}

export default function MyAppointments() {
  const { user } = useAuth()
  const { appointments, loading, error, cancel, cancelling } = useAppointments()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Terminet e mia</h1>
        <p className="text-slate-500 text-sm">
          Mirë se vini, {user?.fullName || user?.email}
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <div className="text-center text-slate-400 py-16">
          <p className="text-lg mb-2">Nuk keni termin të rezervuar.</p>
          <a href="/institutions" className="text-blue-600 hover:underline text-sm">
            Rezervoni terminin e parë tuaj →
          </a>
        </div>
      )}

      {!loading && appointments.length > 0 && (
        <div className="flex flex-col gap-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[apt.status] ?? ''}`}>
                    {statusLabels[apt.status] ?? apt.status}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800">{apt.institutionName}</h3>
                <p className="text-slate-500 text-sm">{apt.serviceName}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">
                    {new Date(apt.startTime).toLocaleDateString('sq-AL')}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(apt.startTime).toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {(apt.status === 'Pending' || apt.status === 'Confirmed') && (
                  <button
                    onClick={() => cancel(apt.id)}
                    disabled={cancelling === apt.id}
                    className="text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {cancelling === apt.id ? 'Duke anuluar...' : 'Anulo'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
