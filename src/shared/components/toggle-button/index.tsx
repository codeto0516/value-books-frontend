// React Imports
import { createContext, useState } from 'react'
import type { MouseEvent } from 'react'

// MUI Imports
import MuiToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

// export const ButtonToggleBasic = () => {
//   return (
//     <ToggleButtonGroup exclusive value={alignment} onChange={handleAlignment} aria-label='text alignment'>
//       <MuiToggleButton value='left' aria-label='left aligned'>
//         <i className='ri-align-left' />
//       </MuiToggleButton>
//       <MuiToggleButton value='center' aria-label='center aligned'>
//         <i className='ri-align-center' />
//       </MuiToggleButton>
//       <MuiToggleButton value='right' aria-label='right aligned'>
//         <i className='ri-align-right' />
//       </MuiToggleButton>
//       <MuiToggleButton value='justify' aria-label='justified' disabled>
//         <i className='ri-align-justify' />
//       </MuiToggleButton>
//     </ToggleButtonGroup>
//   )
// }

const ToggleButtonContext = createContext({
  key: null,
  setKey: () => {}
})

export const ToggleButton = <ListType,>({
  children,
  onChange,
  defaultValue
}: {
  children: React.ReactNode
  onChange?: (value: ListType) => void
  defaultValue: ListType
}) => {
  // States
  const [key, setKey] = useState<ListType>(defaultValue)

  const onChangeKey = (event: MouseEvent<HTMLElement>, value: ListType | null) => {
    if (value !== null) {
      setKey(value)
      onChange && onChange(value)
    } else {
      // 値が null になった場合はデフォルト値に戻す
      setKey(defaultValue)
      onChange && onChange(defaultValue)
    }
  }

  return (
    <ToggleButtonGroup exclusive value={key} onChange={onChangeKey} aria-label='text'>
      {children}
    </ToggleButtonGroup>
  )
}

export const ToggleButtonItem = ({ value, icon }: { value: string; icon: React.ReactElement }) => {
  return (
    <MuiToggleButton value={value} aria-label='left aligned'>
      {icon}
    </MuiToggleButton>
  )
}
