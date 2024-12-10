import { usePostApi } from '@/shared/utils/usePostApi'
import type { z } from 'zod'
import type { SigninSchema } from '../schemas/SigninSchema'

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`

export const useAuthApi = () => {
  const { execute, isLoading, error } = usePostApi()

  const signin = async (data: z.infer<typeof SigninSchema>) => {
    const endpoint = `${BASE_URL}/signin`

    return await execute(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return { isLoading, error, signin }
}
