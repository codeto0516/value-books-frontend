import { CircularProgress } from '@mui/material'
import { memo } from 'react'

export const Loading = memo(() => {
  return (
    <div className='w-full h-full flex items-center justify-center z-[9999] fixed top-0 left-0 bottom-0 right-0'>
      <CircularProgress color='inherit' />
    </div>
  )
})
