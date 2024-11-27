'use client'

import { Button, Select, TextField, IconButton } from '@mui/material'
import { DataTable } from '@/shared/components/data-table'
import { useDataTable } from '@/shared/components/data-table/hooks/useDataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { useColumnDef } from '@/shared/components/data-table/hooks/useColumnDef'
import { EditIconButton } from '@/shared/components/button/IconButtons'
import Link from 'next/link'
import { DataTableSearchBar } from '@/shared/components/data-table/components/DataTableSearchBar'
import { DataTablePagination } from '@/shared/components/data-table/components/DataTablePagination'
import { DataTableCheckboxActions } from '@/shared/components/data-table/components/DataTableCheckboxActions'
import { CategoryFeatureIcon, NewIcon, PublishedIcon, UnPublishedIcon } from '@/shared/components/icon'
import type { Category } from '../types/Post'
import { categoryDemoData } from '../constants/demoData'
import { TbFilterDown, TbFilterUp } from 'react-icons/tb'
import { useState } from 'react'
import { cn } from '@/shared/utils/cn'
import { PageLayout } from '@/shared/components/layout/page/PageLayout'

export const CategoryListPage = () => {
  const columnDef = useColumnDef<Category>()
  const columnHelper = createColumnHelper<Category>()

  const columns = [
    columnHelper.display({
      id: 'selection',
      header: columnDef.header({ variant: 'checkbox' }),
      cell: columnDef.cell({
        variant: 'checkbox'
      }),
      maxSize: 50,
      minSize: 50
    }),
    columnHelper.accessor('name', {
      header: columnDef.header({ value: 'タイトル', sortable: true }),
      cell: columnDef.cell({ variant: 'text', align: 'left' }),
      maxSize: 150,
      minSize: 150
    }),
    columnHelper.accessor('description', {
      header: columnDef.header({ value: '詳細', sortable: true }),
      cell: columnDef.cell({ variant: 'text', align: 'left' }),
      minSize: 300
    }),
    columnHelper.accessor('updatedTenantUserName', {
      header: columnDef.header({ value: '最終更新者', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'avatar', align: 'center', src: '/images/avatars/1.png' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.accessor('updatedAt', {
      header: columnDef.header({ value: '最終更新日', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'date', align: 'center' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.display({
      id: 'action',
      header: columnDef.header({ value: '' }),
      cell: columnDef.cell({
        variant: 'action',
        align: 'center',
        actions: ({ row }) => [
          <Link key='edit' href={`/post/${row.original.id}`}>
            <EditIconButton />
          </Link>
        ]
      }),
      maxSize: 50,
      minSize: 50
    })
  ]

  const { table } = useDataTable<Category>({
    data: categoryDemoData,
    columns
  })

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  return (
    <PageLayout
      icon={<CategoryFeatureIcon />}
      title='カテゴリー管理'
      breadcrumb={[{ label: 'カテゴリー管理', href: '/category' }]}
    >
      <DataTable
        table={table}
        tableTop={[
          <DataTableSearchBar
            key='search-bar'
            filters={[
              <TextField
                key='status'
                variant='outlined'
                placeholder='キーワード検索'
                className='w-[200px]'
                size='small'
                InputLabelProps={{
                  shrink: true
                }}
              />,
              isFilterOpen ? (
                <IconButton key={'filter'} onClick={() => setIsFilterOpen(false)}>
                  <TbFilterUp />
                </IconButton>
              ) : (
                <IconButton key={'filter'} onClick={() => setIsFilterOpen(true)}>
                  <TbFilterDown />
                </IconButton>
              )
            ]}
            actions={[
              <Button key='new' variant='contained' color='primary' startIcon={<NewIcon />}>
                新作作成
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
                  variant='text'
                  color='primary'
                  startIcon={<PublishedIcon />}
                  className={cn(table.getSelectedRowModel().rows.length === 0 && 'hidden')}
                >
                  一括公開
                </Button>,
                <Button
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
            <DataTablePagination table={table} />
          </div>
        ]}
        tableBottom={[<DataTablePagination key='bottom-pagination' table={table} />]}
      />
    </PageLayout>
  )
}
