import * as React from 'react'

import { useMediaQuery } from '@mui/material'

import { cn } from '@/shared/utils/cn'

// 使用例
// <Table>
//   <Table.Header>
//     <Table.Row>
//       <Table.Head>Header 1</Table.Head>
//       <Table.Head>Header 2</Table.Head>
//     </Table.Row>
//   </Table.Header>
//   <Table.Body>
//     <Table.Row>
//       <Table.Cell>Cell 1</Table.Cell>
//       <Table.Cell>Cell 2</Table.Cell>
//     </Table.Row>
//   </Table.Body>
// </Table>
//

// const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  wrapperProps?: React.HTMLAttributes<HTMLTableElement>
}

const Table = (props: TableProps) => {
  const { children, wrapperProps, ...newProps } = props

  return (
    <div
      className={cn('w-full overflow-auto h-full', wrapperProps?.className)}
      {...wrapperProps}
      style={{
        maxHeight: 'calc(100vh - 250px)',
        ...wrapperProps?.style
      }}
    >
      <table
        {...newProps}
        className={cn(
          `
            w-full caption-bottom text-sm border-separate border-spacing-0
            [&:align='right']:*:text-right table-fixed border-l border-b
            `,
          newProps?.className
        )}
      >
        {children}
      </table>
    </div>
  )
}

Table.displayName = 'Table'

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean
}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, sticky, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(
        `
        text-textPrimary
        `,
        sticky && 'sticky top-0 z-10 bg-tableHeader',
        className
      )}
      {...props}
    />
  )
)

TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        `
          text-textSecondary
        `,
        className
      )}
      {...props}
    />
  )
)

TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn(className)} {...props} />
)

TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => <tr ref={ref} className={cn('h-12', className)} {...props} />
)

TableRow.displayName = 'TableRow'

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  width?: {
    sm: string | number
    md: string | number
    lg: string | number
  }
  textLeft?: boolean
  textRight?: boolean
  textCenter?: boolean
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      width = {
        sm: 200,
        md: 200,
        lg: '100%'
      },
      textLeft,
      textRight,
      textCenter,
      ...props
    },
    ref
  ) => {
    const sm = useMediaQuery('(max-width: 600px)')
    const md = useMediaQuery('(max-width: 768px)')
    const lg = useMediaQuery('(max-width: 1024px)')

    return (
      <th
        ref={ref}
        className={cn(
          `
        font-medium text-sm tracking-wider text-center leading-snug
        bg-tableHeader
        border-t border-r
        border-table border-solid
        px-1.5 py-1
        `,
          textLeft && 'text-left',
          textRight && 'text-right',
          textCenter && 'text-center',
          className
        )}
        style={
          {
            width: sm ? width.sm : md ? width.md : lg ? width.lg : width.lg
          } as React.CSSProperties
        }
        {...props}
      />
    )
  }
)

TableHead.displayName = 'TableHead'

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  textLeft?: boolean
  textRight?: boolean
  textCenter?: boolean
  truncate?: boolean
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, textLeft, textRight, textCenter, truncate, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        `
        font-medium  tracking-wider text-center  
        
        border-t border-r
        border-table border-solid

        [&:has([role=textfield])]:py-2 [&:has([role=textfield])]:px-2 px-1.5 py-[0.55rem] leading-tight break-words break-normal
      `,

        textLeft && 'text-left',
        textRight && 'text-right',
        textCenter && 'text-center',
        truncate && 'truncate',

        // px-4 py-3 text-sm leading-relaxed
        className
      )}
      {...props}
    />
  )
)

TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => <caption ref={ref} className={cn(className)} {...props} />
)

TableCaption.displayName = 'TableCaption'

Table.Header = TableHeader
Table.Body = TableBody
Table.Footer = TableFooter
Table.Row = TableRow
Table.Head = TableHead
Table.Cell = TableCell
Table.Caption = TableCaption

export { Table }
