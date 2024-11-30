'use client'

// React Imports
import { memo, Suspense, useContext, useEffect, useMemo } from 'react'

import { Grid } from '@mui/material'

// MUI Imports

import { PageBreadCrumb } from './PageBreadCrumb'
import { PageBackButton } from './PageBackButton'
import { PageActions, type PageAction } from './PageActions'
import type { PageTitleContextProps } from '@/shared/providers/PageTitleProvider'
import { PageTitleContext } from '@/shared/providers/PageTitleProvider'

// DayJS
import { Loading } from '../../Loading'

// プラグインの拡張

interface PageHeaderProps {
  children: React.ReactNode
  title?: React.ReactElement | string | undefined | null
  icon?: React.ReactElement | undefined | null
  breadcrumb?: PageBreadCrumb[]
  actions?: PageAction[]
  backHref?: string
  AlertComponent?: React.ReactElement[]
}

export const PageLayout = memo(
  ({ children, title, icon, breadcrumb, actions, backHref, AlertComponent = [] }: PageHeaderProps) => {
    const { handleSetPageTitle, handleSetPageIcon } = useContext<PageTitleContextProps>(PageTitleContext)

    useEffect(() => {
      if (title) {
        handleSetPageTitle(title)
      }

      if (icon) {
        handleSetPageIcon(icon)
      }

      return () => {
        handleSetPageTitle('') // ページ遷移時にページタイトルをリセット
        handleSetPageIcon(null)
      }
    }, [handleSetPageTitle, title, handleSetPageIcon, icon])

    const memoizedBreadcrumb = useMemo(() => breadcrumb, [breadcrumb])
    const memoizedActions = useMemo(() => actions ?? [], [actions])

    return (
      <Suspense fallback={<Loading />}>
        <Grid container gap={4} className='mx-auto max-w-[1280px]'>
          <Grid item container xs={12} className='flex flex-col gap-0'>
            <div className='flex flex-col sm:flex-row gap-2 justify-between w-full'>
              <PageBreadCrumb breadcrumb={memoizedBreadcrumb} />
              <div className='flex justify-end items-center gap-2'>
                {backHref && <PageBackButton href={backHref ?? null} />}
                <PageActions actions={memoizedActions} />
              </div>
            </div>

            {AlertComponent?.length > 0 ? (
              <div className='mt-2 flex flex-col gap-2'>{AlertComponent?.map(v => v)}</div>
            ) : (
              <></>
            )}
          </Grid>

          {children}
        </Grid>
      </Suspense>
    )
  }
)
