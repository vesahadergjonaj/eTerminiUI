import { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
} from 'lucide-react'
import { useDepartments } from '../hooks/useDepartments'
import { getCatalogInstitutions } from '../api/catalogApi'

export default function Departments() {
  const { departments, loading, error, saving, deleting, create, update, remove, refetch } =
    useDepartments()

  const [institutions, setInstitutions] = useState([])
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    getCatalogInstitutions()
      .then(({ data }) => setInstitutions(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return departments
    return departments.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.institutionName?.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
    )
  }, [departments, search])

  const handleCreate = async (payload) => {
    setFormError(null)
    const result = await create(payload)
    if (result.ok) {
      setCreateOpen(false)
      setToast({ type: 'success', message: 'Departamenti u krijua me sukses.' })
    } else {
      setFormError(result.error)
    }
  }

  const handleUpdate = async (payload) => {
    if (!editTarget) return
    setFormError(null)
    const result = await update(editTarget.id, payload)
    if (result.ok) {
      setEditTarget(null)
      setToast({ type: 'success', message: 'Departamenti u përditësua me sukses.' })
    } else {
      setFormError(result.error)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    const result = await remove(deleteTarget.id)
    setDeleteTarget(null)
    if (result.ok) {
      setToast({ type: 'success', message: 'Departamenti u fshi me sukses.' })
    } else {
      setToast({ type: 'error', message: result.error })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <header className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Departamentet</h1>
          <p className="text-slate-500 text-sm">Menaxho departamentet e institucionit tënd.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refetch}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Rifresko
          </button>
          <button
            onClick={() => {
              setFormError(null)
              setCreateOpen(true)
            }}
            className="inline-flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-xl font-semibold transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Shto departament
          </button>
        </div>
      </header>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Kërko departament..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
        />
      </div>

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-5 py-4 mb-6 flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Building2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">
            {search ? 'Nuk u gjet asnjë departament.' : 'Nuk ka departamente të shtuara ende.'}
          </p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 text-slate-500 font-medium">Emri</th>
                <th className="text-left px-5 py-3.5 text-slate-500 font-medium hidden sm:table-cell">
                  Institucioni
                </th>
                <th className="text-left px-5 py-3.5 text-slate-500 font-medium hidden md:table-cell">
                  Përshkrimi
                </th>
                <th className="text-left px-5 py-3.5 text-slate-500 font-medium">Statusi</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((dept) => (
                <tr key={dept.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-800">{dept.name}</td>
                  <td className="px-5 py-4 text-slate-600 hidden sm:table-cell">
                    {dept.institutionName || '—'}
                  </td>
                  <td className="px-5 py-4 text-slate-500 hidden md:table-cell max-w-xs truncate">
                    {dept.description || '—'}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        dept.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {dept.isActive ? 'Aktiv' : 'Joaktiv'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setFormError(null)
                          setEditTarget(dept)
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ndrysho"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(dept)}
                        disabled={deleting === dept.id}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Fshi"
                      >
                        {deleting === dept.id ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {createOpen && (
        <DepartmentModal
          title="Shto departament"
          institutions={institutions}
          saving={saving}
          error={formError}
          onSubmit={handleCreate}
          onClose={() => {
            setCreateOpen(false)
            setFormError(null)
          }}
        />
      )}

      {editTarget && (
        <DepartmentModal
          title="Ndrysho departamentin"
          initial={editTarget}
          institutions={institutions}
          saving={saving}
          error={formError}
          onSubmit={handleUpdate}
          onClose={() => {
            setEditTarget(null)
            setFormError(null)
          }}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Fshi departamentin?"
          message={`Jeni i sigurt që dëshironi të fshini departamentin "${deleteTarget.name}"? Ky veprim nuk mund të zhbëhet.`}
          confirmLabel="Po, fshi"
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  )
}

function DepartmentModal({ title, initial, institutions, saving, error, onSubmit, onClose }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [institutionId, setInstitutionId] = useState(initial?.institutionId ?? '')
  const [isActive, setIsActive] = useState(initial?.isActive ?? true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      institutionId,
      isActive,
    }
    onSubmit(payload)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Emri <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={200}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="p.sh. Departamenti i Shëndetit"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Përshkrimi</label>
            <textarea
              rows={3}
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Përshkrim i shkurtër i departamentit..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Institucioni <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={institutionId}
              onChange={(e) => setInstitutionId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors bg-white"
            >
              <option value="">Zgjedh institucionin...</option>
              {institutions.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          {initial && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => setIsActive((v) => !v)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                  isActive ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                    isActive ? 'translate-x-4.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className="text-sm text-slate-700">Aktiv</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Anulo
            </button>
            <button
              type="submit"
              disabled={saving}
              className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 inline-flex items-center gap-2"
            >
              {saving && (
                <div className="w-3.5 h-3.5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              )}
              {initial ? 'Ruaj ndryshimet' : 'Shto departamentin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
        <p className="text-sm text-slate-600 mb-5">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="h-10 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Jo, kthehu
          </button>
          <button
            onClick={onConfirm}
            className="h-10 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function Toast({ type, message, onClose }) {
  const styles = type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
  const Icon = type === 'success' ? CheckCircle2 : XCircle

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg ${styles}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
