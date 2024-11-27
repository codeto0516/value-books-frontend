import type { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import AccountSettings from '..'
import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { GeneralSettingFeatureIcon } from '@/shared/components/icon'

const AccountTab = dynamic(() => import('@/features/general-setting/account'))

const SecurityTab = dynamic(() => import('@/features/general-setting/security'))

// const BillingPlansTab = dynamic(() => import('@/features/general-setting/billing-plans'))
const NotificationsTab = dynamic(() => import('@/features/general-setting/notifications'))

// const ConnectionsTab = dynamic(() => import('@/features/general-setting/connections'))

const tabContentList = (): { [key: string]: ReactElement } => ({
  account: <AccountTab />,

  security: <SecurityTab />,

  // 'billing-plans': <BillingPlansTab />,
  notifications: <NotificationsTab />

  // connections: <ConnectionsTab />
})

export const GeneralSettingPage = () => {
  return (
    <PageLayout
      icon={<GeneralSettingFeatureIcon />}
      title='一般設定'
      breadcrumb={[{ label: '一般設定', href: '/setting/general' }]}
    >
      <AccountSettings tabContentList={tabContentList()} />
    </PageLayout>
  )
}
