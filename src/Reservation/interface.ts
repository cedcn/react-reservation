import { Moment, MomentInput } from 'moment'
import { isArray } from 'lodash'
import { CalendarQuota } from './components/Calendar'
import { CalendarCellProps } from './components/CalendarCell'

export type WeekCode = 0 | 1 | 2 | 3 | 4 | 5 | 6
export enum OffsetUnit {
  Day = 'day',
  Hour = 'hour',
  Month = 'month',
}
export type Offset = {
  value: number
  unit: OffsetUnit
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

export function isSpecifiedDays(days?: Days): days is SpecifiedDays {
  return isArray(days)
}

export type ByDayQuota = CalendarQuota
export type ByDayCellProps = CalendarCellProps

export type TimeUnit = [number, number]
export type TimeSection = { start: TimeUnit; end: TimeUnit }

export type SameSectionRanges = TimeSection[]
export type DiffSectionRanges = {
  monday?: TimeSection[]
  tuesday?: TimeSection[]
  wednesday?: TimeSection[]
  thursday?: TimeSection[]
  friday?: TimeSection[]
  saturday?: TimeSection[]
  sunday?: TimeSection[]
}
export type SectionRanges = SameSectionRanges | DiffSectionRanges

export function isSameSectionRanges(ranges: SectionRanges): ranges is SameSectionRanges {
  return isArray(ranges)
}

export type TimeRange = [Moment, Moment]
export type TimeBucketValue = TimeRange | TimeRange[] | null

export function isListTimeBucket(value: TimeBucketValue): value is TimeRange[] {
  return isArray(value) && (value.length <= 0 || isArray(value[0]))
}

export interface ByTimeBucketQuota {
  start: MomentInput
  end: MomentInput
  remaining: number
}

export interface ByTimeBucketCellProps {
  prefixCls: string
  isSelected: boolean
  isToday: boolean
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  isSelectable: boolean
  isNotChecked: boolean
  day: Moment
  remaining?: number
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isDisabled?: boolean, isSelected?: boolean) => void
  className?: string
  startTime: Moment
  endTime: Moment
}
