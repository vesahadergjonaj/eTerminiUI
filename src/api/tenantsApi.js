import api from './axiosInstance'

export const getTenants = () => api.get('/tenants')
export const getTenantsCount = () => api.get('/tenants/count')
