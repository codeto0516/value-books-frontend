import { memo } from 'react'

export type PageAction = React.ReactElement

interface PageActionsProps {
  actions: PageAction[]
}

export const PageActions = memo(({ actions }: PageActionsProps) => {
  if (!actions || actions.length === 0) return null

  return <div className='flex flex-row gap-2 '>{actions.map(action => action)}</div>
})
