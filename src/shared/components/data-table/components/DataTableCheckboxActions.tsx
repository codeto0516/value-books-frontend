interface Props {
  actions?: React.ReactNode[]
}

export const DataTableCheckboxActions = ({ actions }: Props) => {
  if (!actions) return

  return (
    <div className='px-3'>
      <div className='flex flex-row gap-2 items-center'>
        {actions.map((action, index) => (
          <div key={`data-table-action-${index}`}>{action}</div>
        ))}
      </div>
    </div>
  )
}
