'use client'

import { Avatar, Button, Checkbox, Chip } from '@mui/material'
import type { Column, Row, Table } from '@tanstack/react-table'
import { RiSortAsc, RiSortDesc } from 'react-icons/ri'
import type { ReactNode } from 'react'
import React from 'react'
import { cn } from '@/shared/utils/cn'
import { convertDateToText } from '@/shared/utils/dateUtils/convertDateToText'

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Header Props
/////////////////////////////////////////////////////////////////////////////////////////////////////////
interface HeaderProps<TData> {
  variant?: 'text' | 'checkbox'
  align?: Align
  value?: string | ReactNode
  sortable?: boolean
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cell Props
/////////////////////////////////////////////////////////////////////////////////////////////////////////
interface AllData<TData> {
  value: string
  row: Row<TData>
  column: Column<TData>
  table: Table<TData>
}

interface BaseCellProps {
  align?: Align
  className?: string
}

interface TextCellProps<TData> extends BaseCellProps {
  variant: 'text'
  value?: string
  defaultValue?: string
  transform?: (props: AllData<TData>) => ReactNode
}

interface NumberCellProps<TData> extends BaseCellProps {
  variant: 'number'
  value?: number
  defaultValue?: number
  transform?: (props: AllData<TData>) => ReactNode
}

interface DateCellProps<TData> extends BaseCellProps {
  variant: 'date'
  value?: Date | string
  defaultValue?: Date | string
  transform?: (props: AllData<TData>) => ReactNode
  format?: string
}

interface CheckboxCellProps<TData> extends BaseCellProps {
  variant: 'checkbox'
}

type ChipColor = 'primary' | 'secondary' | 'default' | 'error' | 'warning' | 'info' | 'success'
type ChipVariant = 'filled' | 'outlined' | 'tonal'
type ChipSize = 'small' | 'medium'
interface ChipCellProps<TData> extends BaseCellProps {
  variant: 'chip'
  value?: string | ReactNode
  defaultValue?: string | ReactNode
  chipProps:
    | {
        color?: ChipColor
        variant?: ChipVariant
        size?: ChipSize
        onClick?: (props: AllData<TData>) => void
      }
    | ((props: AllData<TData>) => {
        color?: ChipColor
        variant?: ChipVariant
        size?: ChipSize
        onClick?: (props: AllData<TData>) => void
      })
}

interface UserCellProps<TData> extends BaseCellProps {
  variant: 'avatar'
  value?: string
  defaultValue?: string
  transform?: (props: AllData<TData>) => ReactNode
  src?: string // Link
  avatarProps?:
    | {
        size?: number
      }
    | ((props: AllData<TData>) => {
        size?: number
      })
}

interface ActionCellProps<TData> extends BaseCellProps {
  variant: 'action'
  actions: (props: AllData<TData>) => ReactNode[]
}

type CellProps<TData> =
  | TextCellProps<TData>
  | NumberCellProps<TData>
  | DateCellProps<TData>
  | CheckboxCellProps<TData>
  | ChipCellProps<TData>
  | UserCellProps<TData>
  | ActionCellProps<TData>

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * このカスタムフックはColumnDefでよく使用する関数をまとめたものです。
 * チェックボックスなどの共通の関数をまとめています。
 */
export const useColumnDef = <TData,>() => {
  return {
    header: ({ variant = 'text', align = 'left', value, sortable }: HeaderProps<TData>) => {
      return ({ column, table }: { column: Column<TData>; table: Table<TData> }) => {
        if (variant === 'checkbox') {
          return (
            <div className={cn(getTextAlignClass(align))}>
              <Checkbox
                {...{
                  role: 'checkbox',
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler()
                }}
              />
            </div>
          )
        }

        const formattedValue =
          typeof value === 'string'
            ? value.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))
            : value // ReactElementの場合はそのまま使う

        if (sortable === true) {
          return (
            <div className={cn(getTextAlignClass(align))}>
              <Button
                variant='text'
                color='inherit'
                endIcon={<SortIcon ascOrDesc={column.getIsSorted()} />}
                onClick={column.getToggleSortingHandler()}
                className='whitespace-break-spaces leading-snug text-sm break-words'
                size='small'
                sx={{
                  padding: '0.2rem 0.5rem',
                  minWidth: 30
                }}
              >
                {formattedValue}
              </Button>
            </div>
          )
        }

        return <div className={cn(getTextAlignClass(align))}>{formattedValue}</div>
      }
    },
    cell: (props: CellProps<TData>) => {
      return ({ row, column, table }: { row: Row<TData>; column: Column<TData>; table: Table<TData> }) => {
        switch (props.variant) {
          case 'action':
            return (
              <div className={cn(getFlexAlignClass(props.align), 'flex flex-row gap-0.5 items-center')}>
                {props.actions({ value: '', row, column, table })}
              </div>
            )

          case 'checkbox':
            return (
              <div className={cn(getTextAlignClass(props.align))}>
                <Checkbox
                  role='checkbox'
                  checked={row.getIsSelected()}
                  disabled={!row.getCanSelect()}
                  indeterminate={row.getIsSomeSelected()}
                  onChange={row.getToggleSelectedHandler()}
                />
              </div>
            )

          case 'chip':
            const convertedValue = row.getValue(column.id) as string
            const chipProps =
              typeof props.chipProps === 'function'
                ? props.chipProps({ value: convertedValue, row, column, table })
                : props.chipProps

            return (
              <div className={cn(getTextAlignClass(props.align))}>
                <Chip
                  label={props.value || props.defaultValue || convertedValue}
                  color={chipProps?.color ?? 'default'}
                  variant={chipProps?.variant ?? 'tonal'}
                  size={chipProps?.size ?? 'small'}
                  onClick={
                    chipProps?.onClick
                      ? () => chipProps?.onClick?.({ value: convertedValue, row, column, table })
                      : undefined
                  }
                />
              </div>
            )

          case 'avatar': {
            const convertedValue = row.getValue(column.id) as string
            const avatarProps =
              typeof props.avatarProps === 'function'
                ? props.avatarProps({ value: convertedValue, row, column, table })
                : props.avatarProps

            return (
              <div className={cn(getFlexAlignClass(props.align), 'flex items-center gap-2')}>
                <Avatar
                  src={props.src}
                  sx={{
                    width: avatarProps?.size ?? 24,
                    height: avatarProps?.size ?? 24
                  }}
                />
                {convertedValue}
              </div>
            )
          }

          case 'number': {
            const convertedValue = convertNumberText(row.getValue(column.id))

            return (
              <div className={cn(getTextAlignClass(props.align))}>
                {props.transform
                  ? props.transform({ value: convertedValue, row, column, table })
                  : props.value || props.defaultValue || convertedValue}
              </div>
            )
          }

          case 'date': {
            const convertedValue = convertDateToText(row.getValue(column.id))

            return (
              <div className={cn(getTextAlignClass(props.align))}>
                {props.transform
                  ? props.transform({ value: convertedValue, row, column, table })
                  : convertDateToText(props.value) || convertDateToText(props.defaultValue) || convertedValue}
              </div>
            )
          }

          case 'text': {
            const convertedValue = row.getValue(column.id) as string

            return (
              <div className={cn(getTextAlignClass(props.align), 'whitespace-break-spaces')}>
                {props.transform
                  ? props.transform({ value: convertedValue, row, column, table })
                  : props.value || props.defaultValue || convertedValue}
              </div>
            )
          }

          default:
            return null
        }
      }
    }
  }
}

