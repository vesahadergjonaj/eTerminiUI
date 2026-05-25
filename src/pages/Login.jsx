import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, ArrowRight, Loader2, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
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
      <div className="mb-7">
        <h2 className="text-[1.75rem] font-bold text-slate-900 mb-1.5 tracking-tight">
          Mirë se vini!
        </h2>
        <p className="text-slate-500 text-sm">Hyni në llogarinë tuaj të eTermini</p>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Field label="Email" required>
          <input
            type="email" required value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="emri@example.com" className={inputCls}
          />
        </Field>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-700">
              <span>Fjalëkalimi</span><span className="text-red-500 ml-1">*</span>
            </label>
            <span className="text-xs text-blue-600 cursor-pointer hover:underline font-medium">E harruat?</span>
          </div>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'} required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className={`${inputCls} pr-11`}
            />
            <button
              type="button" onClick={() => setShowPass(v => !v)} tabIndex={-1}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
          <span className="relative shrink-0">
            <input
              type="checkbox" checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="peer sr-only"
            />
            <span className="w-[18px] h-[18px] rounded-md border-2 border-slate-300 bg-white peer-checked:bg-gradient-to-br peer-checked:from-blue-600 peer-checked:to-indigo-600 peer-checked:border-transparent group-hover:border-blue-400 transition-all flex items-center justify-center">
              <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
            </span>
          </span>
          <span className="text-sm text-slate-600">Më mbaj mend në këtë pajisje</span>
        </label>

        {/* CTA Button */}
        <button
          type="submit" disabled={loading}
          className="group relative w-full h-12 rounded-xl font-semibold text-sm text-white overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 mt-1"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-all duration-500 group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-violet-700" />
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 blur-lg opacity-50 group-hover:opacity-80 transition-opacity -z-10" />
          <span className="absolute inset-0 overflow-hidden rounded-xl">
            <span className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[400%] transition-transform duration-1000" />
          </span>
          <span className="relative flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Duke hyrë...
              </>
            ) : (
              <>
                Hyrje
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </span>
        </button>
      </form>

      <div className="mt-7 pt-5 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Nuk keni llogari?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Regjistrohu falas
          </Link>
        </p>
      </div>
    </>
  )
}

const inputCls =
  "w-full h-11 px-4 bg-white/60 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-2">
        <span>{label}</span>
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
