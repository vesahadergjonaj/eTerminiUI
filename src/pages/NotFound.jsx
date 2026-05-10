import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <p className="text-7xl font-bold text-blue-100 mb-4">404</p>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Faqja nuk u gjet</h1>
      <p className="text-slate-500 mb-8">Adresa që kërkuat nuk ekziston.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Kthehu në kryefaqe
      </Link>
    </div>
  )
}
