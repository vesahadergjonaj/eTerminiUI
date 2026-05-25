import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  X,
  Building2,
  Hospital,
  Shield,
  Landmark,
  Briefcase,
  Stethoscope,
  HeartHandshake,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  Star,
  Users,
} from 'lucide-react'
import { useInstitutions } from '../hooks/useInstitutions'

const categoryFilters = [
  { label: 'Të gjitha', key: null, Icon: Building2 },
  { label: 'Spitalet',  key: 'Spital',  Icon: Hospital },
  { label: 'Policia',   key: 'Polici',  Icon: Shield },
  { label: 'Komunat',   key: 'Komunë',  Icon: Landmark },
  { label: 'Ministritë', key: 'Ministri', Icon: Briefcase },
  { label: 'Stomatologjia', key: 'Dentar', Icon: Stethoscope },
  { label: 'Sh. Sociale', key: 'Social', Icon: HeartHandshake },
]

const getCategoryConfig = (name = '') => {
  if (name.includes('Spital'))   return { Icon: Hospital,       accent: 'from-rose-500 to-red-600',     ring: 'ring-rose-200',     hover: 'hover:ring-rose-300',     tagBg: 'bg-rose-50 text-rose-700 border-rose-200',     tag: 'Shëndetësi' }
  if (name.includes('Polici'))   return { Icon: Shield,         accent: 'from-blue-500 to-indigo-600',  ring: 'ring-blue-200',     hover: 'hover:ring-blue-300',     tagBg: 'bg-blue-50 text-blue-700 border-blue-200',     tag: 'Siguri' }
  if (name.includes('Komunë'))   return { Icon: Landmark,       accent: 'from-amber-500 to-orange-600', ring: 'ring-amber-200',    hover: 'hover:ring-amber-300',    tagBg: 'bg-amber-50 text-amber-700 border-amber-200',  tag: 'Komunale' }
  if (name.includes('Ministri')) return { Icon: Briefcase,      accent: 'from-emerald-500 to-teal-600', ring: 'ring-emerald-200',  hover: 'hover:ring-emerald-300',  tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', tag: 'Qeveritare' }
  if (name.includes('Dentar'))   return { Icon: Stethoscope,    accent: 'from-violet-500 to-purple-600', ring: 'ring-violet-200',  hover: 'hover:ring-violet-300',   tagBg: 'bg-violet-50 text-violet-700 border-violet-200', tag: 'Dentare' }
  if (name.includes('Social'))   return { Icon: HeartHandshake, accent: 'from-sky-500 to-cyan-600',     ring: 'ring-sky-200',      hover: 'hover:ring-sky-300',      tagBg: 'bg-sky-50 text-sky-700 border-sky-200',         tag: 'Sociale' }
  return { Icon: Building2, accent: 'from-blue-600 to-indigo-600', ring: 'ring-blue-200', hover: 'hover:ring-blue-300', tagBg: 'bg-slate-50 text-slate-700 border-slate-200', tag: 'Institucion' }
}

export default function Institutions() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const { institutions, loading, error } = useInstitutions()

  const cities = useMemo(
    () => [...new Set(institutions.map((i) => i.city).filter(Boolean))].sort(),
    [institutions]
  )

  const filtered = useMemo(
    () =>
      institutions.filter((inst) => {
        const matchSearch =
          inst.name.toLowerCase().includes(search.toLowerCase()) ||
          (inst.description || '').toLowerCase().includes(search.toLowerCase())
        const matchCity = city ? inst.city === city : true
        const matchCategory = activeCategory ? inst.name.includes(activeCategory) : true
        return matchSearch && matchCity && matchCategory
      }),
    [institutions, search, city, activeCategory]
  )

  const hasFilters = search || city || activeCategory

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero Header ──────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900 text-white pb-28">
        {/* Orbs */}
        <div className="absolute -top-32 -right-20 w-[28rem] h-[28rem] bg-cyan-400/15 rounded-full blur-3xl orb-a pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] bg-violet-500/20 rounded-full blur-3xl orb-b pointer-events-none" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-blue-200/80 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Kryefaqja</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">Institucionet</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              Gjeni institucionin{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-transparent">
                që ju nevojitet
              </span>
            </h1>
            <p className="text-blue-100/80 text-base md:text-lg">
              Mbi <span className="font-semibold text-white">{institutions.length || '50'}</span> institucione publike dhe shëndetësore në një vend.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-20 relative z-10 pb-16">

        {/* Search + Filter Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-950/5 ring-1 ring-slate-200/80 p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Kërko institucion ose shërbim..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 pl-14 pr-12 text-base bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-14 pl-14 pr-12 text-base bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-700 cursor-pointer appearance-none min-w-[220px]"
              >
                <option value="">Të gjitha qytetet</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {hasFilters && (
              <button
                onClick={() => { setSearch(''); setCity(''); setActiveCategory(null) }}
                className="inline-flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-900 px-5 h-14 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 transition-all whitespace-nowrap font-semibold"
              >
                <X className="w-4 h-4" />
                Pastro filtrat
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-100 premium-scroll -mx-1 px-1">
            {categoryFilters.map(({ label, key, Icon }) => {
              const active = activeCategory === key
              return (
                <button
                  key={label}
                  onClick={() => setActiveCategory(key)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 text-sm px-5 h-11 rounded-xl font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 -translate-y-0.5'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results count */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-slate-600">
              {filtered.length === 0
                ? <span className="text-sm">Nuk u gjet asnjë institucion</span>
                : <>
                    <span className="text-xl font-bold text-slate-900">{filtered.length}</span>
                    <span className="text-sm ml-1.5">{filtered.length === 1 ? 'institucion' : 'institucione'}</span>
                    {city && <span className="text-sm text-blue-600 ml-1.5">në {city}</span>}
                  </>
              }
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 ring-1 ring-slate-200/80 animate-pulse">
                <div className="flex justify-between mb-5">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl" />
                  <div className="w-20 h-7 bg-slate-100 rounded-full" />
                </div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                <div className="h-4 bg-slate-100 rounded w-4/5 mb-6" />
                <div className="h-12 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-white rounded-3xl ring-1 ring-red-200 shadow-sm p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-red-500" />
            </div>
            <p className="text-slate-800 font-bold text-lg mb-1">Diçka shkoi keq</p>
            <p className="text-slate-500">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white rounded-3xl ring-1 ring-slate-200/80 shadow-sm py-20 px-6 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Search className="w-9 h-9 text-blue-600" />
            </div>
            <p className="text-slate-900 font-bold text-xl mb-2">Nuk u gjet asnjë institucion</p>
            <p className="text-slate-500 mb-7">Provoni të ndryshoni filtrat ose kërkimin</p>
            <button
              onClick={() => { setSearch(''); setCity(''); setActiveCategory(null) }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 h-11 rounded-xl transition-colors shadow-md shadow-blue-600/20"
            >
              Pastro të gjitha filtrat
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Grid — 2 columns for bigger cards */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((inst) => {
              const cfg = getCategoryConfig(inst.name)
              return (
                <article
                  key={inst.id}
                  className={`group relative bg-white rounded-3xl ring-1 ring-slate-200/80 ${cfg.hover} shadow-sm hover:shadow-2xl hover:shadow-blue-950/5 hover:-translate-y-1 transition-all overflow-hidden`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${cfg.accent}`} />

                  <div className="p-7">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.accent} flex items-center justify-center shadow-lg shadow-slate-900/10`}>
                        <cfg.Icon className="w-7 h-7 text-white" strokeWidth={2} />
                        <div className={`absolute -inset-2 bg-gradient-to-br ${cfg.accent} opacity-0 group-hover:opacity-30 blur-xl -z-10 rounded-2xl transition-opacity`} />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`inline-flex items-center text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cfg.tagBg}`}>
                          {cfg.tag}
                        </span>
                        {inst.city && (
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-50 ring-1 ring-slate-200 px-2.5 py-1 rounded-full font-medium">
                            <MapPin className="w-3 h-3" />
                            {inst.city}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title + description */}
                    <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-blue-700 transition-colors leading-tight">
                      {inst.name}
                    </h3>
                    {inst.description && (
                      <p className="text-slate-500 text-[15px] leading-relaxed mb-5 line-clamp-2">
                        {inst.description}
                      </p>
                    )}

                    {/* Meta strip */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-medium">E hapur sot</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-medium">4.8</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-medium">Pa pritje</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="group/btn relative w-full h-12 rounded-2xl font-semibold text-base text-white overflow-hidden transition-all">
                      <span className={`absolute inset-0 bg-gradient-to-r ${cfg.accent}`} />
                      <span className={`absolute -inset-1 bg-gradient-to-r ${cfg.accent} blur-lg opacity-0 group-hover/btn:opacity-60 transition-opacity -z-10`} />
                      <span className="absolute inset-0 overflow-hidden">
                        <span className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover/btn:translate-x-[400%] transition-transform duration-1000" />
                      </span>
                      <span className="relative flex items-center justify-center gap-2">
                        Rezervo termin
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
