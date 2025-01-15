'use client'

import { Button, Grid, TextField, Typography, IconButton } from '@mui/material'
import { DataTable } from '@/shared/components/data-table'
import { useDataTable } from '@/shared/components/data-table/hooks/useDataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { useColumnDef } from '@/shared/components/data-table/hooks/useColumnDef'
import { DataTableSearchBar } from '@/shared/components/data-table/components/DataTableSearchBar'
import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ResponseBook } from '../types/book'
import { useFetchBookAll } from '../api/useBookApi'
import { BookStatusEnum, BookStatusTextEnum } from '../types/book-status.enum'
import { BookFeatureIcon, NewIcon } from '@/shared/components/icon'
import { DotMenuIconButton } from '@/shared/components/button/IconButtons'

export const BookListPage = () => {
  return <FetchComponent />
}

const FetchComponent = () => {
  const purchaseAllFetcher = useFetchBookAll()

  if (purchaseAllFetcher.isLoading) {
    return <div>Loading...</div>
  }

  if (purchaseAllFetcher.error) {
    return <div>Error</div>
  }

  return <MainComponent purchases={purchaseAllFetcher.data ?? []} />
}

const MainComponent = ({ purchases }: { purchases: ResponseBook[] }) => {
  const router = useRouter()
  const columnDef = useColumnDef<ResponseBook>()
  const columnHelper = createColumnHelper<ResponseBook>()

  const columns = [
    columnHelper.display({
      id: 'selection',
      header: columnDef.header({ value: '' }),
      cell: columnDef.cell({
        variant: 'checkbox',
        align: 'center'
      }),
      maxSize: 50,
      minSize: 50
    }),
    columnHelper.accessor('book.title', {
      header: columnDef.header({ value: 'タイトル', sortable: true }),
      cell: columnDef.cell({
        variant: 'text',
        align: 'left',
        transform: ({ row }) => {
          return (
            <div className='flex gap-2 items-center'>
              <img src={row.original?.book?.thumbnailLink} className='w-16 h-16 object-contain' />
              <div>
                <Typography variant='body1'>{row.original?.book?.title}</Typography>
                <Typography variant='caption'>{row.original.book?.author}</Typography>
              </div>
            </div>
          )
        }
      }),
      minSize: 400
    }),
    columnHelper.accessor(
      row => {
        switch (row.status) {
          case BookStatusEnum.Available:
            return BookStatusTextEnum.Available
          case BookStatusEnum.OnBorrow:
            return BookStatusTextEnum.OnBorrow
          case BookStatusEnum.Reserved:
            return BookStatusTextEnum.Reserved
          case BookStatusEnum.Overdue:
            return BookStatusTextEnum.Overdue
          case BookStatusEnum.Lost:
            return BookStatusTextEnum.Lost
          case BookStatusEnum.InRepair:
            return BookStatusTextEnum.InRepair
          case BookStatusEnum.Withdrawn:
            return BookStatusTextEnum.Withdrawn
          default:
            return ''
        }
      },
      {
        id: 'status',
        header: columnDef.header({ value: 'ステータス', sortable: true }),
        cell: columnDef.cell({
          variant: 'chip',
          align: 'left',
          chipProps: ({ row }) => ({
            color: (() => {
              switch (row.original.status) {
                case BookStatusEnum.Available:
                  return 'success'
                case BookStatusEnum.OnBorrow:
                  return 'primary'
                case BookStatusEnum.Reserved:
                  return 'warning'
                case BookStatusEnum.Overdue:
                  return 'error'
                case BookStatusEnum.Lost:
                  return 'error'
                case BookStatusEnum.InRepair:
                  return 'error'
                case BookStatusEnum.Withdrawn:
                  return 'error'
                default:
                  return 'default'
              }
            })()
          })
        }),
        maxSize: 100,
        minSize: 100
      }
    ),
    columnHelper.accessor('createdUser.name', {
      header: columnDef.header({ value: '貸出者', align: 'center', sortable: true }),
      cell: columnDef.cell({
        variant: 'avatar',
        align: 'center',
        src: ({ row }) => row.original.createdUser.avatar ?? ''
      }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.accessor('createdAt', {
      header: columnDef.header({ value: '貸出日', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'date', align: 'center' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.accessor('createdAt', {
      header: columnDef.header({ value: '返却予定日', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'date', align: 'center' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.display({
      id: 'action',
      header: columnDef.header({ value: '' }),
      cell: columnDef.cell({
        variant: 'action',
        align: 'right',
        actions: ({ row }) => [<DotMenuIconButton key='menu' />]
      }),
      maxSize: 50,
      minSize: 50
    })
  ]

  const { table } = useDataTable<ResponseBook>({
    data: purchases,
    columns
  })

  return (
    <PageLayout icon={<BookFeatureIcon />} title='書籍管理'>
      <Grid item xs={12}>
        <DataTable
          table={table}
          tableTop={[
            <DataTableSearchBar
              key='search-bar'
              filters={[
                <TextField
                  key='status'
                  variant='standard'
                  placeholder='Search'
                  className='w-[200px]'
                  size='small'
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label='' onClick={() => {}} size='small'>
                        <FaSearch size={14} />
                      </IconButton>
                    )
                  }}
                  onChange={e => {
                    table.setGlobalFilter(e.target.value || undefined)
                  }}
                />
              ]}
              actions={[
                <Link key='new' href='/purchase/new'>
                  <Button key='new' variant='contained' color='primary' startIcon={<NewIcon />}>
                    新規申請
                  </Button>
                </Link>
              ]}
            />
          ]}
          getBodyRowProps={row => ({
            className: 'hover:bg-actionHover cursor-pointer'
          })}
          getBodyCellProps={cell => ({
            onClick: () => {
              if (['action', 'selection'].includes(cell.column.id)) {
                router.push(`/purchase/${cell.row.original.id}`)
              }
            }
          })}
        />
      </Grid>
    </PageLayout>
  )
}
