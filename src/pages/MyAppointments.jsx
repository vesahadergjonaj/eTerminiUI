import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const statusColors = {
  Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Confirmed: 'bg-green-50 text-green-700 border-green-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
  Completed: 'bg-slate-50 text-slate-600 border-slate-200',
}

const statusLabels = {
  Pending: 'Në pritje',
  Confirmed: 'Konfirmuar',
  Cancelled: 'Anuluar',
  Completed: 'Përfunduar',
}

const mockAppointments = [
  {
    id: '1',
    institution: 'QKUK',
    service: 'Kardiologji — Kontroll rutinë',
    date: '2026-05-15',
    time: '10:30',
    status: 'Confirmed',
  },
  {
    id: '2',
    institution: 'Policia e Kosovës',
    service: 'Lëshim Patente Shoferi',
    date: '2026-05-20',
    time: '09:00',
    status: 'Pending',
  },
  {
    id: '3',
    institution: 'Komuna e Prishtinës',
    service: 'Certifikatë lindjeje',
    date: '2026-04-10',
    time: '11:00',
    status: 'Completed',
  },
]

export default function MyAppointments() {
  const { user } = useAuth()
  const [appointments] = useState(mockAppointments)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Terminet e mia</h1>
        <p className="text-slate-500 text-sm">Mirë se vini, {user?.fullName || user?.email}</p>
      </div>

      {appointments.length === 0 ? (
        <div className="text-center text-slate-400 py-16">
          <p className="text-lg mb-2">Nuk keni termin të rezervuar.</p>
          <a href="/institutions" className="text-blue-600 hover:underline text-sm">
            Rezervoni terminin e parë tuaj →
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[apt.status]}`}>
                    {statusLabels[apt.status]}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800">{apt.institution}</h3>
                <p className="text-slate-500 text-sm">{apt.service}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{apt.date}</p>
                  <p className="text-sm text-slate-500">{apt.time}</p>
                </div>
                {apt.status === 'Pending' || apt.status === 'Confirmed' ? (
                  <button className="text-sm text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    Anulo
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
