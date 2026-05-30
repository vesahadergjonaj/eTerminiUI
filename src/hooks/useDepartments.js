import { useState, useEffect, useCallback } from 'react'
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../api/departmentsApi'

export function useDepartments() {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const fetchDepartments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getDepartments()
      setDepartments(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.response?.data?.message || 'Nuk u ngarkuan departamentet.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  const create = useCallback(async (payload) => {
    setSaving(true)
    try {
      const { data } = await createDepartment(payload)
      setDepartments((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)))
      return { ok: true, data }
    } catch (err) {
      const msg = err.response?.data?.message || 'Krijimi dështoi.'
      return { ok: false, error: msg }
    } finally {
      setSaving(false)
    }
  }, [])

  const update = useCallback(async (id, payload) => {
    setSaving(true)
    try {
      const { data } = await updateDepartment(id, payload)
      setDepartments((prev) =>
        prev.map((d) => (d.id === id ? data : d)).sort((a, b) => a.name.localeCompare(b.name))
      )
      return { ok: true, data }
    } catch (err) {
      const msg = err.response?.data?.message || 'Përditësimi dështoi.'
      return { ok: false, error: msg }
    } finally {
      setSaving(false)
    }
  }, [])

  const remove = useCallback(async (id) => {
    setDeleting(id)
    try {
      await deleteDepartment(id)
      setDepartments((prev) => prev.filter((d) => d.id !== id))
      return { ok: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Fshirja dështoi.'
      return { ok: false, error: msg }
    } finally {
      setDeleting(null)
    }
  }, [])

  return {
    departments,
    loading,
    error,
    saving,
    deleting,
    create,
    update,
    remove,
    refetch: fetchDepartments,
  }
}
