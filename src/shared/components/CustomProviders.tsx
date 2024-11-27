'use client'

import { PageTitleProvider } from '../providers/PageTitleProvider'

export const AuthorizedProviders = ({ children }: { children: React.ReactNode }) => {
  return <PageTitleProvider>{children}</PageTitleProvider>
}
