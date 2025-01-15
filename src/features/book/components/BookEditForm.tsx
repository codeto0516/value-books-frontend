import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import type { ResponseBook } from '../types/book'
import { useDataTable } from '@/shared/components/data-table/hooks/useDataTable'
import { useColumnDef } from '@/shared/components/data-table/hooks/useColumnDef'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/shared/components/data-table'
import type { SingleType } from '@/shared/types/singleType'
import { DotStatus } from '@/shared/components/dot-status'
import { BookOperationEnum } from '../types/book-operation.enum'
import { RHFDatePicker } from '@/shared/components/date-picker'
import { RHFTextField } from '@/shared/components/text-field'
import { RHFNumberField } from '@/shared/components/number-field'
import LoadingButton from '@mui/lab/LoadingButton'
import { RiSendPlaneLine } from 'react-icons/ri'

interface Props {
  purchase: ResponseBook
  isLoading: boolean
  onRequest: () => void
  onDelete: () => void
}

export const BookEditForm = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={8} lg={9} order={{ xs: 2, sm: 2, md: 1 }}>
        <EditCard {...props} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3} order={{ xs: 1, sm: 1, md: 2 }}>
        <ActionCard {...props} />
      </Grid>
    </Grid>
  )
}

const EditCard = (props: Props) => {
  const columnDef = useColumnDef<SingleType<ResponseBook['histories']>>()
  const columnHelper = createColumnHelper<SingleType<ResponseBook['histories']>>()

  const columns = [
    columnHelper.accessor('createdAt', {
      header: columnDef.header({ value: '日付', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'date', align: 'center' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.accessor('operatedUser.name', {
      header: columnDef.header({ value: 'ユーザー', align: 'left' }),
      cell: columnDef.cell({ variant: 'avatar', align: 'left', src: '/images/avatars/1.png' }),
      maxSize: 100,
      minSize: 100
    }),

    columnHelper.accessor('operation', {
      header: columnDef.header({ value: 'アクション', align: 'center', sortable: true }),
      cell: columnDef.cell({
        variant: 'number',
        align: 'center',
        transform: ({ row }) => {
          switch (row.original.operation) {
            case BookOperationEnum.REQUEST:
              return <DotStatus color='success'>申請</DotStatus>
            case BookOperationEnum.APPROVE:
              return <DotStatus color='warning'>承認</DotStatus>
            case BookOperationEnum.REFUND:
              return <DotStatus color='error'>却下</DotStatus>
          }
        }
      }),
      minSize: 100
    }),
    columnHelper.accessor('description', {
      header: columnDef.header({ value: '詳細' }),
      cell: columnDef.cell({
        variant: 'text',
        align: 'left'
      }),
      minSize: 400
    })
  ]

  const { table } = useDataTable<SingleType<ResponseBook['histories']>>({
    data: props.purchase.histories,
    columns
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='sm:!p-12'>
            <Grid container spacing={6}>
              <Grid item xs={2}>
                <img
                  src={props.purchase.book.thumbnailLink}
                  alt={props.purchase.book.title}
                  className='w-full object-center'
                />
              </Grid>
              <Grid item container xs={10} spacing={4}>
                <Grid item xs={12}>
                  <Typography variant='h4'>{props.purchase?.book?.title}</Typography>
                  <Typography variant='caption'>{props.purchase?.book?.author}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>{props.purchase?.book?.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <DataTable table={table} />
      </Grid>
    </Grid>
  )
}

const ActionCard = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <RHFDatePicker name='purchasedAt' label='購入日' />
            <RHFNumberField name='price' label='金額' />
            <RHFTextField name='comment' label='詳細' multiline minRows={3} />
            <LoadingButton
              fullWidth
              variant='contained'
              color='primary'
              startIcon={<RiSendPlaneLine />}
              loading={props.isLoading}
              onClick={props.onRequest}
            >
              申請する
            </LoadingButton>
            <Divider />
            <LoadingButton
              fullWidth
              variant='text'
              color='error'
              size='small'
              loading={props.isLoading}
              onClick={props.onDelete}
            >
              申請キャンセル
            </LoadingButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
