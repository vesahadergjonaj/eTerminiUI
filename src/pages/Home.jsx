import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Calendar, ArrowRight, Loader2, Plus, Building2,
  Search, MapPin, X, CornerDownLeft, Sparkles,
  Zap, ShieldCheck, BadgeCheck,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../hooks/useAppointments'
import { useInstitutions } from '../hooks/useInstitutions'

const isActive = (s) => s === 'Pending' || s === 'Confirmed'

export default function Home() {
  const { user } = useAuth()
  return user ? <AuthedHome /> : <GuestHome />
}

/* ─────────────────────────────────────────────────────────
   GUEST — landing page (without API calls that need auth)
   ───────────────────────────────────────────────────────── */
function GuestHome() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero with gradient */}
      <section className="relative bg-gradient-to-br from-blue-700 via-indigo-800 to-violet-900 text-white">
        <div className="absolute -top-32 -right-20 w-[28rem] h-[28rem] bg-cyan-400/15 rounded-full blur-3xl orb-a pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[26rem] h-[26rem] bg-violet-500/20 rounded-full blur-3xl orb-b pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-7">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            Platforma Zyrtare Digjitale · Republika e Kosovës
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
            Rezervo terminin tuaj{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-transparent">
              pa pritje në radhë
            </span>
          </h1>
          <p className="text-blue-100/80 text-base md:text-lg max-w-2xl mx-auto mb-9">
            Shëndetësi, polici, komuna, ministri — të gjitha institucionet publike në një vend.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="group relative inline-flex items-center gap-2 h-12 px-7 rounded-2xl font-semibold text-sm overflow-hidden transition-all hover:-translate-y-0.5 bg-white text-blue-700 shadow-xl shadow-blue-950/30"
            >
              <span className="relative flex items-center gap-2">
                Krijo llogari falas
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur transition-colors"
            >
              Hyni në llogari
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            Icon={Zap}
            title="Pa pritje në radhë"
            desc="Rezervim instant për çdo institucion publik në Kosovë."
            accent="from-amber-500 to-orange-600"
          />
          <FeatureCard
            Icon={BadgeCheck}
            title="Konfirmim i menjëhershëm"
            desc="Bileta digjitale me QR brenda sekondave nga konfirmimi."
            accent="from-emerald-500 to-teal-600"
          />
          <FeatureCard
            Icon={ShieldCheck}
            title="100% falas & i sigurt"
            desc="Të dhënat e mbrojtura me enkriptim 256-bit."
            accent="from-blue-500 to-indigo-600"
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ Icon, title, desc, accent }) {
  return (
    <div className="group bg-white rounded-3xl ring-1 ring-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-6">
      <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-md mb-5`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
        <div className={`absolute -inset-2 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-30 blur-xl -z-10 rounded-2xl transition-opacity`} />
      </div>
      <h3 className="font-bold text-slate-900 text-lg mb-1.5 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   AUTHED — dashboard for logged-in users
   ───────────────────────────────────────────────────────── */
function AuthedHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { appointments, loading: aptLoading } = useAppointments()
  const { institutions, loading: instLoading } = useInstitutions()

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  const activeCount = appointments.filter((a) => isActive(a.status)).length

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return institutions
      .filter((i) =>
        i.name.toLowerCase().includes(q) ||
        (i.city || '').toLowerCase().includes(q) ||
        (i.description || '').toLowerCase().includes(q)
      )
      .slice(0, 6)
  }, [institutions, query])

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const goToInstitution = (inst) => {
    navigate(`/book?institutionId=${inst.id}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
      {/* Welcome + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Mirë se vini{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}
          </h1>
          <p className="text-slate-500 text-sm mt-1">Përmbledhje e shpejtë e termineve tuaja</p>
        </div>

        <Link
          to="/book"
          className="group relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl font-semibold text-sm text-white overflow-hidden transition-all hover:-translate-y-0.5 self-start sm:self-end"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 transition-all duration-500 group-hover:from-blue-700 group-hover:via-indigo-700 group-hover:to-violet-700" />
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 blur-lg opacity-40 group-hover:opacity-70 transition-opacity -z-10" />
          <span className="absolute inset-0 overflow-hidden rounded-2xl">
            <span className="absolute inset-y-0 -left-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-[400%] transition-transform duration-1000" />
          </span>
          <span className="relative flex items-center gap-2">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Rezervo termin
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      {/* Active appointments card */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-3xl overflow-hidden shadow-xl shadow-blue-900/20 mb-8">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-7">
          <div className="flex items-center justify-between mb-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-100/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Termine aktuale
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex items-end gap-3 mb-2">
            {aptLoading ? (
              <Loader2 className="w-10 h-10 text-white/70 animate-spin" />
            ) : (
              <p className="text-white font-bold text-6xl leading-none tracking-tight">
                {activeCount}
              </p>
            )}
            {!aptLoading && (
              <p className="text-blue-100/80 text-sm pb-2">
                {activeCount === 1 ? 'termin aktiv' : 'termine aktive'}
              </p>
            )}
          </div>

          <Link
            to="/appointments"
            className="inline-flex items-center gap-1.5 text-white text-sm font-semibold mt-6 hover:gap-2.5 transition-all"
          >
            Shiko të gjitha
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Search section */}
      <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-200/80 p-6 sm:p-8">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Çfarë po kërkoni sot?
          </h2>
          <p className="text-slate-500 text-sm">
            Kërkoni institucionin për të rezervuar terminin tuaj
          </p>
        </div>

        <div ref={wrapRef} className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && matches[0]) goToInstitution(matches[0])
              if (e.key === 'Escape') setOpen(false)
            }}
            placeholder="p.sh. QKUK, Komuna e Prishtinës, Stomatologji..."
            className="w-full h-14 pl-14 pr-12 text-base bg-slate-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setOpen(false) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {open && query.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden z-30 fade-in">
              {instLoading ? (
                <div className="p-5 flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Duke kërkuar...
                </div>
              ) : matches.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-800 text-sm font-semibold mb-1">
                    Asnjë institucion s'u gjet
                  </p>
                  <p className="text-slate-500 text-xs">
                    Mund të mos jetë i mbështetur ende terminin në institucionin që po kërkoni
                  </p>
                </div>
              ) : (
                <>
                  <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {matches.length} rezultat{matches.length === 1 ? '' : 'e'}
                    </span>
                  </div>
                  <ul className="max-h-80 overflow-y-auto premium-scroll">
                    {matches.map((inst, i) => (
                      <li key={inst.id}>
                        <button
                          type="button"
                          onClick={() => goToInstitution(inst)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                              {inst.name}
                            </p>
                            {inst.city && (
                              <span className="inline-flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                <MapPin className="w-3 h-3" />
                                {inst.city}
                              </span>
                            )}
                          </div>
                          {i === 0 && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md ring-1 ring-slate-200">
                              <CornerDownLeft className="w-3 h-3" />
                              Enter
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
