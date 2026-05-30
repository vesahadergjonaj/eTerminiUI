import { useState, useEffect } from 'react'
import { searchInstitutions } from '../api/institutionsApi'

export function useInstitutionSearch(query) {
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const trimmed = query.trim()

    if (trimmed.length < 2) {
      setResults([])
      setSearching(false)
      return
    }

    setSearching(true)

    const timer = setTimeout(async () => {
      try {
        const { data } = await searchInstitutions(trimmed)
        setResults(Array.isArray(data) ? data : [])
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  return { results, searching }
}
