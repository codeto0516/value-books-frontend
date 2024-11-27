import Card from '@mui/material/Card'
import { flexRender } from '@tanstack/react-table'
import type { Table } from '@tanstack/react-table'

import styles from '@core/styles/table.module.css'
import { Fragment, type ReactElement } from 'react'
import { Divider } from '@mui/material'
import { cn } from '@/shared/utils/cn'

interface Props<DataType> {
  table: Table<DataType>
  tableTop?: (ReactElement | null | undefined | false)[]
  tableBottom?: (ReactElement | null | undefined | false)[]
}

export const DataTable = <DataType,>({ table, tableTop, tableBottom }: Props<DataType>) => {
  return (
    <Card className='w-full'>
      {tableTop?.map((element, index) => (
        <Fragment key={`table-top-element-${index}`}>
          {element && index > 0 ? <Divider /> : null}
          {element}
        </Fragment>
      ))}
      <div className='overflow-x-auto border-collapse'>
        <table className={cn(styles.table, 'table-fixed')}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      width: header.getSize()
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.map(row => {
              return (
                <tr key={row.id} className={cn(row.getIsSelected() && 'selected')}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {tableBottom?.map((element, index) => (
        <Fragment key={`table-bottom-element-${index}`}>
          {element && index > 0 ? <Divider /> : null}
          {element}
        </Fragment>
      ))}
    </Card>
  )
}
