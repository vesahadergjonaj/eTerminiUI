import api from './axiosInstance'

// Availability queries can be slow on the first hit after a cold DB connection —
// give the server room to answer instead of erroring out and rendering "no slots".
const AVAILABILITY_TIMEOUT_MS = 30000

export const getAvailableSlots = async ({ doctorId, date, durationMinutes = 30 }) => {
  const request = () =>
    api.get('/timeslots/available', {
      params: { doctorId, date, durationMinutes },
      timeout: AVAILABILITY_TIMEOUT_MS,
    })

  try {
    return await request()
  } catch (err) {
    const status = err.response?.status
    const isTransient = !err.response || status >= 500 || err.code === 'ECONNABORTED'
    if (!isTransient) throw err
    // One quick retry so a single flaky response doesn't surface as "no slots".
    return await request()
  }
}
