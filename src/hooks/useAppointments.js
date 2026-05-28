import { useState, useEffect, useCallback } from 'react'
import { getMyAppointments, cancelAppointment } from '../api/appointmentsApi'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancelling, setCancelling] = useState(null)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getMyAppointments()
      setAppointments(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.response?.data?.message || 'Nuk u ngarkuan terminet.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const cancel = useCallback(async (id) => {
    setCancelling(id)
    setError(null)
    try {
      await cancelAppointment(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
      return { ok: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Anulimi dështoi.'
      setError(msg)
      return { ok: false, error: msg }
    } finally {
      setCancelling(null)
    }
  }, [])

  return { appointments, loading, error, cancel, cancelling, refetch: fetchAppointments }
}
