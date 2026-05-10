import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex flex-col items-center justify-center px-4 py-12">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
          <span className="text-blue-700 font-bold">eT</span>
        </div>
        <span className="text-white font-bold text-2xl">e<span className="text-blue-300">Termini</span></span>
      </Link>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <Outlet />
      </div>
      <p className="text-blue-300 text-sm mt-6">© 2026 eTermini — Republika e Kosovës</p>
    </div>
  )
}