type Align = 'left' | 'center' | 'right'
function getTextAlignClass(align: Align | null | undefined, defaultAlign?: Align): string {
  switch (align) {
    case 'left':
      return '!text-left'
    case 'center':
      return '!text-center'
    case 'right':
      return '!text-right'
    default:
      return defaultAlign ?? '!text-left'
  }
}

function getFlexAlignClass(align: Align | null | undefined): string {
  switch (align) {
    case 'left':
      return '!justify-start'
    case 'center':
      return '!justify-center'
    case 'right':
      return '!justify-end'
    default:
      return '!justify-start'
  }
}

function convertNumberText(value: unknown): string {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value !== 'number') {
    return value.toString()
  }

  return value.toLocaleString()
}

/**
 * column.getIsSorted()がfalseの時はアイコンをうすくする
 * column.getIsSorted()がascの時は、ascアイコンを表示
 * column.getIsSorted()がdescの時は、descアイコンを表示
 */
const SortIcon = ({ ascOrDesc }: { ascOrDesc: 'asc' | 'desc' | false }) => {
  switch (ascOrDesc) {
    case 'asc':
      return <RiSortAsc size={12} />
    case 'desc':
      return <RiSortDesc size={12} />
    case false:
      return <RiSortAsc size={12} className='opacity-30' />
  }
}
