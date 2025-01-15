import { IconButton, Tooltip } from '@mui/material'
import {
  DeleteIcon,
  DetailIcon,
  DotMenuIcon,
  EditIcon,
  PublishedIcon,
  RefreshIcon,
  SaveIcon,
  UnPublishedIcon
} from '../icon'

interface BasicAbstractIconButtonProps extends React.ComponentProps<typeof IconButton> {
  icon: React.ReactNode
  tooltip?: string
}

const BasicAbstractIconButton = (props: BasicAbstractIconButtonProps) => {
  return (
    <Tooltip title={props.tooltip ?? ''}>
      <IconButton {...props}>{props.icon}</IconButton>
    </Tooltip>
  )
}

//////////////////////////////////////////////////////////////////////////////////
// Usage
//////////////////////////////////////////////////////////////////////////////////
interface BasicIconButtonProps extends Omit<BasicAbstractIconButtonProps, 'icon'> {}

export const NewIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='作成' icon={<SaveIcon />} {...props} />
)

export const EditIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='編集' icon={<EditIcon />} {...props} />
)

export const DeleteIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='削除' icon={<DeleteIcon />} {...props} />
)

export const DetailIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='詳細' icon={<DetailIcon />} {...props} />
)

export const SaveIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='保存' icon={<SaveIcon />} {...props} />
)

export const RefreshIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='更新' icon={<RefreshIcon />} {...props} />
)

export const PublishedIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='公開' icon={<PublishedIcon />} {...props} />
)

export const UnPublishedIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='非公開' icon={<UnPublishedIcon />} {...props} />
)

export const DotMenuIconButton = (props: BasicIconButtonProps) => (
  <BasicAbstractIconButton tooltip='メニュー' icon={<DotMenuIcon />} {...props} />
)
