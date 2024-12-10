'use client'

import { Button, Grid, TextField, Typography, IconButton } from '@mui/material'
import { DataTable } from '@/shared/components/data-table'
import { useDataTable } from '@/shared/components/data-table/hooks/useDataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { useColumnDef } from '@/shared/components/data-table/hooks/useColumnDef'
import { DataTableSearchBar } from '@/shared/components/data-table/components/DataTableSearchBar'
import { NewIcon, PurchaseFeatureIcon } from '@/shared/components/icon'
import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import type { ResponsePurchase } from '../types/Purchase'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useFetchPurchaseAll } from '../api/usePurchaseApi'
import { PurchaseStatusEnum } from '../types/purchase-status.enum'
import Link from 'next/link'

export const PurchaseListPage = () => {
  return <FetchComponent />
}

const FetchComponent = () => {
  const purchaseAllFetcher = useFetchPurchaseAll()

  if (purchaseAllFetcher.isLoading) {
    return <div>Loading...</div>
  }

  if (purchaseAllFetcher.error) {
    return <div>Error</div>
  }

  return <MainComponent purchases={purchaseAllFetcher.data ?? []} />
}

const MainComponent = ({ purchases }: { purchases: ResponsePurchase[] }) => {
  const router = useRouter()
  const columnDef = useColumnDef<ResponsePurchase>()
  const columnHelper = createColumnHelper<ResponsePurchase>()

  const columns = [
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
    columnHelper.accessor('price', {
      header: columnDef.header({ value: '金額', align: 'center', sortable: true }),
      cell: columnDef.cell({
        variant: 'number',
        align: 'center'
      }),
      minSize: 100
    }),
    columnHelper.accessor(
      row => {
        switch (row.status) {
          case PurchaseStatusEnum.REQUEST:
            return '申請中'
          case PurchaseStatusEnum.CANCEL:
            return 'キャンセル'
          case PurchaseStatusEnum.REFUND:
            return '拒否'
          case PurchaseStatusEnum.APPROVE:
            return '承認済み'
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
                case PurchaseStatusEnum.REQUEST:
                  return 'warning'
                case PurchaseStatusEnum.CANCEL:
                  return 'secondary'
                case PurchaseStatusEnum.REFUND:
                  return 'error'
                case PurchaseStatusEnum.APPROVE:
                  return 'success'
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
      header: columnDef.header({ value: '申請者', align: 'center', sortable: true }),
      cell: columnDef.cell({
        variant: 'avatar',
        align: 'center',
        src: ({ row }) => row.original.createdUser.avatar ?? ''
      }),
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

  const { table } = useDataTable<ResponsePurchase>({
    data: purchases,
    columns
  })

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
                <Link key='new' href='/purchase/new'>
                  <Button key='new' variant='contained' color='primary' startIcon={<NewIcon />}>
                    新規申請
                  </Button>
                </Link>
              ]}
            />
          ]}
          getBodyRowProps={row => ({
            className: 'hover:bg-actionHover cursor-pointer',
            onClick: () => router.push(`/purchase/${row.original.id}`)
          })}
        />
      </Grid>
    </PageLayout>
  )
}
