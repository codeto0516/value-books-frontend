import type { VerticalMenuDataType } from '@/shared/types/menuTypes'
import {
  DashboardFeatureIcon,
  PostFeatureIcon,
  CategoryFeatureIcon,
  MediaFeatureIcon,
  StaffFeatureIcon,
  GeneralSettingFeatureIcon,
  HomepageSettingFeatureIcon,
  UsageFeatureIcon,
  ContactFeatureIcon
} from '@/shared/components/icon'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'ダッシュボード',
    href: '/',
    icon: <DashboardFeatureIcon />
  },
  {
    label: '機能一覧',
    isSection: true,
    children: [
      {
        label: '記事投稿管理',
        href: '/post',
        icon: <PostFeatureIcon />
      },
      {
        label: 'カテゴリー管理',
        href: '/category',
        icon: <CategoryFeatureIcon />
      },
      {
        label: 'メディア管理',
        href: '/media',
        icon: <MediaFeatureIcon />
      },
      {
        label: 'スタッフ管理',
        href: '/staff',
        icon: <StaffFeatureIcon />
      }
    ]
  },
  {
    label: '各種設定',
    isSection: true,
    children: [
      {
        label: '一般設定',
        href: '/setting/general',
        icon: <GeneralSettingFeatureIcon />
      },
      {
        label: 'ホームページ設定',
        href: '/setting/homepage',
        icon: <HomepageSettingFeatureIcon />
      }
    ]
  },
  {
    label: 'その他',
    isSection: true,
    children: [
      {
        label: '使い方ガイド',
        href: '/usage',
        icon: <UsageFeatureIcon />
      },
      {
        label: 'お問い合わせ',
        href: '/contact',
        icon: <ContactFeatureIcon />
      }
    ]
  }
]

export default verticalMenuData
