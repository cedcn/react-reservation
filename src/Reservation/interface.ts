import { ReactNode } from 'react'
import { Moment } from 'moment'
import { isArray } from 'lodash'
import { WeekDay, TimeSection } from './utils'

export type WeekCode = 0 | 1 | 2 | 3 | 4 | 5 | 6

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
export type CalendarCellRenderFun = ({
  date,
  status,
  remaining,
}: {
  date: Moment
  status: CellStatus
  remaining?: number
}) => ReactNode

export interface Calendar {
  prefixCls?: string
  value?: CalendarValue
  onChange: (value: CalendarValue) => void
  days?: Days
  advance?: number | boolean
  quotas?: CalendarQuota[] | ((startDay: Moment, endDay: Moment) => CalendarQuota[])
  cellRender?: CalendarCellRenderFun
}

export interface CalendarTableCommonProps {
  currentMonthIdx: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: CalendarValue
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange: (value: CalendarValue) => void
  toNext: () => boolean
  toLast: () => boolean
  quotas?: CalendarQuota[] | ((startDay: Moment, endDay: Moment) => CalendarQuota[])
  advance?: number | boolean
  cellRender?: CalendarCellRenderFun
}

//
export type TimeBucketValue = [Moment, Moment] | null | undefined

export interface TimeRange {
  start: [number, number]
  end: [number, number]
}

export interface TimeBucketQuota {
  start: Moment
  end: Moment
  remaining: number
}

export type TimeBucketCellRenderFun = ({
  section,
  status,
  remaining,
}: {
  section: TimeSection
  status: CellStatus
  remaining?: number
}) => ReactNode

export interface TimeBucket {
  prefixCls?: string
  value?: TimeBucketValue
  onChange: (value: TimeBucketValue) => void
  days?: Days
  ranges: TimeRange[]
  mode?: 'tabs' | 'table'
  quotas?: TimeBucketQuota[] | ((startDay: Moment, endDay: Moment) => TimeBucketQuota[])
  advance?: number | boolean
  cellRender?: TimeBucketCellRenderFun
}

export interface TimeBucketTableCommonProps {
  currentWeekIdx: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: TimeBucketValue
  weekDays: WeekDay[]
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  setCurrentWeekIdx: any
  disabledDays?: Moment[]
  onChange: (value: TimeBucketValue) => void
  ranges: TimeRange[]
  toNext: () => boolean
  toLast: () => boolean
  quotas?: TimeBucketQuota[]
  advance?: number | boolean
  cellRender?: TimeBucketCellRenderFun
}

export function isSpecifiedDays(days?: Days): days is SpecifiedDays {
  return isArray(days)
}
