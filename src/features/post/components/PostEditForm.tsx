import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { PostEditor } from './PostEditor'

export const PostEditForm = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={9}>
        <EditCard />
      </Grid>
      <Grid item xs={12} md={3}>
        <EditActions id={'1'} />
      </Grid>
    </Grid>
  )
}

const EditCard = () => {
  return (
    <>
      <Card>
        <CardContent className='sm:!p-12'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField label='タイトル' placeholder='タイトルを入力してください' fullWidth />
            </Grid>
            <Grid item xs={12}>
              <div className='flex flex-row gap-2 items-center'>
                <Typography variant='body2'>
                  <span className='font-bold'>URL</span>: https://stg03.resta.jp/new_cms/
                </Typography>
                <TextField
                  label='スラグ'
                  placeholder='半角英数字のみ。空白は無視して保存されます。'
                  size='small'
                  className='w-[400px]'
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <PostEditor />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

const EditActions = ({ id }: { id: string }) => {
  // States
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false)
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <Button fullWidth component={Link} color='success' variant='outlined' className='capitalize' href={''}>
                プレビュー
              </Button>
            </div>
            <FormControl fullWidth size='small'>
              <InputLabel id='demo-simple-select-label'>公開状態</InputLabel>
              <Select label='公開状態'>
                <MenuItem value={10}>公開</MenuItem>
                <MenuItem value={20}>下書き</MenuItem>
                <MenuItem value={30}>承認待ち</MenuItem>
                <MenuItem value={30}>予約投稿</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant='contained'
              className='capitalize'
              startIcon={<i className='ri-send-plane-line' />}
              onClick={() => setSendDrawerOpen(true)}
            >
              保存する
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* <Grid item xs={12}>
        <FormControl fullWidth className='mbe-4'>
          <InputLabel id='payment-select'>Accept payments via</InputLabel>
          <Select fullWidth defaultValue='Internet Banking' label='Accept payments via' labelId='payment-select'>
            <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
            <MenuItem value='Debit Card'>Debit Card</MenuItem>
            <MenuItem value='Credit Card'>Credit Card</MenuItem>
            <MenuItem value='Paypal'>Paypal</MenuItem>
            <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
          </Select>
        </FormControl>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-payment-terms' className='cursor-pointer'>
            Payment Terms
          </InputLabel>
          <Switch defaultChecked id='invoice-edit-payment-terms' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-client-notes' className='cursor-pointer'>
            Client Notes
          </InputLabel>
          <Switch id='invoice-edit-client-notes' />
        </div>
        <div className='flex items-center justify-between gap-6'>
          <InputLabel htmlFor='invoice-edit-payment-stub' className='cursor-pointer'>
            Payment Stub
          </InputLabel>
          <Switch id='invoice-edit-payment-stub' />
        </div>
      </Grid> */}
    </Grid>
  )
}
