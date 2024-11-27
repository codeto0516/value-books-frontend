// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// Component Imports
import Link from '@components/Link'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type TableDataType = {
  type: string
  email: boolean
  browser: boolean
}

// Vars
const tableData: TableDataType[] = [
  {
    email: true,
    browser: true,
    type: 'ユーザーによるログイン'
  },
  {
    email: true,
    browser: true,
    type: '新規記事投稿'
  },
  {
    email: true,
    browser: true,
    type: 'アカウント停止'
  }
]

const Notifications = () => {
  return (
    <Card>
      <CardHeader
        title='通知'
        subheader={
          <>
            通知を表示するにはブラウザからの許可が必要です。
            <Link className='text-primary'> 許可をリクエスト</Link>
          </>
        }
      />
      <form>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>通知の種類</th>
                <th>メールアドレス</th>
                <th>ブラウザ</th>
              </tr>
            </thead>
            <tbody className='border-be'>
              {tableData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <Typography color='text.primary'>{data.type}</Typography>
                  </td>
                  <td>
                    <Checkbox defaultChecked={data.email} />
                  </td>
                  <td>
                    <Checkbox defaultChecked={data.browser} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CardContent>
          <Typography className='mbe-6 font-medium'>通知タイミング</Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4}>
              <Select fullWidth defaultValue='online'>
                <MenuItem value='online'>ログイン時のみ</MenuItem>
                <MenuItem value='anytime'>常に</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                保存する
              </Button>
              <Button variant='outlined' color='secondary' type='reset'>
                リセット
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  )
}

export default Notifications
