import { Link } from 'react-router-dom'
import { CalendarPlus, Ticket } from 'lucide-react'

export default function EmptyState({ filtered = false }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm text-center py-16 px-6">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Ticket className="w-7 h-7 text-blue-600" />
      </div>
      <p className="text-slate-800 font-semibold mb-1">
        {filtered ? 'Nuk ka termin në këtë kategori' : 'Nuk keni termine të rezervuara'}
      </p>
      <p className="text-slate-500 text-sm mb-6">
        {filtered ? 'Provo një filtër tjetër' : 'Rezervo terminin tënd të parë tani'}
      </p>
      {!filtered && (
        <Link
          to="/book"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-600/20"
        >
          <CalendarPlus className="w-4 h-4" />
          Rezervo termin
        </Link>
      )}
    </div>
  )
}
