import { Outlet, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-slate-800 text-slate-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">eT</span>
                </div>
                <span className="text-white font-bold text-lg">eTermini</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Platforma digjitale për rezervimin e termineve në institucionet publike dhe shëndetësore të Kosovës.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Shërbimet</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/book" className="hover:text-white transition-colors">Rezervo termin</Link></li>
                <li><Link to="/appointments" className="hover:text-white transition-colors">Terminet e mia</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Regjistrohu</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">Institucione</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white transition-colors cursor-pointer">QKUK</li>
                <li className="hover:text-white transition-colors cursor-pointer">Policia e Kosovës</li>
                <li className="hover:text-white transition-colors cursor-pointer">Komunat</li>
                <li className="hover:text-white transition-colors cursor-pointer">Ministritë</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-slate-500 text-sm">© 2026 eTermini. Të gjitha të drejtat e rezervuara.</p>
            <p className="text-slate-600 text-xs">Republika e Kosovës — Shërbime Digjitale</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
