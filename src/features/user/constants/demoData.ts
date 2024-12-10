import type { TenantUser } from '../types/TenantUser'

export const postDemoData: TenantUser[] = [
  {
    id: 1,
    name: '山田　花子',
    email: 'hanako-yamada@gmail.com',
    roleId: 1,
    roleName: '管理者',
    tenantId: 1,
    tenantName: '株式会社ポスト',
    isActivated: true,
    lastLoginAt: '2021/10/01 10:22',
    createdAt: '2021/10/01',
    updatedAt: '2021/10/01'
  },
  {
    id: 1,
    name: '山田　太郎',
    email: 'tarou-yamada@gmail.com',
    roleId: 1,
    roleName: 'スタッフ',
    tenantId: 1,
    tenantName: '株式会社ポスト',
    isActivated: false,
    lastLoginAt: '2021/10/01 10:22',
    createdAt: '2021/10/01',
    updatedAt: '2021/10/01'
  }
]
