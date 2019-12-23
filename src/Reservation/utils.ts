import moment, { Moment } from 'moment'
import { MAX_SHOW_QUOTA, DATE_COL_COUNT, DATE_ROW_COUNT } from './constants'
import { TimeRange, SpecifiedDays, WeekCode, CellStatus } from './interface'
import { isNil, map, isEmpty, findIndex, includes } from 'lodash'

export const isSameDay = (one: Moment, two?: Moment | null) => one && !!two && one.isSame(two, 'day')
export const isSameMonth = (one: Moment, two?: Moment | null) => one && !!two && one.isSame(two, 'month')

export const beforeCurrentMonthYear = (current: Moment, today: Moment): boolean => {
  if (current.year() < today.year()) {
    return true
  }
  return current.year() === today.year() && current.month() < today.month()
}

export const afterCurrentMonthYear = (current: Moment, today: Moment): boolean => {
  if (current.year() > today.year()) {
    return true
  }
  return current.year() === today.year() && current.month() > today.month()
}

export const formatRemainingQuota = (remainingQuota: number) => {
  return remainingQuota > MAX_SHOW_QUOTA ? MAX_SHOW_QUOTA + '+' : remainingQuota
}

export type WeekDay = {
  week: string
  date: Moment
}

export const gainWeekDays = (startDay: Moment, weekIdx: number): WeekDay[] => {
  const localeData = startDay.localeData()
  const weekDays: WeekDay[] = []
  const firstDayOfWeek = localeData.firstDayOfWeek()

  for (let dateColIndex = 0; dateColIndex < DATE_COL_COUNT; dateColIndex++) {
    const index = (firstDayOfWeek + dateColIndex) % (DATE_COL_COUNT + 1)
    const now = startDay.clone()
    now.day(index + weekIdx * 7)
    weekDays[dateColIndex] = { week: localeData.weekdaysShort(now), date: now.clone().startOf('day') }
  }

  return weekDays
}

export const gainCurrentDay = (startDay: Moment, dayIdx: number) => {
  const now = startDay.clone()
  now.day(dayIdx)

  return now
}

export interface TimeSection {
  range: TimeRange
  date: Moment
}
export const gainTimeSections = (startDay: Moment, dayIdx: number, ranges: TimeRange[]): TimeSection[] => {
  const now = gainCurrentDay(startDay, dayIdx)

  return map(ranges, (range) => ({ range, date: now }))
}

export type MonthDay = {
  date: Moment
  month: string
}

export type MonthDays = {
  monthDays: MonthDay[]
  firstMonthDay: Moment
  lastMonthDay: Moment
}

export const gainMonthDays = (startDay: Moment, monthIdx: number): MonthDays => {
  const localeData = startDay.localeData()
  const monthDays: MonthDay[] = []
  const currentDay = startDay.clone().month(monthIdx + startDay.month())

  const firstMonthDay = currentDay.clone().startOf('month') // 当前月的第一天
  const lastMonthDay = currentDay.clone().endOf('month') // 当前月的最后一天

  const month1 = currentDay.clone()
  month1.date(1)
  const day = month1.day()
  const lastMonthDiffDay = (day + 7 - currentDay.localeData().firstDayOfWeek()) % 7

  // calculate last month
  const lastMonth1 = month1.clone()
  lastMonth1.add(0 - lastMonthDiffDay, 'days')

  let passed = 0
  let current: moment.Moment

  for (let iIndex = 0; iIndex < DATE_ROW_COUNT; iIndex++) {
    for (let jIndex = 0; jIndex < DATE_COL_COUNT; jIndex++) {
      current = lastMonth1
      if (passed) {
        current = current.clone()
        current.add(passed, 'days')
      }

      monthDays.push({
        month: localeData.monthsShort(current),
        date: current,
      })
      passed++
    }
  }

  return { monthDays, firstMonthDay, lastMonthDay }
}

export const gainDateTimeRange = (current: Moment, timeRange: TimeRange): [Moment, Moment] => {
  const { start: startTime, end: endTime } = timeRange

  const startDateTime = current
    .clone()
    .hour(startTime[0])
    .minute(startTime[1])
  const endDateTime = current
    .clone()
    .hour(endTime[0])
    .minute(endTime[1])

  return [startDateTime, endDateTime]
}

export const formatTimeRange = (timeRange: TimeRange): string => {
  const { start: startTime, end: endTime } = timeRange

  return `${startTime[0]}:${startTime[1]}-${endTime[0]}:${endTime[1]}`
}

export const isNotCheckedFun = (
  currentDay: Moment,
  {
    specifiedDays,
    disabledWeeks,
    disabledDays,
  }: { specifiedDays?: SpecifiedDays; disabledDays?: moment.Moment[]; disabledWeeks?: WeekCode[] }
) => {
  let isNotChecked
  if (!isEmpty(specifiedDays)) {
    isNotChecked = findIndex(specifiedDays, (day) => isSameDay(day, currentDay)) === -1
  } else {
    isNotChecked =
      includes(disabledWeeks, currentDay.day()) || findIndex(disabledDays, (day) => isSameDay(day, currentDay)) !== -1
  }

  return isNotChecked
}

export const gainCellCls = (baseCls: string, options?: CellStatus): string => {
  let cls = baseCls

  if (isNil(options)) {
    return cls
  }

  if (options.isToday) {
    cls += ` is-today`
  }

  if (options.isLastMonthDay) {
    cls += ` is-last-month-day`
  }

  if (options.isNextMonthDay) {
    cls += ` is-next-month-day`
  }

  if (options.isStartDate) {
    cls += ` is-start-date`
  }

  if (options.isEndDate) {
    cls += ` is-end-date`
  }

  if (options.isBeforeStartDay) {
    cls += ` is-before-start-day`
  }

  if (options.isAfterEndDay) {
    cls += ` is-after-end-day`
  }

  if (options.isBeforeStartDayMinute) {
    cls += ` is-before-start-minute`
  }

  if (options.isAfterEndDayMinute) {
    cls += ` is-after-end-minute`
  }

  if (options.isMakefull) {
    cls += ` is-make-full`
  }

  if (options.isALittleRemaining) {
    cls += ` is-a-little-remaining`
  }

  if (options.isSelectable) {
    cls += ` is-selectable`
  }

  if (options.isNotChecked) {
    cls += ` is-not-checked`
  }

  if (options.isSelected) {
    cls += ` is-selected`
  }

  return cls
}
