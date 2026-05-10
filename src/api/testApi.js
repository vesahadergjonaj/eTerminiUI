import api from './axiosInstance'

export const ping = () => api.get('/test/ping')
export const getTestInstitutions = () => api.get('/test/institutions')
