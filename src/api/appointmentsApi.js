import api from './axiosInstance'

export const getMyAppointments = () => api.get('/appointments/my')
export const cancelAppointment = (id) => api.delete(`/appointments/${id}`)
export const createAppointment = (payload) => api.post('/appointments', payload)
