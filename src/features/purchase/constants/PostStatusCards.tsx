import CustomAvatar from '@/base/@core/components/mui/Avatar'
import type { ThemeColor } from '@/base/@core/types'
import { PublishedIcon } from '@/shared/components/icon'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import type { ReactElement } from 'react'
import { MdOutlineApproval } from 'react-icons/md'
import { RiDraftLine, RiCalendarScheduleLine } from 'react-icons/ri'

export type PostStatusCard = {
  title: string
  stats: number
  icon: ReactElement
  color?: ThemeColor
}

const data: PostStatusCard[] = [
  {
    title: '公開中',
    stats: 15,
    icon: <PublishedIcon size={22} />,
    color: 'success'
  },
  {
    title: '下書き',
    stats: 5,
    icon: <RiDraftLine size={22} />,
    color: 'secondary'
  },
  {
    title: '承認待ち',
    stats: 3,
    icon: <MdOutlineApproval size={22} />,
    color: 'info'
  },
  {
    title: '予約投稿',
    stats: 1,
    icon: <RiCalendarScheduleLine size={22} />,
    color: 'warning'
  }
]

export const PostStatusCards = () => {
  return data.map((item, i) => (
    <Grid key={i} item xs={12} sm={6} md={3}>
      <PostStatusCard {...item} />
    </Grid>
  ))
}

const PostStatusCard = (props: PostStatusCard) => {
  // Props
  const { title, stats, icon, color } = props

  return (
    <Card>
      <CardContent className='flex justify-between gap-1'>
        <div className='flex flex-col gap-1 flex-grow'>
          <Typography color='text.primary'>{title}</Typography>
          <div className='flex items-center gap-2 flex-wrap'>
            <Typography variant='h4'>{stats.toLocaleString()} 記事</Typography>
          </div>
          <Typography variant='body2' className='cursor-pointer text-primary'>
            「{title}」で絞り込む
          </Typography>
        </div>
        <CustomAvatar color={color} skin='light' variant='rounded' size={42}>
          {icon}
        </CustomAvatar>
      </CardContent>
    </Card>
  )
}
