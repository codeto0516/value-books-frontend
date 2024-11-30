'use client'

import { Button, Select, Grid, TextField, Typography, IconButton } from '@mui/material'
import { DataTable } from '@/shared/components/data-table'
import { useDataTable } from '@/shared/components/data-table/hooks/useDataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { useColumnDef } from '@/shared/components/data-table/hooks/useColumnDef'
import { DataTableSearchBar } from '@/shared/components/data-table/components/DataTableSearchBar'
import { DataTableCheckboxActions } from '@/shared/components/data-table/components/DataTableCheckboxActions'
import { NewIcon, PublishedIcon, PurchaseFeatureIcon, UnPublishedIcon } from '@/shared/components/icon'
import { useState } from 'react'
import { cn } from '@/shared/utils/cn'
import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import type { Purchase } from '../types/Purchase'
import { purchaseDemoData } from '../constants/demoData'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export const PurchaseListPage = () => {
  const router = useRouter()
  const columnDef = useColumnDef<Purchase>()
  const columnHelper = createColumnHelper<Purchase>()

  const columns = [
    // columnHelper.display({
    //   id: 'selection',
    //   header: columnDef.header({ variant: 'checkbox' }),
    //   cell: columnDef.cell({
    //     variant: 'checkbox'
    //   }),
    //   maxSize: 50,
    //   minSize: 50
    // }),

    columnHelper.accessor('bookName', {
      header: columnDef.header({ value: 'タイトル', sortable: true }),
      cell: columnDef.cell({
        variant: 'text',
        align: 'left',
        transform: ({ row }) => {
          return (
            <div className='flex gap-2 items-center'>
              <img src={row.original.bookThumbnail} className='w-16 h-16 object-contain' />
              <div>
                <Typography variant='body1'>{row.original.bookName}</Typography>
                <Typography variant='caption'>{row.original.bookAuthor}</Typography>
              </div>
            </div>
          )
        }
      }),
      minSize: 400
    }),
    columnHelper.accessor('amount', {
      header: columnDef.header({ value: '金額', align: 'center', sortable: true }),
      cell: columnDef.cell({
        variant: 'number',
        align: 'center'
      }),
      minSize: 100
    }),
    columnHelper.accessor('status', {
      header: columnDef.header({ value: 'ステータス', sortable: true }),
      cell: columnDef.cell({
        variant: 'chip',
        align: 'left',
        chipProps: ({ row }) => ({
          color: (() => {
            switch (row.original.statusId) {
              case 1:
                return 'secondary'
              case 2:
                return 'info'
              case 3:
                return 'success'
              default:
                return 'secondary'
            }
          })()
        })
      }),
      maxSize: 100,
      minSize: 100
    }),

    // columnHelper.accessor(
    //   row => {
    //     return row.categories.map(Purchase => Purchase.name).join(', ')
    //   },
    //   {
    //     id: 'categories',
    //     header: columnDef.header({ value: 'カテゴリー', sortable: true }),
    //     cell: columnDef.cell({ variant: 'text', align: 'left' }),
    //     maxSize: 150,
    //     minSize: 150
    //   }
    // ),
    columnHelper.accessor('requestedUserName', {
      header: columnDef.header({ value: '申請者', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'avatar', align: 'center', src: '/images/avatars/1.png' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.accessor('createdAt', {
      header: columnDef.header({ value: '申請日', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'date', align: 'center' }),
      maxSize: 100,
      minSize: 100
    })

    // columnHelper.display({
    //   id: 'action',
    //   header: columnDef.header({ value: '' }),
    //   cell: columnDef.cell({
    //     variant: 'action',
    //     align: 'right',
    //     actions: ({ row }) => [
    //       <Link key='edit' href={`/Purchase/${row.original.id}`}>
    //         <EditIconButton />
    //       </Link>
    //     ]
    //   }),
    //   maxSize: 50,
    //   minSize: 50
    // })
  ]

  const { table } = useDataTable<Purchase>({
    data: purchaseDemoData,
    columns
  })

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  return (
    <PageLayout icon={<PurchaseFeatureIcon />} title='購入管理'>
      <Grid item xs={12}>
        <DataTable
          table={table}
          tableTop={[
            <DataTableSearchBar
              key='search-bar'
              filters={[
                <TextField
                  key='status'
                  variant='outlined'
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
                <Button key='new' variant='contained' color='primary' startIcon={<NewIcon />}>
                  新規申請
                </Button>
              ]}
            />,
            isFilterOpen && (
              <div key={'ddsfd'} className='px-4 py-3'>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-row gap-2 items-center'>
                    <Select key='status' variant='outlined' label='ステータス' className='w-[200px]' size='small' />
                    <Select key='status' variant='outlined' label='ステータス' className='w-[200px]' size='small' />
                    <Select key='status' variant='outlined' label='ステータス' className='w-[200px]' size='small' />
                    <Select key='status' variant='outlined' label='ステータス' className='w-[200px]' size='small' />
                    <Select key='status' variant='outlined' label='ステータス' className='w-[200px]' size='small' />
                  </div>
                  <div className='flex flex-row gap-2 justify-end'>
                    <Button variant='text' color='secondary' onClick={() => setIsFilterOpen(false)}>
                      閉じる
                    </Button>
                    <Button variant='outlined' color='primary'>
                      検索
                    </Button>
                  </div>
                </div>
              </div>
            ),
            <div key='top-pagination' className='flex flex-row justify-between items-center'>
              <DataTableCheckboxActions
                actions={[
                  <Button
                    key={'edit'}
                    variant='text'
                    color='primary'
                    startIcon={<PublishedIcon />}
                    className={cn(table.getSelectedRowModel().rows.length === 0 && 'hidden')}
                  >
                    一括公開
                  </Button>,
                  <Button
                    key={'edit'}
                    variant='text'
                    color='error'
                    startIcon={<UnPublishedIcon />}
                    className={cn(table.getSelectedRowModel().rows.length === 0 && 'hidden')}
                  >
                    一括非公開
                  </Button>

                  // <PublishedIconButton
                  //   key={'edit'}
                  //   size='small'
                  //   className={cn(table.getSelectedRowModel().rows.length === 0 && 'hidden')}
                  //   color='primary'
                  //   tooltip='一括公開'
                  // />,
                  // <UnPublishedIconButton
                  //   key={'edit'}
                  //   size='small'
                  //   className={cn(table.getSelectedRowModel().rows.length === 0 && 'hidden')}
                  //   color='error'
                  //   tooltip='一括非公開'
                  // />
                ]}
              />
              {/* <DataTablePagination table={table} /> */}
            </div>
          ]}
          // tableBottom={[<DataTablePagination key='bottom-pagination' table={table} />]}

          getBodyRowProps={row => ({
            className: 'hover:bg-actionHover cursor-pointer',
            onClick: () => router.push(`/purchase/${row.original.id}`)
          })}
        />
      </Grid>
    </PageLayout>
  )
}
