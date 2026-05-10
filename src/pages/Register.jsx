import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phoneNumber: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch {
      setError('Gabim gjatë regjistrimit. Provoni përsëri.')
    } finally {
      setLoading(false)
    }
  }

  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        required={name !== 'phoneNumber'}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Krijo llogari</h2>
      <p className="text-slate-500 text-sm mb-6">Regjistrohu për të rezervuar termin</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {field('firstName', 'Emri', 'text', 'Emri')}
          {field('lastName', 'Mbiemri', 'text', 'Mbiemri')}
        </div>
        {field('email', 'Email', 'email', 'emri@example.com')}
        {field('password', 'Fjalëkalimi', 'password', '••••••••')}
        {field('phoneNumber', 'Numri i telefonit (opsional)', 'tel', '+383...')}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Duke u regjistruar...' : 'Regjistrohu'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Keni llogari?{' '}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Hyni këtu
        </Link>
      </p>
    </>
  )
}
