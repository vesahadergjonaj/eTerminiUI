import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, ArrowRight, Loader2, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getTenants } from '../api/tenantsApi'

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phoneNumber: '', tenantId: ''
  })
  const [tenants, setTenants] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(true)
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
      await register(form)
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.message
      setError(msg || 'Gabim gjatë regjistrimit. Provoni përsëri.')
    } finally {
      setLoading(false)
    }
  }

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  // Password strength
  const pwStrength = (() => {
    const p = form.password
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  })()

  return (
    <>
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-[1.75rem] font-bold text-slate-900 mb-1.5 tracking-tight">
          Krijo llogari
        </h2>
        <p className="text-slate-500 text-sm">
          Regjistrohu falas dhe rezervo terminin e parë sot
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Emri" required>
            <input
              type="text" required value={form.firstName} onChange={set('firstName')}
              placeholder="Besnik" className={inputCls}
            />
          </Field>
          <Field label="Mbiemri" required>
            <input
              type="text" required value={form.lastName} onChange={set('lastName')}
              placeholder="Krasniqi" className={inputCls}
            />
          </Field>
        </div>

        <Field label="Email" required>
          <input
            type="email" required value={form.email} onChange={set('email')}
            placeholder="emri@example.com" className={inputCls}
          />
        </Field>

        <Field label="Fjalëkalimi" required>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'} required
              value={form.password} onChange={set('password')}
              placeholder="Minimum 8 karaktere"
              className={`${inputCls} pr-11`}
            />
            <button
              type="button" onClick={() => setShowPass(v => !v)} tabIndex={-1}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {form.password.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              {[1,2,3,4].map(i => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    pwStrength >= i
                      ? pwStrength <= 1 ? 'bg-red-400'
                        : pwStrength === 2 ? 'bg-amber-400'
                        : pwStrength === 3 ? 'bg-blue-500'
                        : 'bg-emerald-500'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
              <span className="text-[10px] font-medium ml-1 text-slate-500 uppercase tracking-wider">
                {pwStrength <= 1 ? 'I dobët' : pwStrength === 2 ? 'Mesatar' : pwStrength === 3 ? 'I mirë' : 'I fortë'}
              </span>
            </div>
          )}
        </Field>

        <Field label="Telefoni" optional>
          <input
            type="tel" value={form.phoneNumber} onChange={set('phoneNumber')}
            placeholder="+383 4X XXX XXX" className={inputCls}
          />
        </Field>

        {tenants.length > 0 && (
          <Field label="Institucioni" required>
            <div className="relative">
              <select
                required value={form.tenantId} onChange={set('tenantId')}
                className={`${inputCls} appearance-none pr-10 cursor-pointer`}
              >
                {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </Field>
        )}

        {/* Checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer group select-none">
          <span className="relative mt-0.5 shrink-0">
            <input
              type="checkbox" required
              checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
              className="peer sr-only"
            />
            <span className="w-[18px] h-[18px] rounded-md border-2 border-slate-300 bg-white peer-checked:bg-gradient-to-br peer-checked:from-blue-600 peer-checked:to-indigo-600 peer-checked:border-transparent group-hover:border-blue-400 transition-all flex items-center justify-center">
              <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
            </span>
          </span>
          <span className="text-xs text-slate-500 leading-relaxed">
            Pranoj{' '}
            <a className="text-blue-600 font-medium hover:underline cursor-pointer">Kushtet e Shërbimit</a>
            {' '}dhe{' '}
            <a className="text-blue-600 font-medium hover:underline cursor-pointer">Politikën e Privatësisë</a>
          </span>
        </label>

        {/* CTA Button */}
        <button
          type="submit" disabled={loading || !agreed}
          className="group relative w-full h-12 rounded-xl font-semibold text-sm text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5"
        >
          {/* Gradient background */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-all duration-500 group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-violet-700" />
          {/* Glow */}
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
          {/* Shimmer */}
          <span className="absolute inset-0 overflow-hidden rounded-xl">
            <span className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[400%] transition-transform duration-1000" />
          </span>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Duke u regjistruar...
              </>
            ) : (
              <>
                Regjistrohu falas
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </span>
        </button>
      </form>

      <div className="mt-7 pt-5 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Keni llogari?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Hyni këtu
          </Link>
        </p>
      </div>
    </>
  )
}

const inputCls =
  "w-full h-11 px-4 bg-white/60 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"

function Field({ label, required, optional, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-2">
        <span>{label}</span>
        {required && <span className="text-red-500 ml-1">*</span>}
        {optional && <span className="text-slate-400 font-normal ml-1.5">(opsional)</span>}
      </label>
      {children}
    </div>
  )
}
