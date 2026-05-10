import { Link } from 'react-router-dom'
import { usePing } from '../hooks/useTest'

const categories = [
  { icon: '🏥', title: 'Spitalet & Klinika', desc: 'QKUK dhe spitalet rajonale', color: 'from-red-50 to-red-100 border-red-200', iconBg: 'bg-red-100' },
  { icon: '🚔', title: 'Policia e Kosovës', desc: 'Dokumente, patentë shoferi', color: 'from-blue-50 to-blue-100 border-blue-200', iconBg: 'bg-blue-100' },
  { icon: '🏛️', title: 'Komunat', desc: 'Certifikata civile & dokumente', color: 'from-amber-50 to-amber-100 border-amber-200', iconBg: 'bg-amber-100' },
  { icon: '🏢', title: 'Ministritë', desc: 'Shërbime qeveritare', color: 'from-emerald-50 to-emerald-100 border-emerald-200', iconBg: 'bg-emerald-100' },
  { icon: '🦷', title: 'Stomatologjia', desc: 'Klinika dentare publike', color: 'from-purple-50 to-purple-100 border-purple-200', iconBg: 'bg-purple-100' },
  { icon: '📋', title: 'Shërbime Sociale', desc: 'Asistencë sociale & pensione', color: 'from-sky-50 to-sky-100 border-sky-200', iconBg: 'bg-sky-100' },
]

const stats = [
  { value: '20+', label: 'Institucione' },
  { value: '50+', label: 'Departamente' },
  { value: '1,000+', label: 'Termin në ditë' },
  { value: '0 min', label: 'Pritje në radhë' },
]

const steps = [
  { step: '01', title: 'Zgjidhni institucionin', desc: 'Kërkoni dhe zgjidhni institucionin ose spitalin e dëshiruar nga lista jonë.' },
  { step: '02', title: 'Zgjidhni shërbimin', desc: 'Zgjidhni departamentin dhe shërbimin specifik që ju nevojitet.' },
  { step: '03', title: 'Rezervoni terminin', desc: 'Zgjidhni datën dhe orën e disponueshme dhe konfirmoni rezervimin.' },
]

export default function Home() {
  const { status, loading: pingLoading } = usePing()

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            {/* API badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full mb-6">
              <span className={`w-1.5 h-1.5 rounded-full ${pingLoading ? 'bg-yellow-400 animate-pulse' : status ? 'bg-green-400' : 'bg-red-400'}`} />
              {pingLoading ? 'Duke kontrolluar...' : status ? 'Sistemi është aktiv' : 'Sistemi offline'}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Rezervo terminin tuaj
              <span className="block text-blue-300">pa pritje në radhë</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
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
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 20C480 40 240 10 0 30L0 60Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-2 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
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
          <p className="text-slate-500 max-w-lg mx-auto">Zgjidhni kategorinë e shërbimit që ju nevojitet dhe gjeni institucionin e duhur</p>
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
              <h3 className="font-semibold text-slate-800 text-lg mb-1 group-hover:text-blue-700 transition-colors">{cat.title}</h3>
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl">
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
      </section>
    </div>
  )
}
