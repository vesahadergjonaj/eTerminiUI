import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex flex-col items-center justify-center px-4">
      <Link to="/" className="text-3xl font-bold text-blue-700 mb-8">
        e<span className="text-blue-400">Termini</span>
      </Link>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <Outlet />
      </div>
      <p className="text-slate-400 text-sm mt-6">© 2026 eTermini</p>
    </div>
  )
}
