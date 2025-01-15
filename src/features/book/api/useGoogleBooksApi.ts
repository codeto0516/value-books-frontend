import { useFetchApi } from '@/shared/utils/useFetchApi'
import { usePostApi } from '@/shared/utils/usePostApi'
import { useCallback, useMemo } from 'react'
import { mutate } from 'swr'

const BASE_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/books`
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

export const useFetchGoogleBooks = (keyword: string | null) => {
  const endpoint = useMemo(() => (keyword ? `${BASE_URL}/?q=${keyword}&key=${GOOGLE_API_KEY}` : null), [keyword])

  const { data, isLoading, error } = useFetchApi<any>(endpoint, {
    credentials: 'include'
  })

  const refetch = useCallback(() => {
    mutate<any>(endpoint)
  }, [endpoint])

  return { data, isLoading, error, refetch }
}

export const useGoogleBooksApi = () => {
  const { execute, isLoading, error } = usePostApi()

  const searchBooks = async (keyword: string) => {
    const endpoint = `${BASE_URL}/?q=${keyword}`

    return await execute(endpoint, {
      method: 'GET'
    })
  }

  return { isLoading, error, searchBooks }
}
