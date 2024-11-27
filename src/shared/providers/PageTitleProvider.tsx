import { createContext, useCallback, useState } from 'react'

export interface PageTitleContextProps {
  pageTitle: React.ReactElement | string
  handleSetPageTitle: (title: React.ReactElement | string, icon?: React.ReactElement | undefined | null) => void
  pageIcon?: React.ReactElement | undefined | null
  handleSetPageIcon: (icon: React.ReactElement | undefined | null) => void
}

export const PageTitleContext = createContext<PageTitleContextProps>({
  pageTitle: '',
  handleSetPageTitle: () => {},
  pageIcon: undefined,
  handleSetPageIcon: () => {}
})

export const PageTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [pageTitle, setPageTitle] = useState<React.ReactElement | string>('')
  const [pageIcon, setPageIcon] = useState<React.ReactElement | undefined | null>(undefined)

  const handleSetPageTitle = useCallback((title: React.ReactElement | string) => {
    setPageTitle(() => title)
  }, [])

  const handleSetPageIcon = useCallback((icon: React.ReactElement | undefined | null) => {
    setPageIcon(() => icon)
  }, [])

  return (
    <PageTitleContext.Provider
      value={{
        pageTitle,
        handleSetPageTitle,
        pageIcon,
        handleSetPageIcon
      }}
    >
      {children}
    </PageTitleContext.Provider>
  )
}
