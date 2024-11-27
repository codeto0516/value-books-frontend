'use client'

import { PostFeatureIcon } from '@/shared/components/icon'
import { PageLayout } from '@/shared/components/layout/page/PageLayout'
import { PostEditForm } from '../components/PostEditForm'

export const PostEditPage = () => {
  return (
    <PageLayout icon={<PostFeatureIcon />} title='記事投稿管理' breadcrumb={[{ label: '記事投稿管理', href: '/post' }]}>
      <PostEditForm />
    </PageLayout>
  )
}
