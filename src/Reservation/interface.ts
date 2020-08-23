import { Moment, MomentInput } from 'moment'
import { isArray } from 'lodash'

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
export type CalendarValue = Moment | null

export function isSpecifiedDays(days?: Days): days is SpecifiedDays {
  return isArray(days)
}

export interface CalendarQuota {
  day: MomentInput
  remaining: number
}

/// new ------

export type TimeUnit = [number, number]
export type TimeSection = { start: TimeUnit; end: TimeUnit }

export type TimeRange = [Moment, Moment]
export type TimeBucketValue = TimeRange | TimeRange[] | null

export function isListTimeBucket(value: TimeBucketValue): value is TimeRange[] {
  return isArray(value) && (value.length <= 0 || isArray(value[0]))
}

export interface TimeBucketQuota {
  start: MomentInput
  end: MomentInput
  remaining: number
}

export interface CellRendererProps {
  prefixCls: string
  isSelected: boolean
  isToday: boolean
  isStartDate: boolean
  isEndDate: boolean
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  isLastMonthDay: boolean
  isNextMonthDay: boolean
  isMakefull: boolean
  isSelectable: boolean
  isNotChecked: boolean
  currentDay: Moment
  remaining?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isDisabled?: boolean, isSelected?: boolean) => void
  className?: string
}
