import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import type { Purchase } from '../types/Purchase'
import { useDataTable } from '@/shared/components/data-table/hooks/useDataTable'
import { useColumnDef } from '@/shared/components/data-table/hooks/useColumnDef'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/shared/components/data-table'
import type { SingleType } from '@/shared/types/singleType'
import { DotStatus } from '@/shared/components/dot-status'

interface Props {
  purchase: Purchase
}

export const PurchaseEditForm = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <EditCard {...props} />
      </Grid>
      <Grid item xs={12} md={3}>
        <ActionCard />
      </Grid>
    </Grid>
  )
}

const EditCard = (props: Props) => {
  const columnDef = useColumnDef<SingleType<Purchase['updatedHistories']>>()
  const columnHelper = createColumnHelper<SingleType<Purchase['updatedHistories']>>()

  const columns = [
    columnHelper.accessor('createdAt', {
      header: columnDef.header({ value: '日付', align: 'center', sortable: true }),
      cell: columnDef.cell({ variant: 'date', align: 'center' }),
      maxSize: 100,
      minSize: 100
    }),
    columnHelper.accessor('updatedUserName', {
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
          const Dot = () => <span className='w-2 h-2 rounded-full inline-block' />

          switch (row.original.operationId) {
            case 1:
              return <DotStatus color='success'>申請</DotStatus>
            case 2:
              return <DotStatus color='warning'>承認</DotStatus>
            case 3:
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

  const { table } = useDataTable<SingleType<Purchase['updatedHistories']>>({
    data: props.purchase.updatedHistories,
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
                  src={props.purchase.bookThumbnail}
                  alt={props.purchase.bookName}
                  className='w-full object-center'
                />
              </Grid>
              <Grid item container xs={10} spacing={4}>
                <Grid item xs={12}>
                  <Typography variant='h4'>{props.purchase.bookName}</Typography>
                  <Typography variant='caption'>{props.purchase.bookAuthor}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2'>
                    銀の弾丸、OOUI。操作性と開発効率の劇的な向上
                    オブジェクト指向ユーザーインターフェース(OOUI)とは、オブジェクト(もの、名詞)を起点としてUIを設計すること。タスク(やること、動詞)を起点としたUIに比べて、画面数が減って作業効率が高まり、また開発効率や拡張性も向上する、いわば「銀の弾丸」的な効果を持ちます。ブログや雑誌記事などで大きな反響を得たこの設計手法について、前半部では理論やプロセスを詳説。そして後半部の「ワークアウト(実践演習)」では18の課題に読者がチャレンジ。実際に考え、手を動かし、試行錯誤をすることにより、OOUIの設計手法を体得できます。
                  </Typography>
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

const ActionCard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <TextField type='date' fullWidth size='small' />
            <TextField type='number' fullWidth label='金額' size='small' />
            <TextField type='text' fullWidth label='詳細' multiline minRows={3} size='small' />
            <TextField type='number' fullWidth label='タグ' size='small' />
            <Button
              fullWidth
              variant='contained'
              className='capitalize'
              startIcon={<i className='ri-send-plane-line' />}
            >
              申請する
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
