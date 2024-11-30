import type { IconBaseProps } from 'react-icons'
import { CiMail } from 'react-icons/ci'
import { FaPlus, FaRegUser, FaSave } from 'react-icons/fa'
import { IoMdBook, IoMdEye, IoMdTrash } from 'react-icons/io'
import { IoSettingsOutline } from 'react-icons/io5'
import { LuRefreshCcwDot } from 'react-icons/lu'
import {
  MdModeEditOutline,
  MdOutlineDisplaySettings,
  MdOutlinePermMedia,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished
} from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { TbCategoryPlus, TbReportMoney } from 'react-icons/tb'

interface IconProps extends IconBaseProps {}

////////////////////////////////////////////////////////////////////////////////////////////
// 機能用
////////////////////////////////////////////////////////////////////////////////////////////
const featureIconDefaultProps: IconProps = {
  size: 22
}

export const DashboardFeatureIcon = (props: IconProps) => <RxDashboard {...featureIconDefaultProps} {...props} />
export const PurchaseFeatureIcon = (props: IconProps) => <TbReportMoney {...featureIconDefaultProps} {...props} />
export const CategoryFeatureIcon = (props: IconProps) => <TbCategoryPlus {...featureIconDefaultProps} {...props} />
export const MediaFeatureIcon = (props: IconProps) => <MdOutlinePermMedia {...featureIconDefaultProps} {...props} />
export const StaffFeatureIcon = (props: IconProps) => <FaRegUser {...featureIconDefaultProps} {...props} />
export const GeneralSettingFeatureIcon = (props: IconProps) => (
  <IoSettingsOutline {...featureIconDefaultProps} {...props} />
)
export const HomepageSettingFeatureIcon = (props: IconProps) => (
  <MdOutlineDisplaySettings {...featureIconDefaultProps} {...props} />
)
export const UsageFeatureIcon = (props: IconProps) => <IoMdBook {...featureIconDefaultProps} {...props} />
export const ContactFeatureIcon = (props: IconProps) => <CiMail {...featureIconDefaultProps} {...props} />

////////////////////////////////////////////////////////////////////////////////////////////
// よく使うアイコン
////////////////////////////////////////////////////////////////////////////////////////////
export const NewIcon = (props: IconProps) => <FaPlus {...props} />
export const EditIcon = (props: IconProps) => <MdModeEditOutline {...props} />
export const DeleteIcon = (props: IconProps) => <IoMdTrash {...props} />
export const DetailIcon = (props: IconProps) => <IoMdEye {...props} />
export const SaveIcon = (props: IconProps) => <FaSave {...props} />
export const RefreshIcon = (props: IconProps) => <LuRefreshCcwDot {...props} />
export const PublishedIcon = (props: IconProps) => <MdOutlinePublishedWithChanges {...props} />
export const UnPublishedIcon = (props: IconProps) => <MdOutlineUnpublished {...props} />
