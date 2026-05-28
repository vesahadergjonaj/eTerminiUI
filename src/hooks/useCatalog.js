import { useEffect, useState } from 'react'
import {
  getCategories,
  getCatalogInstitutions,
  getServices,
  getProviders,
} from '../api/catalogApi'

function useAsyncList(fetcher, deps, enabled = true) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled) {
      setItems([])
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    fetcher()
      .then(({ data }) => {
        if (!cancelled) setItems(data || [])
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || 'Ngarkimi dështoi.')
          setItems([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { items, loading, error }
}

export function useCategories() {
  return useAsyncList(() => getCategories(), [])
}

export function useInstitutionsForCategory(categoryId) {
  return useAsyncList(
    () => getCatalogInstitutions(categoryId),
    [categoryId],
    Boolean(categoryId)
  )
}

export function useServicesForInstitution(institutionId, categoryId) {
  return useAsyncList(
    () => getServices({ institutionId, categoryId }),
    [institutionId, categoryId],
    Boolean(institutionId)
  )
}

export function useProvidersForService(serviceId) {
  return useAsyncList(
    () => getProviders(serviceId),
    [serviceId],
    Boolean(serviceId)
  )
}
