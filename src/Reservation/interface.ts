import { Moment } from 'moment'
import { isArray } from 'lodash'
import { WeekDay } from './utils'

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

//
export type CalendarValue = Moment | null | undefined

export interface CalendarQuota {
  day: Moment
  remaining: number
}

export interface Calendar {
  prefixCls?: string
  value: CalendarValue
  onChange: (value: CalendarValue) => void
  days?: Days
  quotas?: CalendarQuota[]
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
  quotas?: CalendarQuota[]
}

//
export type TimeBucketsValue = [Moment, Moment] | null | undefined

export interface TimeRange {
  start: [number, number]
  end: [number, number]
}

export interface TimeBuckets {
  prefixCls?: string
  value: TimeBucketsValue
  onChange: (value: TimeBucketsValue) => void
  days?: Days
  ranges: TimeRange[]
  mode?: 'tabs' | 'table'
}

export interface TimeBucketsTableCommonProps {
  currentWeekIdx: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value: TimeBucketsValue
  weekDays: WeekDay[]
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  setCurrentWeekIdx: any
  disabledDays?: Moment[]
  onChange: (value: TimeBucketsValue) => void
  ranges: TimeRange[]
  toNext: () => boolean
  toLast: () => boolean
}

export interface CellStatus {
  isMakefull?: boolean
  isALittleRemaining?: boolean
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
