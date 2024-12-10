'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import Link from '@components/Link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SigninSchema } from '../schemas/SigninSchema'
import { useAuthApi } from '../api/useAuthApi'
import { z } from 'zod'
import LoadingButton from '@mui/lab/LoadingButton'

export const SigninPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const router = useRouter()
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const { signin, isLoading, error } = useAuthApi()

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = form.handleSubmit(async (data: z.infer<typeof SigninSchema>) => {
    const result = await signin(data)

    if (result) {
      router.push('/purchase')
    }
  })

  return (
    <div className='flex bs-full justify-center'>
      {/* <div className='fixed top-4 '>
        <Logo />
      </div> */}
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='flex flex-col gap-5 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset]'>
          <div className='flex justify-center gap-4 mb-4'>
            <Typography variant='h4' className=''>
              ログイン
            </Typography>
          </div>
          <form noValidate autoComplete='off' onSubmit={onSubmit} className='flex flex-col gap-5'>
            <TextField autoFocus fullWidth label='Email' {...form.register('email')} />
            <TextField
              fullWidth
              label='Password'
              type={isPasswordShown ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...form.register('password')}
            />
            <div className='flex justify-between items-center flex-wrap gap-x-3 gap-y-1'>
              <FormControlLabel control={<Checkbox />} label='Remember me' />
              <Typography className='text-end' color='primary' component={Link}>
                パスワードを忘れた場合
              </Typography>
            </div>
            <LoadingButton fullWidth variant='contained' type='submit' loading={isLoading}>
              ログイン
            </LoadingButton>
            <Divider className='gap-3'>or</Divider>
            <div className='flex justify-center items-center gap-2'>
              <IconButton size='small' className='text-github'>
                <i className='ri-github-fill' />
              </IconButton>
              <IconButton size='small' className='text-googlePlus'>
                <i className='ri-google-fill' />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
