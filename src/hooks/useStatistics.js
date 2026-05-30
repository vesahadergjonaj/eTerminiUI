import { useState, useEffect } from 'react'
import { getStatistics } from '../api/statisticsApi'

export function useStatistics() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getStatistics()
      .then((res) => setStats(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}
