import { Moment } from 'moment'
import { isArray } from 'lodash'

export type CalendarValue = Moment | null

export interface RepeatDaysByWeek {
  availableWeeks: number[]
  startDay?: Moment
  endDay?: Moment
}

export type Days = Moment[]

export interface Calendar {
  prefixCls?: string
  value: CalendarValue
  onChange: (value: CalendarValue) => void
  availableDays: Days | RepeatDaysByWeek
}

export interface CalendarTableCommonProps extends Calendar {
  currentMonthIdx: number
  toNext: () => boolean
  toLast: () => boolean
}

export function isDays(availableDays: Days | RepeatDaysByWeek): availableDays is Days {
  return isArray(availableDays)
}
