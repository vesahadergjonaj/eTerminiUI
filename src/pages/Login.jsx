import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.message
      setError(msg || 'Email ose fjalëkalimi është i gabuar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center mb-7">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Mirë se vini!</h2>
        <p className="text-slate-500 text-sm">Hyni në llogarinë tuaj të eTermini</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="emri@example.com"
          />
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700">Fjalëkalimi</label>
            <span className="text-xs text-blue-600 cursor-pointer hover:underline">E harruat?</span>
          </div>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm mt-1 disabled:opacity-60 transition-colors shadow-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Duke hyrë...
            </span>
          ) : 'Hyrje'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400">ose</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <p className="text-center text-sm text-slate-500">
        Nuk keni llogari?{' '}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Regjistrohu falas
        </Link>
      </p>
    </>
  )
}
