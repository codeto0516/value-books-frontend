import { Button } from '@mui/material'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Link from 'next/link'
import { memo } from 'react'

export const PageBackButton = memo(({ href }: { href: string }) => {
  return (
    <Link href={href ?? ''}>
      <Button variant='outlined' color='secondary' startIcon={<IoMdArrowRoundBack />}>
        Back
      </Button>
    </Link>
  )
})
