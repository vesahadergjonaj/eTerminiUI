import { useState, useEffect } from 'react'
import { ping, getTestInstitutions } from '../api/testApi'

export function usePing() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    ping()
      .then(({ data }) => setStatus(data))
      .catch(() => setError('API nuk është e arritshme.'))
      .finally(() => setLoading(false))
  }, [])

  return { status, loading, error }
}

export function useTestInstitutions() {
  const [institutions, setInstitutions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTestInstitutions()
      .then(({ data }) => setInstitutions(data))
      .catch(() => setError('Nuk u ngarkuan institucionet nga API.'))
      .finally(() => setLoading(false))
  }, [])

  return { institutions, loading, error }
}
