import api from './axiosInstance'

export const getCategories = () => api.get('/catalog/categories')
export const getCatalogInstitutions = (categoryId) =>
  api.get('/catalog/institutions', { params: { categoryId } })
export const getServices = ({ institutionId, categoryId } = {}) =>
  api.get('/catalog/services', { params: { institutionId, categoryId } })
export const getServiceById = (serviceId) => api.get(`/catalog/services/${serviceId}`)
export const getProviders = (serviceId) => api.get(`/catalog/services/${serviceId}/providers`)
