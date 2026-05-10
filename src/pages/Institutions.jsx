import { useState, useMemo } from 'react'
import { useInstitutions } from '../hooks/useInstitutions'

const categoryIcons = {
  'Spital': '🏥', 'Polici': '🚔', 'Komunë': '🏛️', 'Ministri': '🏢',
}

const getIcon = (name = '') => {
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (name.includes(key)) return icon
  }
  return '🏛️'
}

export default function Institutions() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const { institutions, loading, error } = useInstitutions()

  const cities = useMemo(
    () => [...new Set(institutions.map((i) => i.city).filter(Boolean))],
    [institutions]
  )

  const filtered = useMemo(() =>
    institutions.filter((inst) => {
      const matchSearch =
        inst.name.toLowerCase().includes(search.toLowerCase()) ||
        (inst.description || '').toLowerCase().includes(search.toLowerCase())
      const matchCity = city ? inst.city === city : true
      return matchSearch && matchCity
    }),
    [institutions, search, city]
  )

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Institucionet</h1>
          <p className="text-blue-200">Zgjidhni institucionin dhe rezervoni terminin tuaj online</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Kërko institucion ose shërbim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 min-w-[160px]"
          >
            <option value="">📍 Të gjitha qytetet</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {(search || city) && (
            <button
              onClick={() => { setSearch(''); setCity('') }}
              className="text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Pastro
            </button>
          )}
        </div>

        {/* Results count */}
        {!loading && !error && (
          <p className="text-slate-500 text-sm mb-5">
            {filtered.length === 0 ? 'Nuk u gjet asnjë institucion' : `${filtered.length} institucione`}
            {city && <span className="text-blue-600"> në {city}</span>}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-full mb-1" />
                <div className="h-3 bg-slate-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-slate-500 text-lg">Nuk u gjet asnjë institucion.</p>
            <button onClick={() => { setSearch(''); setCity('') }} className="mt-4 text-blue-600 hover:underline text-sm">
              Pastro filtrat
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all group overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
                      {getIcon(inst.name)}
                    </div>
                    {inst.city && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        📍 {inst.city}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-800 text-base mb-1.5 group-hover:text-blue-700 transition-colors">
                    {inst.name}
                  </h3>
                  {inst.description && (
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{inst.description}</p>
                  )}
                </div>
                <div className="px-6 pb-5">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    Rezervo termin
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
