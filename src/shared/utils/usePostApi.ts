import { useState } from 'react'
import { useToggle } from 'react-use'

export interface PostApiOption {}

export const usePostApi = () => {
  const [isLoading, toggleLoading] = useToggle(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const clearSuccessMessage = () => setSuccess(() => null)

  const clearErrorMessage = () => setError(() => null)

  const execute = async <T>(url: string, config: RequestInit): Promise<false | T> => {
    clearSuccessMessage()
    clearErrorMessage()
    toggleLoading(true)

    try {
      const defaultConfig = {
        credentials: 'include' as RequestCredentials,
        ...config
      }

      if (!(defaultConfig.body instanceof FormData)) {
        defaultConfig.headers = {
          'Content-Type': 'application/json',

          CLOUD_FRONT_ACCESS: 'TRUE',
          ...config?.headers
        }
      }

      const res = await fetch(url, defaultConfig)

      const isJson = res.headers.get('Content-Type')?.includes('application/json')

      if (!res.ok) {
        if (isJson) {
          const { message } = await res.json()
          throw new Error(message)
        } else {
          throw new Error('An error occurred while processing the request. Please try again later.')
        }
      }

      const result = isJson ? await res.json() : true

      return result
    } catch (error) {
      if (error instanceof Error) {
        // Unauthorizedの場合
        if (error.message === 'Unauthorized') {
          const currentUrl = window.location.pathname
          const userType = currentUrl.includes('/system') ? 'superuser' : 'tenantuser'
          window.location.href = userType === 'superuser' ? '/system/login' : '/login'
        }
      }

      return false
    } finally {
      toggleLoading(false)
    }
  }

  return {
    isLoading,
    success,
    error,
    execute
  }
}
