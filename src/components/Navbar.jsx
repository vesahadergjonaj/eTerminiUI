import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          e<span className="text-blue-200">Termini</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors">Kryefaqja</Link>
          <Link to="/institutions" className="hover:text-blue-200 transition-colors">Institucionet</Link>
          {user && (
            <Link to="/appointments" className="hover:text-blue-200 transition-colors">Terminet e mia</Link>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="text-blue-200">
                {user.fullName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-3 py-1.5 rounded font-semibold hover:bg-blue-50 transition-colors"
              >
                Dilni
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 transition-colors">Hyrje</Link>
              <Link
                to="/register"
                className="bg-white text-blue-700 px-3 py-1.5 rounded font-semibold hover:bg-blue-50 transition-colors"
              >
                Regjistrohu
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
