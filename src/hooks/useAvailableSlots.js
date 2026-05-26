import { useState, useEffect } from 'react'
import { getAvailableSlots } from '../api/timeslotsApi'

export function useAvailableSlots({ doctorId, date, durationMinutes = 30 }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!doctorId || !date) {
      setSlots([])
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    getAvailableSlots({ doctorId, date, durationMinutes })
      .then(({ data }) => {
        if (!cancelled) setSlots(data || [])
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Nuk u ngarkuan terminet e lira.')
          setSlots([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [doctorId, date, durationMinutes, reloadKey])

  return { slots, loading, error, refetch: () => setReloadKey((k) => k + 1) }
}
