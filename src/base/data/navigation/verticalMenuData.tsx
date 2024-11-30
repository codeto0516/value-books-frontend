import type { VerticalMenuDataType } from '@/shared/types/menuTypes'
import {
  DashboardFeatureIcon,
  CategoryFeatureIcon,
  MediaFeatureIcon,
  StaffFeatureIcon,
  PurchaseFeatureIcon
} from '@/shared/components/icon'
import { CiShoppingTag } from 'react-icons/ci'
import { IoMdBook } from 'react-icons/io'
import { TbReportMoney } from 'react-icons/tb'

const verticalMenuData = ({ isAdmin }: { isAdmin: boolean }): VerticalMenuDataType[] =>
  isAdmin
    ? [
        {
          label: 'ダッシュボード',
          href: 'admin/',
          icon: <DashboardFeatureIcon />
        },
        {
          label: '購入管理',
          href: '/purchase',
          icon: <PurchaseFeatureIcon />
        },
        {
          label: '書籍管理',
          href: '/book',
          icon: <CategoryFeatureIcon />
        },
        {
          label: '予算管理',
          href: '/budget',
          icon: <MediaFeatureIcon />
        },
        {
          label: '社員管理',
          href: '/employee',
          icon: <StaffFeatureIcon />
        }
      ]
    : [
        {
          label: 'ダッシュボード',
          href: '/',
          icon: <DashboardFeatureIcon />
        },
        {
          label: '購入管理',
          href: '/purchase',
          icon: <TbReportMoney />
        },
        {
          label: '書籍管理',
          href: '/book',
          icon: <IoMdBook />
        },
        {
          label: 'タグ管理',
          href: '/tag',
          icon: <CiShoppingTag />
        }
      ]

export default verticalMenuData
