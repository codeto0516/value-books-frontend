import type { Metadata } from 'next'

import { SigninPage } from '@/features/auth/pages/SigninPage'

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'ログインページです。'
}

export default function Page() {
  return <SigninPage />
}
