import { Moment } from 'moment'
import { isArray } from 'lodash'

export type CalendarValue = Moment | null
export type WeekCode = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Theme = any

export type SpecifiedDays = Moment[]

export interface RepeatDaysByWeek {
  disabledWeeks?: WeekCode[]
  disabledDays?: Moment[]
  startDay?: Moment
  endDay?: Moment
}

export type Days = SpecifiedDays | RepeatDaysByWeek

export interface Calendar {
  prefixCls?: string
  value: CalendarValue
  onChange: (value: CalendarValue) => void
  days?: Days
}

export interface CalendarTableCommonProps {
  currentMonthIdx: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value: CalendarValue
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange: (value: CalendarValue) => void
  toNext: () => boolean
  toLast: () => boolean
}

export interface CellStatus {
  isMakefull?: boolean
  isSelectable?: boolean
  isBeforeStartDayMinute?: boolean
  isAfterEndDayMinute?: boolean
  isBeforeStartDay?: boolean
  isAfterEndDay?: boolean
  isSelected?: boolean
  isNotChecked?: boolean
  isToday?: boolean
  isStartDate?: boolean
  isEndDate?: boolean
  isLastMonthDay?: boolean
  isNextMonthDay?: boolean
}

export function isSpecifiedDays(days?: Days): days is SpecifiedDays {
  return isArray(days)
}
