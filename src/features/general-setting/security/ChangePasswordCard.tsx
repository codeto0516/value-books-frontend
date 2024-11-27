'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const ChangePasswordCard = () => {
  // States
  const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [isNewPasswordShown, setIsNewPasswordShown] = useState(false)

  const handleClickShowCurrentPassword = () => {
    setIsCurrentPasswordShown(!isCurrentPasswordShown)
  }

  return (
    <Card>
      <CardHeader title='パスワード変更' />
      <CardContent>
        <form>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='現在のパスワード'
                type={isCurrentPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowCurrentPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isCurrentPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container className='mbs-0' spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='新しいパスワード'
                type={isNewPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isNewPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='新しいパスワードの確認'
                type={isConfirmPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} className='flex flex-col gap-4'>
              <Typography variant='h6' color='text.secondary'>
                パスワードの要件：
              </Typography>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-2.5 text-textSecondary'>
                  <i className='ri-checkbox-blank-circle-fill text-[8px]' />
                  {/* Minimum 8 characters long - the more, the better */}
                  最低8文字以上のパスワード
                </div>
                <div className='flex items-center gap-2.5 text-textSecondary'>
                  <i className='ri-checkbox-blank-circle-fill text-[8px]' />
                  {/* At least one lowercase & one uppercase character */}
                  少なくとも1つの小文字と大文字の文字
                </div>
                <div className='flex items-center gap-2.5 text-textSecondary'>
                  <i className='ri-checkbox-blank-circle-fill text-[8px]' />
                  {/* At least one number, symbol, or whitespace character */}
                  少なくとも1つの数字、記号、または空白文字の文字
                </div>
              </div>
            </Grid>
            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained'>保存する</Button>
              <Button variant='outlined' type='reset' color='secondary'>
                リセット
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ChangePasswordCard
