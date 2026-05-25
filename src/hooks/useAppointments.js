import { useState, useEffect, useCallback } from 'react'
import { getMyAppointments, cancelAppointment } from '../api/appointmentsApi'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancelling, setCancelling] = useState(null)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    //console.log('Fetching appointments...');
    setError(null)
    try {
      const { data } = await getMyAppointments()
      setAppointments(data)
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
    try {
      await cancelAppointment(id)
      setAppointments((prev) =>
        prev.map((a) => a.id === id ? { ...a, status: 'Cancelled' } : a)
      )
    } catch (err) {
      setError(err.response?.data?.message || 'Anulimi dështoi.')
    } finally {
      setCancelling(null)
    }
  }, [])

  return { appointments, loading, error, cancel, cancelling, refetch: fetchAppointments }
}
