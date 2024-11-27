import type { ColumnDef, SortingState, TableOptions } from '@tanstack/react-table'
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { ReactElement, ReactNode } from 'react'
import { useMemo, useState } from 'react'

interface Props<DataType> {
  data: DataType[]
  columns: ColumnDef<DataType, string | number | ReactNode | ReactElement>[]
}

export function useDataTable<DataType>({ data, columns }: Props<DataType>) {
  const tableOptions: TableOptions<DataType> = useMemo(
    () => ({
      data,
      columns,
      getCoreRowModel: getCoreRowModel()
    }),
    [data, columns]
  )

  // ページネーション関連
  tableOptions.manualPagination = false
  tableOptions.getPaginationRowModel = getPaginationRowModel()
  tableOptions.initialState = {
    ...tableOptions.initialState,
    pagination: {
      pageSize: 5
    }
  }

  // フィルター関連
  tableOptions.filterFns = {
    fuzzy: () => false
  }

  // 行選択関連
  const [rowSelection, setRowSelection] = useState({})
  tableOptions.enableRowSelection = true
  tableOptions.state = {
    ...tableOptions.state,
    rowSelection
  }
  tableOptions.onRowSelectionChange = setRowSelection

  // ソート関連
  const [sorting, setSorting] = useState<SortingState>([])
  tableOptions.state = {
    ...tableOptions.state,
    sorting
  }
  tableOptions.onSortingChange = setSorting
  tableOptions.getSortedRowModel = getSortedRowModel()

  // テーブルのインスタンスを生成
  const table = useReactTable<DataType>(tableOptions)

  return {
    table
  }
}
