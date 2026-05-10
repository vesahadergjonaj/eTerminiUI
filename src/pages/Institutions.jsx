import { useState, useEffect } from 'react'
import { getInstitutions } from '../api/institutionsApi'

const mockInstitutions = [
  { id: '1', name: 'QKUK', city: 'Prishtinë', description: 'Qendra Klinike Universitare e Kosovës' },
  { id: '2', name: 'Policia e Kosovës', city: 'Prishtinë', description: 'Dokumente, patentë shoferi, pasaporta' },
  { id: '3', name: 'Komuna e Prishtinës', city: 'Prishtinë', description: 'Certifikata, dokumente civile' },
  { id: '4', name: 'Komuna e Gjakovës', city: 'Gjakovë', description: 'Certifikata, dokumente civile' },
  { id: '5', name: 'Komuna e Prizrenit', city: 'Prizren', description: 'Certifikata, dokumente civile' },
  { id: '6', name: 'Ministria e Shëndetësisë', city: 'Prishtinë', description: 'Shërbime shëndetësore' },
]

export default function Institutions() {
  const [institutions, setInstitutions] = useState(mockInstitutions)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const cities = [...new Set(mockInstitutions.map((i) => i.city))]

  const filtered = institutions.filter((inst) => {
    const matchSearch = inst.name.toLowerCase().includes(search.toLowerCase()) ||
      inst.description.toLowerCase().includes(search.toLowerCase())
    const matchCity = city ? inst.city === city : true
    return matchSearch && matchCity
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Institucionet</h1>
        <p className="text-slate-500 text-sm">Zgjidhni institucionin për të rezervuar termin</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Kërko institucion..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Të gjitha qytetet</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-400 py-16">Nuk u gjet asnjë institucion.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{inst.name}</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                  {inst.city}
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-4">{inst.description}</p>
              <button className="w-full text-center text-sm bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Rezervo termin
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
