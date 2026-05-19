import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { usePing } from '../hooks/useTest'
import { getTenantsCount } from '../api/tenantsApi'

const categories = [
  { icon: '🏥', title: 'Spitalet & Klinika', desc: 'QKUK dhe spitalet rajonale', color: 'from-red-50 to-red-100 border-red-200', iconBg: 'bg-red-100' },
  { icon: '🚔', title: 'Policia e Kosovës', desc: 'Dokumente, patentë shoferi', color: 'from-blue-50 to-blue-100 border-blue-200', iconBg: 'bg-blue-100' },
  { icon: '🏛️', title: 'Komunat', desc: 'Certifikata civile & dokumente', color: 'from-amber-50 to-amber-100 border-amber-200', iconBg: 'bg-amber-100' },
  { icon: '🏢', title: 'Ministritë', desc: 'Shërbime qeveritare', color: 'from-emerald-50 to-emerald-100 border-emerald-200', iconBg: 'bg-emerald-100' },
  { icon: '🦷', title: 'Stomatologjia', desc: 'Klinika dentare publike', color: 'from-purple-50 to-purple-100 border-purple-200', iconBg: 'bg-purple-100' },
  { icon: '📋', title: 'Shërbime Sociale', desc: 'Asistencë sociale & pensione', color: 'from-sky-50 to-sky-100 border-sky-200', iconBg: 'bg-sky-100' },
]

const staticStats = [
  { value: '50+', label: 'Departamente' },
  { value: '1,000+', label: 'Termin në ditë' },
  { value: '0 min', label: 'Pritje në radhë' },
]

const steps = [
  { step: '01', title: 'Zgjidhni institucionin', desc: 'Kërkoni dhe zgjidhni institucionin ose spitalin e dëshiruar nga lista jonë.' },
  { step: '02', title: 'Zgjidhni shërbimin', desc: 'Zgjidhni departamentin dhe shërbimin specifik që ju nevojitet.' },
  { step: '03', title: 'Rezervoni terminin', desc: 'Zgjidhni datën dhe orën e disponueshme dhe konfirmoni rezervimin.' },
]

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00']

export default function Home() {
  const { status, loading: pingLoading } = usePing()
  const [tenantsCount, setTenantsCount] = useState(null)

  useEffect(() => {
    getTenantsCount().then(res => setTenantsCount(res.data)).catch(() => {})
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full mb-6">
                <span className={`w-1.5 h-1.5 rounded-full ${pingLoading ? 'bg-yellow-400 animate-pulse' : status ? 'bg-green-400' : 'bg-red-400'}`} />
                {pingLoading ? 'Duke kontrolluar...' : status ? 'Sistemi është aktiv' : 'Sistemi offline'}
              </div>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Rezervo terminin tuaj
                <span className="block text-blue-300">pa pritje në radhë</span>
              </h1>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                eTermini është platforma zyrtare digjitale për rezervimin e termineve në institucionet publike dhe shëndetësore të Kosovës.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/institutions"
                  className="bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Rezervo tani →
                </Link>
                <Link
                  to="/register"
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-all backdrop-blur"
                >
                  Krijo llogari
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/15">
                <div className="text-center">
                  <p className="text-white font-bold text-lg">{tenantsCount !== null ? tenantsCount : '...'}</p>
                  <p className="text-blue-300 text-xs">Institucione</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <p className="text-white font-bold text-lg">1,000+</p>
                  <p className="text-blue-300 text-xs">Termin/ditë</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="text-center">
                  <p className="text-white font-bold text-lg">0 min</p>
                  <p className="text-blue-300 text-xs">Pritje radhë</p>
                </div>
              </div>
            </div>

            {/* Right — floating booking card */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl w-[320px]">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/15">
                    <div className="w-11 h-11 bg-white/20 border border-white/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      🏥
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">QKUK – Kardiologji</p>
                      <p className="text-blue-300 text-xs">Prishtinë, Kosovë</p>
                    </div>
                  </div>

                  {/* Selected date */}
                  <div className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5 mb-4">
                    <span className="text-lg">📅</span>
                    <div>
                      <p className="text-white text-sm font-semibold">15 Qershor 2025, E Hënë</p>
                      <p className="text-blue-300 text-xs">Data e zgjedhur</p>
                    </div>
                  </div>

                  {/* Time slots */}
                  <p className="text-blue-300 text-xs font-medium uppercase tracking-wide mb-2">
                    Orari i disponueshëm
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {timeSlots.map((t, i) => (
                      <button
                        key={t}
                        className={`text-xs py-2 rounded-lg font-medium transition-all ${
                          i === 3
                            ? 'bg-white text-blue-700 shadow-sm'
                            : 'bg-white/10 text-blue-100 hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Doctor */}
                  <div className="flex items-center gap-2.5 bg-white/10 rounded-xl px-3 py-2.5 mb-4">
                    <span className="text-lg">👨‍⚕️</span>
                    <div>
                      <p className="text-white text-xs font-semibold">Dr. Besnik Krasniqi</p>
                      <p className="text-blue-300 text-xs">Kardiolog • 12 vjet eksperiencë</p>
                    </div>
                  </div>

                  <button className="w-full bg-white text-blue-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm">
                    Konfirmo terminin →
                  </button>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  Termin i konfirmuar
                </div>

                {/* Floating notification */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-700 text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                  <span className="text-base">🔔</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs">Kujtesë e dërguar</p>
                    <p className="text-slate-500 text-[10px]">1 ditë para terminit</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 20C480 40 240 10 0 30L0 60Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
            <p className="text-3xl font-bold text-blue-700 mb-1">
              {tenantsCount !== null ? tenantsCount : '...'}
            </p>
            <p className="text-slate-500 text-sm">Institucione</p>
          </div>
          {staticStats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center">
              <p className="text-3xl font-bold text-blue-700 mb-1">{s.value}</p>
              <p className="text-slate-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Shërbime sipas kategorisë</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Zgjidhni kategorinë e shërbimit që ju nevojitet dhe gjeni institucionin e duhur
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              to="/institutions"
              key={cat.title}
              className={`bg-gradient-to-br ${cat.color} border rounded-2xl p-6 hover:shadow-md transition-all hover:-translate-y-0.5 group`}
            >
              <div className={`w-12 h-12 ${cat.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {cat.icon}
              </div>
              <h3 className="font-semibold text-slate-800 text-lg mb-1 group-hover:text-blue-700 transition-colors">
                {cat.title}
              </h3>
              <p className="text-slate-500 text-sm">{cat.desc}</p>
              <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Shiko institucionet <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-100 py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Si funksionon?</h2>
            <p className="text-slate-500">Tre hapa të thjeshtë për të rezervuar terminin tuaj</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300" />
            {steps.map((item, i) => (
              <div key={item.step} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-slate-800 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gati për të rezervuar?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Regjistrohu falas dhe rezervo terminin tuaj të parë brenda 2 minutave.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg"
              >
                Regjistrohu falas
              </Link>
              <Link
                to="/institutions"
                className="border border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all"
              >
                Shiko institucionet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
