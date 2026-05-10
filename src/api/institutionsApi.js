import api from './axiosInstance'

export const getInstitutions = (params) => api.get('/institutions', { params })
export const getInstitutionById = (id) => api.get(`/institutions/${id}`)
