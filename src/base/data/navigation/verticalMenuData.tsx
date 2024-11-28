import type { VerticalMenuDataType } from '@/shared/types/menuTypes'
import {
  DashboardFeatureIcon,
  PostFeatureIcon,
  CategoryFeatureIcon,
  MediaFeatureIcon,
  StaffFeatureIcon
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
          label: '機能一覧',
          isSection: true,
          children: [
            {
              label: '購入管理',
              href: '/purchase',
              icon: <PostFeatureIcon />
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
        }
      ]
    : [
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
              label: '購入管理',
              href: '/post',
              icon: <TbReportMoney />
            },
            {
              label: '書籍管理',
              href: '/category',
              icon: <IoMdBook />
            },
            {
              label: 'タグ管理',
              href: '/category',
              icon: <CiShoppingTag />
            }
          ]
        }
      ]

export default verticalMenuData
