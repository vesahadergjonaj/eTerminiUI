import { Outlet, Link } from 'react-router-dom'
import { Zap, ShieldCheck, BadgeCheck, Sparkles } from 'lucide-react'

const features = [
  {
    Icon: Zap,
    title: 'Pa pritje në radhë',
    desc: 'Rezervim instant për çdo institucion',
  },
  {
    Icon: BadgeCheck,
    title: 'Konfirmim i menjëhershëm',
    desc: 'Bileta digjitale brenda sekondave',
  },
  {
    Icon: ShieldCheck,
    title: '100% falas & i sigurt',
    desc: 'Të dhënat e mbrojtura me enkriptim',
  },
]

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* ── LEFT PANEL ─────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[48%] shrink-0 relative overflow-hidden bg-[#0b1437]">
        {/* Animated gradient base */}
        <div className="absolute inset-0 animated-gradient bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-900" />

        {/* Floating orbs */}
        <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-blue-500/30 blur-[120px] orb-a" />
        <div className="absolute top-1/3 -left-32 w-[26rem] h-[26rem] rounded-full bg-violet-500/30 blur-[120px] orb-b" />
        <div className="absolute -bottom-32 right-1/4 w-[24rem] h-[24rem] rounded-full bg-cyan-400/15 blur-[120px] orb-c" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.04] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full flex flex-col p-12 xl:p-16">
          {/* Top: Logo */}
          <Link to="/" className="flex items-center gap-2.5 group w-fit">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-white to-blue-50 flex items-center justify-center shadow-2xl shadow-blue-950/30 group-hover:scale-105 transition-transform">
              <span className="text-indigo-700 font-bold text-base tracking-tight">eT</span>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/40 to-violet-400/40 rounded-2xl blur-md -z-10 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="text-white font-bold text-xl tracking-tight block leading-none">eTermini</span>
              <span className="text-blue-300/70 text-[10px] tracking-widest uppercase">Republika e Kosovës</span>
            </div>
          </Link>

          {/* Middle: Hero */}
          <div className="flex-1 flex flex-col justify-center max-w-lg my-12 fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full w-fit mb-7 shadow-lg shadow-blue-950/20">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Platforma Zyrtare Digjitale</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400 ml-1 animate-pulse" />
            </div>

            {/* Headline */}
            <h1 className="text-white text-[2.5rem] xl:text-5xl font-bold leading-[1.05] tracking-tight mb-5">
              Rezervo terminin tuaj <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-transparent">
                pa pritje në radhë
              </span>
            </h1>
            <p className="text-blue-100/70 text-base xl:text-lg leading-relaxed mb-10 max-w-md">
              Shëndetësi, polici, komuna, ministri — të gjitha institucionet publike në një vend.
            </p>

            {/* Glassmorphism feature cards */}
            <div className="space-y-3">
              {features.map(({ Icon, title, desc }, i) => (
                <div
                  key={title}
                  className="group relative flex items-start gap-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-950/40"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {/* Icon with gradient ring */}
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-4.5 h-4.5 text-cyan-200" strokeWidth={2} />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/0 to-violet-400/0 group-hover:from-cyan-400/20 group-hover:to-violet-400/20 transition-colors" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-white text-sm font-semibold leading-tight">{title}</p>
                    <p className="text-blue-200/60 text-xs mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Footer stats */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex items-center gap-6">
              <Stat value="50+" label="Institucione" />
              <div className="w-px h-8 bg-white/10" />
              <Stat value="1,000+" label="Termine/ditë" />
              <div className="w-px h-8 bg-white/10" />
              <Stat value="0 min" label="Pritje" />
            </div>
            <p className="text-blue-300/40 text-[10px] tracking-wider">© 2026 eTermini</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-12 overflow-y-auto premium-scroll relative bg-slate-50">
        {/* Subtle background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden relative z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <span className="text-white font-bold text-sm">eT</span>
          </div>
          <span className="text-slate-900 font-bold text-xl tracking-tight">eTermini</span>
        </Link>

        {/* Form card with subtle glass */}
        <div className="w-full max-w-md relative z-10 fade-in">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] ring-1 ring-slate-200/80 px-10 sm:px-12 py-10 sm:py-12">
            <Outlet />
          </div>

          {/* Tiny trust line below card */}
          <p className="text-center text-slate-400 text-xs mt-6 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Lidhje e mbrojtur me enkriptim 256-bit
          </p>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-white font-bold text-base leading-none">{value}</p>
      <p className="text-blue-300/60 text-[10px] uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}
