import { useCallback } from 'react'
import type { SWRConfiguration } from 'swr'
import useSWR, { mutate } from 'swr'

const fetcher = async (url: string, config?: RequestInit) => {
  try {
    const res = await fetch(url, config)

    const isJson = res.headers.get('Content-Type')?.includes('application/json')

    if (!res.ok) {
      if (isJson) {
        const { message } = await res.json()
        throw new Error(message)
      } else {
        throw new Error('An error occurred while processing the request. Please try again later.')
      }
    }

    return isJson ? await res.json() : true
  } catch (error) {
    if (error instanceof Error) {
      // Unauthorizedの場合
      if (error.message === 'Unauthorized') {
        window.location.href = '/signin'
      }
    }
  }
}

export const useFetchApi = <T>(endpoint: string | null, config?: RequestInit, SWRConfig?: SWRConfiguration) => {
  const defaultConfig: RequestInit = {
    method: 'GET',
    credentials: 'include' as RequestCredentials,
    ...config,
    headers: {
      'Content-Type': 'application/json',

      ...config?.headers
    }
  }

  const defaultSWRConfig: SWRConfiguration = {
    errorRetryCount: 0,

    // errorRetryInterval: 3000,
    revalidateOnFocus: false,
    ...SWRConfig
  }

  const { data, error, isLoading } = useSWR<T>(endpoint, () => fetcher(endpoint ?? '', defaultConfig), defaultSWRConfig)

  const refetch = useCallback(() => () => mutate(endpoint), [endpoint])

  return {
    data,
    refetch,
    error,
    isLoading
  }
}
