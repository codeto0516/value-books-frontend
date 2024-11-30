import { cn } from '@/shared/utils/cn'

interface Props {
  color: 'success' | 'warning' | 'error'
  children: React.ReactNode
}
export const DotStatus = (props: Props) => {
  const { color, children } = props

  return (
    <span className='inline-flex items-center gap-2'>
      <span className={cn('w-[10px] h-[10px] rounded-full inline-block', getColorClassNames(color))}></span>
      <span>{children}</span>
    </span>
  )
}

function getColorClassNames(color: Props['color']) {
  switch (color) {
    case 'success':
      return 'bg-success'
    case 'warning':
      return 'bg-warning'
    case 'error':
      return 'bg-error'
  }
}
