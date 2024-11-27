import type { Metadata } from 'next'

import { getServerMode } from '@core/utils/serverHelpers'
import { LoginPage } from '@/features/auth/pages/LoginPage'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

export default function Page() {
  const mode = getServerMode()

  return <LoginPage mode={mode} />
}