import dayjs from 'dayjs'

export type DateFormat = 'YYYY/MM/DD' | 'YYYY/MM/DD HH:mm:ss'

export function convertDateToText(date: Date | string | null | undefined, format?: DateFormat): string {
  if (date === null || date === undefined) {
    return ''
  }

  if (typeof date === 'string' && dayjs(date).isValid() === false) {
    return ''
  }

  return dayjs(date).format(format ?? 'YYYY/MM/DD')
}
