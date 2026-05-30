import api from './axiosInstance'

export const getInstitutionContext = () => api.get('/institutions/context')
export const searchInstitutions = (query) =>
  api.get('/institutions/search', { params: { query } })
export const getInstitutionById = (id) => api.get(`/institutions/${id}`)
