type DataTableAction = React.ReactNode
type DataTableFilter = React.ReactNode

export interface DataTableSearchBarProps {
  actions?: DataTableAction[]
  filters?: DataTableFilter[]
}

export const DataTableSearchBar = (props: DataTableSearchBarProps) => {
  if (!props.actions && !props.filters) return

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <DataTableSearchBarFilters filters={props.filters || []} />
        <DataTableSearchBarActions actions={props.actions || []} />
      </div>
    </div>
  )
}

const DataTableSearchBarActions = ({ actions }: { actions: DataTableAction[] }) => {
  return (
    <div className='flex flex-row gap-2'>
      {actions.map((action, index) => (
        <div key={`data-table-action-${index}`}>{action}</div>
      ))}
    </div>
  )
}

const DataTableSearchBarFilters = ({ filters }: { filters: DataTableFilter[] }) => {
  return (
    <div className='flex flex-row gap-2'>
      {filters.map((filter, index) => (
        <div key={`data-table-filter-${index}`}>{filter}</div>
      ))}
    </div>
  )
}
