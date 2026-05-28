import { useEffect } from 'react'
import { useAvailableSlots } from './useAvailableSlots'
import { subscribeToSlotUpdates } from '../realtime/appointmentsHub'

const matchesGroup = (payload, doctorId, date) => {
  if (!payload || !doctorId || !date) return false
  const samedoctor = String(payload.doctorId).toLowerCase() === String(doctorId).toLowerCase()
  if (!samedoctor) return false
  const incomingDate = String(payload.date).slice(0, 10)
  return incomingDate === date
}

export function useLiveAvailableSlots({ doctorId, date, durationMinutes = 30 }) {
  const result = useAvailableSlots({ doctorId, date, durationMinutes })
  const { refetch } = result

  useEffect(() => {
    if (!doctorId || !date) return

    let unsubscribe = null
    const handler = (payload) => {
      if (matchesGroup(payload, doctorId, date)) {
        refetch()
      }
    }

    const subscribe = async () => {
      unsubscribe = await subscribeToSlotUpdates({ doctorId, date }, handler)
    }
    subscribe()

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [doctorId, date, refetch])

  return result
}
