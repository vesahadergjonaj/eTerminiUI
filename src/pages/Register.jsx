import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getTenants } from '../api/tenantsApi'

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phoneNumber: '', tenantId: ''
  })
  const [tenants, setTenants] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getTenants()
      .then(({ data }) => {
        setTenants(data)
        if (data.length > 0) setForm(f => ({ ...f, tenantId: data[0].id }))
      })
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ ...form, tenantId: form.tenantId || null })
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.message
      setError(msg || 'Gabim gjatë regjistrimit. Provoni përsëri.')
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <>
      <div className="text-center mb-7">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Krijo llogari</h2>
        <p className="text-slate-500 text-sm">Regjistrohu falas dhe fillo të rezervosh termin</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Emri</label>
            <input
              type="text" required value={form.firstName} onChange={set('firstName')}
              placeholder="Emri"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mbiemri</label>
            <input
              type="text" required value={form.lastName} onChange={set('lastName')}
              placeholder="Mbiemri"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            type="email" required value={form.email} onChange={set('email')}
            placeholder="emri@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Fjalëkalimi</label>
          <input
            type="password" required value={form.password} onChange={set('password')}
            placeholder="Minimum 8 karaktere"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Numri i telefonit <span className="text-slate-400 font-normal">(opsional)</span>
          </label>
          <input
            type="tel" value={form.phoneNumber} onChange={set('phoneNumber')}
            placeholder="+383 4X XXX XXX"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {tenants.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Institucioni</label>
            <select
              required value={form.tenantId} onChange={set('tenantId')}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-700"
            >
              {tenants.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        )}

        <p className="text-xs text-slate-400 -mt-1">
          Duke u regjistruar, pranoni <span className="text-blue-600 cursor-pointer hover:underline">Kushtet e Shërbimit</span>.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm mt-1 disabled:opacity-60 transition-colors shadow-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Duke u regjistruar...
            </span>
          ) : 'Regjistrohu falas'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-5">
        Keni llogari?{' '}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Hyni këtu
        </Link>
      </p>
    </>
  )
}
