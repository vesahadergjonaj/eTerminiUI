import { useState, useEffect } from 'react'
import { getInstitutions } from '../api/institutionsApi'

export function useInstitutions(params) {
  const [institutions, setInstitutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
//Comment Leoni
    const fetch = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await getInstitutions(params)
        if (!cancelled) setInstitutions(data)
      } catch (err) {
        if (!cancelled)
          setError(err.response?.data?.message || 'Nuk u ngarkuan institucionet.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [JSON.stringify(params)])

  return { institutions, loading, error }
}
