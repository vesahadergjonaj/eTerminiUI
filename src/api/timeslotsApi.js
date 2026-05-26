import api from './axiosInstance'

export const getAvailableSlots = ({ doctorId, date, durationMinutes = 30 }) =>
  api.get('/timeslots/available', {
    params: { doctorId, date, durationMinutes },
  })
