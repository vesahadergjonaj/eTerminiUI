import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>
      <footer className="text-center text-sm text-slate-400 py-4 border-t border-slate-200">
        © 2026 eTermini — Rezervo terminin online
      </footer>
    </div>
  )
}
