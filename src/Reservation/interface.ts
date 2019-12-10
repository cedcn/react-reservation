import { Moment } from 'moment'
import { isArray } from 'lodash'

export type CalendarValue = Moment | null
export type WeekCode = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface RepeatDaysByWeek {
  availableWeeks: WeekCode[]
  startDay?: Moment
  endDay?: Moment
}

export type FixedDays = Moment[]

export interface Calendar {
  prefixCls?: string
  value: CalendarValue
  onChange: (value: CalendarValue) => void
  days: FixedDays | RepeatDaysByWeek
}

export interface CalendarTableCommonProps {
  currentMonthIdx: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value: CalendarValue
  availableWeeks: WeekCode[]
  onChange: (value: CalendarValue) => void
  toNext: () => boolean
  toLast: () => boolean
}

export function isFixedDays(days: FixedDays | RepeatDaysByWeek): days is FixedDays {
  return isArray(days)
}
