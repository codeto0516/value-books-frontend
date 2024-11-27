'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const AccountSettings = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  // States
  const [activeTab, setActiveTab] = useState('account')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab label='アカウント' icon={<i className='ri-group-line' />} iconPosition='start' value='account' />
            <Tab
              label='パスワード変更'
              icon={<i className='ri-lock-unlock-line' />}
              iconPosition='start'
              value='security'
            />
            <Tab
              label='請求とプラン'
              icon={<i className='ri-bookmark-line' />}
              iconPosition='start'
              value='billing-plans'
            />
            <Tab
              label='通知'
              icon={<i className='ri-notification-3-line' />}
              iconPosition='start'
              value='notifications'
            />
            <Tab label='連携' icon={<i className='ri-link' />} iconPosition='start' value='connections' />
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default AccountSettings
