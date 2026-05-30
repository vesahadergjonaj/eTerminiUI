import api from './axiosInstance'

export const getStatistics = () => api.get('/statistics')
