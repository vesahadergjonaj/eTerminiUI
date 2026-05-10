import api from './axiosInstance'

export const getMyAppointments = () => api.get('/appointments/my')
export const cancelAppointment = (id) => api.put(`/appointments/${id}/cancel`)
