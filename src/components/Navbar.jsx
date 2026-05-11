import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    setDropdownOpen(false)
    setMenuOpen(false)
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors pb-0.5 ${
        isActive(to)
          ? 'text-white border-b-2 border-white'
          : 'text-blue-100 hover:text-white'
      }`}
    >
      {label}
    </Link>
  )

  const initials = user
    ? (user.fullName
        ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : user.email?.[0]?.toUpperCase() ?? '?')
    : '?'

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-blue-700 font-bold text-sm">eT</span>
            </div>
            <div className="leading-tight">
              <span className="text-white font-bold text-lg tracking-tight block leading-none">
                e<span className="text-blue-300">Termini</span>
              </span>
              <span className="text-blue-400 text-[10px] leading-none hidden sm:block">Kosovë</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLink('/', 'Kryefaqja')}
            {navLink('/institutions', 'Institucionet')}
            {user && navLink('/appointments', 'Terminet e mia')}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-blue-100 text-sm max-w-[120px] truncate">
                    {user.fullName || user.email}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-blue-300 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs text-slate-400">Identifikuar si</p>
                      <p className="text-sm font-semibold text-slate-700 truncate">
                        {user.fullName || user.email}
                      </p>
                    </div>
                    <Link
                      to="/appointments"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                    >
                      <span>📅</span> Terminet e mia
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors mt-1"
                    >
                      <span>🚪</span> Dilni
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
                >
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1 items-center">
              <span
                className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? 'w-5 rotate-45 translate-y-1.5' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? 'w-0 opacity-0' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? 'w-5 -rotate-45 -translate-y-1.5' : 'w-5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-blue-600/50 pt-3 pb-4 flex flex-col gap-1">
            <Link to="/" className={`text-sm px-3 py-2 rounded-lg transition-colors ${isActive('/') ? 'bg-white/15 text-white font-medium' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              Kryefaqja
            </Link>
            <Link to="/institutions" className={`text-sm px-3 py-2 rounded-lg transition-colors ${isActive('/institutions') ? 'bg-white/15 text-white font-medium' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
              Institucionet
            </Link>
            {user && (
              <Link to="/appointments" className={`text-sm px-3 py-2 rounded-lg transition-colors ${isActive('/appointments') ? 'bg-white/15 text-white font-medium' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}>
                Terminet e mia
              </Link>
            )}

            <div className="border-t border-blue-600/50 mt-2 pt-3 flex gap-2 px-1">
              {user ? (
                <>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <span className="text-blue-100 text-sm truncate">{user.fullName || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-white bg-white/15 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/25 transition-colors flex-shrink-0"
                  >
                    Dilni
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex-1 text-center text-sm text-white bg-white/15 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/25 transition-colors">
                    Hyrje
                  </Link>
                  <Link to="/register" className="flex-1 text-center text-sm text-blue-700 bg-white px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                    Regjistrohu
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
