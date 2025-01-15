import { Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import { RHFDatePicker } from '@/shared/components/date-picker'
import { RHFTextField, TextField } from '@/shared/components/text-field'
import { RHFNumberField } from '@/shared/components/number-field'
import LoadingButton from '@mui/lab/LoadingButton'
import { RiSendPlaneLine } from 'react-icons/ri'
import { useFormContext, useWatch } from 'react-hook-form'
import type { BookNewSchema } from '../schemas/BookSchema'
import { type z } from 'zod'
import { useGoogleBooksApi } from '../api/useGoogleBooksApi'
import { useState } from 'react'
import { ToggleButton, ToggleButtonItem } from '@/shared/components/toggle-button'
import { TbLayoutGrid, TbLayoutList } from 'react-icons/tb'

interface Props {
  isLoading: boolean
  onRequest: () => void
}

export const BookNewForm = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={8} lg={9} order={{ xs: 2, sm: 2, md: 1 }}>
        <EditCard />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={3} order={{ xs: 1, sm: 1, md: 2 }}>
        <ActionCard {...props} />
      </Grid>
    </Grid>
  )
}

const EditCard = () => {
  const form = useFormContext<z.infer<typeof BookNewSchema>>()
  const formFields = useWatch({ control: form.control })

  return (
    <Grid container spacing={6}>
      {formFields.book?.title && (
        <Grid item xs={12} className='relative'>
          <div className='absolute left-12 top-2 z-10'>
            <Chip className='p-4' label='選択中の書籍' color='primary' />
          </div>
          <Card>
            <CardContent className='sm:!p-12'>
              <Grid container spacing={6}>
                <Grid item xs={2}>
                  <img
                    src={formFields.book?.thumbnailLink}
                    alt={formFields.book?.title}
                    className='w-full object-center'
                  />
                </Grid>
                <Grid item container xs={10} spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant='h4'>{formFields?.book?.title}</Typography>
                    <Typography variant='caption'>{formFields?.book?.author}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='body2'>{formFields?.book?.description}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Grid item xs={12}>
        <BookSearchCard />
      </Grid>
    </Grid>
  )
}

/**
 * Google Books APIを利用して書籍検索を行うカード
 * 文字列で検索を行うと、Google Books APIを利用して書籍情報を取得する
 * その情報を書籍カードとして表示する
 * その中から選択した書籍を購入情報に追加する
 */
const BookSearchCard = () => {
  const form = useFormContext<z.infer<typeof BookNewSchema>>()
  const [keyword, setKeyword] = useState<string | null>(null)
  const [searchedBooks, setSearchedBooks] = useState<any>(null)
  const [displayType, setDisplayType] = useState<'list' | 'grid'>('list')

  const { searchBooks, isLoading, error } = useGoogleBooksApi()

  const onSearch = async () => {
    if (!keyword) return

    const result = await searchBooks(keyword)
    if (result) {
      setSearchedBooks(result)
    }
  }

  const onSelectBook = (book: any) => {
    form.setValue('book', {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.join(', '),
      description: book.volumeInfo.description,
      thumbnailLink: book.volumeInfo.imageLinks.thumbnail
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-row gap-2 items-center '>
          <TextField
            name='search'
            label='書籍名で検索'
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className='w-[400px]'
            size='small'
          />

          <LoadingButton
            fullWidth
            variant='contained'
            color='primary'
            startIcon={<RiSendPlaneLine />}
            onClick={onSearch}
            className='w-[150px]'
          >
            検索
          </LoadingButton>
        </div>
        <div className='flex justify-end'>
          <ToggleButton onChange={(value: 'list' | 'grid') => setDisplayType(value)} defaultValue='list'>
            <ToggleButtonItem value='list' icon={<TbLayoutList />} />
            <ToggleButtonItem value='grid' icon={<TbLayoutGrid />} />
          </ToggleButton>
        </div>
        {isLoading && <Typography>検索中...</Typography>}
        <Grid container spacing={6}>
          {searchedBooks?.items.map((item: any) =>
            displayType === 'list' ? (
              <Grid item xs={12} key={item.id}>
                <Card key={item.id} onClick={() => onSelectBook(item)} className='hover:bg-actionHover cursor-pointer'>
                  <CardContent>
                    <Grid container spacing={6}>
                      <Grid item xs={2}>
                        <img
                          src={item.volumeInfo?.imageLinks?.thumbnail}
                          alt={item.volumeInfo?.title}
                          className='w-32 object-center'
                        />
                      </Grid>
                      <Grid item container xs={10} spacing={4}>
                        <Grid item xs={12}>
                          <Typography variant='h4'>{item.volumeInfo?.title}</Typography>
                          <Typography variant='caption'>{item.volumeInfo.authors?.join(', ')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant='body2'>{item.volumeInfo?.description}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={3} key={item.id}>
                <Card
                  key={item.id}
                  onClick={() => onSelectBook(item)}
                  className='hover:bg-actionHover cursor-pointer h-80'
                >
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} className='flex justify-center'>
                        <img
                          src={item.volumeInfo?.imageLinks?.thumbnail}
                          alt={item.volumeInfo?.title}
                          className='h-44  object-center'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant='h6'>{item.volumeInfo?.title}</Typography>
                        <Typography variant='caption'>{item.volumeInfo.authors?.join(', ')}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}

          {/* No Data */}
          {((!isLoading && !searchedBooks) || searchedBooks?.items.length === 0) && (
            <Grid item xs={12}>
              <Typography>検索結果がありません</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
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
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
