import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        isActive(to)
          ? 'text-white border-b-2 border-white pb-0.5'
          : 'text-blue-100 hover:text-white'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-blue-700 font-bold text-sm">eT</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              e<span className="text-blue-200">Termini</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLink('/', 'Kryefaqja')}
            {navLink('/institutions', 'Institucionet')}
            {user && navLink('/appointments', 'Terminet e mia')}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    {(user.fullName || user.email || '?')[0].toUpperCase()}
                  </div>
                  <span className="text-blue-100 text-sm">{user.fullName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-1.5 rounded-lg border border-white/20 transition-colors"
                >
                  Dilni
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-100 hover:text-white text-sm font-medium transition-colors">
                  Hyrje
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
                >
                  Regjistrohu
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-0.5 bg-white mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-white mb-1" />
            <div className="w-5 h-0.5 bg-white transition-all" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 flex flex-col gap-3 border-t border-blue-600">
            <Link to="/" className="text-blue-100 hover:text-white text-sm px-2" onClick={() => setMenuOpen(false)}>Kryefaqja</Link>
            <Link to="/institutions" className="text-blue-100 hover:text-white text-sm px-2" onClick={() => setMenuOpen(false)}>Institucionet</Link>
            {user && <Link to="/appointments" className="text-blue-100 hover:text-white text-sm px-2" onClick={() => setMenuOpen(false)}>Terminet e mia</Link>}
            <div className="flex gap-2 px-2 pt-1">
              {user ? (
                <button onClick={handleLogout} className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg">Dilni</button>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg" onClick={() => setMenuOpen(false)}>Hyrje</Link>
                  <Link to="/register" className="text-sm text-white bg-white/20 px-4 py-2 rounded-lg" onClick={() => setMenuOpen(false)}>Regjistrohu</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
