import { TablePagination } from '@mui/material'
import type { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

export interface DataTablePaginationProps<DataType> {
  table: Table<DataType>
}

export const DataTablePagination = <DataType,>({ table }: DataTablePaginationProps<DataType>) => {
  const total = useMemo(() => table.getCoreRowModel().rows.length, [table])

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 50, { label: 'All', value: total }]}
      component='div'
      count={table.getFilteredRowModel().rows.length}
      rowsPerPage={table.getState().pagination.pageSize}
      page={table.getState().pagination.pageIndex}
      onPageChange={(_, page) => {
        table.setPageIndex(page)
      }}
      onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
    />
  )
}
