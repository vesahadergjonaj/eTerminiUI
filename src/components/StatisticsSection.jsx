import { MapPin, Building2, Users } from 'lucide-react'
import { useStatistics } from '../hooks/useStatistics'

const STATS_CONFIG = [
  {
    key: 'totalCities',
    label: 'Qytete të regjistruara',
    Icon: MapPin,
    accent: 'from-cyan-500 to-blue-600',
    glow: 'group-hover:opacity-25',
  },
  {
    key: 'totalInstitutions',
    label: 'Institucione të regjistruara',
    Icon: Building2,
    accent: 'from-indigo-500 to-violet-600',
    glow: 'group-hover:opacity-25',
  },
  {
    key: 'totalUsers',
    label: 'Përdorues të regjistruar',
    Icon: Users,
    accent: 'from-emerald-500 to-teal-600',
    glow: 'group-hover:opacity-25',
  },
]

function StatCard({ Icon, label, value, accent, glow, loading }) {
  return (
    <div className="group relative bg-white rounded-3xl ring-1 ring-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-7 flex flex-col items-center text-center overflow-hidden">
      <div className={`absolute -inset-px bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300 pointer-events-none`} />

      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-md mb-5`}>
        <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
        <div className={`absolute -inset-3 bg-gradient-to-br ${accent} opacity-0 ${glow} blur-xl -z-10 rounded-2xl transition-opacity duration-300`} />
      </div>

      <div className="min-h-[3.5rem] flex items-center justify-center mb-2">
        {loading ? (
          <div className="flex gap-1.5 items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        ) : (
          <p className="text-5xl font-bold text-slate-900 tracking-tight leading-none">
            {value ?? '—'}
          </p>
        )}
      </div>

      <p className="text-slate-500 text-sm font-medium leading-snug">{label}</p>
    </div>
  )
}

export default function StatisticsSection() {
  const { stats, loading } = useStatistics()

  return (
    <section className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Platforma në numra
        </h2>
        <p className="text-slate-500 text-sm md:text-base">
          Të dhëna reale nga sistemi i eTerminit
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {STATS_CONFIG.map(({ key, label, Icon, accent, glow }) => (
          <StatCard
            key={key}
            Icon={Icon}
            label={label}
            value={stats?.[key]}
            accent={accent}
            glow={glow}
            loading={loading}
          />
        ))}
      </div>
    </section>
  )
}
