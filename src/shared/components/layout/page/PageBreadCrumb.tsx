import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material'
import Link from 'next/link'
import { memo } from 'react'
import { IoMdHome } from 'react-icons/io'

interface PageBreadCrumbProps {
  breadcrumb: PageBreadCrumb[]
}

export interface PageBreadCrumb {
  label: string | undefined
  href?: string
}

export const PageBreadCrumb = memo(({ breadcrumb }: PageBreadCrumbProps) => {
  return (
    <Breadcrumbs aria-label='breadcrumb' sx={{ width: '100%' }}>
      <Link href='/dashboard' passHref legacyBehavior>
        <MuiLink underline='hover' color='secondary' className='flex items-center'>
          <IoMdHome />
        </MuiLink>
      </Link>
      {breadcrumb.map((item, index) => (
        <PageBreadCrumbItem key={index} {...item} isLast={index === breadcrumb.length - 1} />
      ))}
    </Breadcrumbs>
  )
})

interface PageBreadCrumbItemProps extends PageBreadCrumb {
  isLast?: boolean
}

const PageBreadCrumbItem = memo(({ label, href, isLast }: PageBreadCrumbItemProps) => {
  if (label === undefined) {
    return
  }

  if (isLast) {
    return <Typography className='text-textSecondary font-normal break-words break-all'>{label}</Typography>
  }

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <MuiLink underline='hover' className='text-textSecondary font-normal break-words break-all'>
          {label}
        </MuiLink>
      </Link>
    )
  }

  return (
    <Typography color='secondary' className='text-textSecondary font-normal break-words break-all'>
      {label}
    </Typography>
  )
})
