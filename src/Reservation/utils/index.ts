import moment, { Moment, unitOfTime } from 'moment'
import { MAX_SHOW_QUOTA, DATE_COL_COUNT, DATE_ROW_COUNT } from '../constants'
import { SpecifiedDays, WeekCode, TimeSection, TimeRange, Offset } from '../interface'
import { isNil, isEmpty, findIndex, includes, floor, isBoolean, isObject } from 'lodash'

export const getNow = () => moment()
export const isSameDay = (one: Moment, two?: Moment | null) => one && !!two && one.isSame(two, 'day')
export const isSameMonth = (one: Moment, two?: Moment | null) => one && !!two && one.isSame(two, 'month')

export const beforeCurrentMonthYear = (current: Moment, day: Moment): boolean => {
  if (current.year() < day.year()) {
    return true
  }
  return current.year() === day.year() && current.month() < day.month()
}

export const afterCurrentMonthYear = (current: Moment, day: Moment): boolean => {
  if (current.year() > day.year()) {
    return true
  }
  return current.year() === day.year() && current.month() > day.month()
}

export const formatRemainingQuota = (remainingQuota: number) => {
  return remainingQuota > MAX_SHOW_QUOTA ? MAX_SHOW_QUOTA + '+' : remainingQuota
}

export const isExpireFun = (day: Moment, advance?: Offset | boolean): boolean => {
  if (isNil(advance)) {
    return false
  }

  if (isBoolean(advance)) {
    if (advance) {
      return moment().isSameOrAfter(day, 'minute')
    } else {
      return false
    }
  }

  if (isObject(advance)) {
    return moment()
      .add(advance.value, advance.unit)
      .isSameOrAfter(day)
  }

  return false
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

export type WeekDay = {
  week: string
  date: Moment
  meta: {
    isToday: boolean
    isStartDay: boolean
    isEndDay: boolean
    isBeforeStartDay: boolean
    isAfterEndDay: boolean
    isNotChecked: boolean
  }
}

export const gainWeekDays = ({
  startDay,
  weekIdx,
  specifiedDays,
  disabledWeeks,
  disabledDays,
  endDay,
  advance,
}: {
  startDay: Moment
  weekIdx: number
  endDay?: Moment
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  advance?: Offset | boolean
}): WeekDay[] => {
  const localeData = startDay.localeData()
  const weekDays: WeekDay[] = []

  const currentDay = startDay.clone().week(weekIdx + startDay.week())
  const firstWeekDay = currentDay.clone().startOf('week') // 当前周的第一天

  for (let dateColIndex = 0; dateColIndex < DATE_COL_COUNT; dateColIndex++) {
    const now = firstWeekDay.clone().day(firstWeekDay.day() + dateColIndex)
    const current = now.clone().startOf('day')
    weekDays[dateColIndex] = {
      week: localeData.weekdaysShort(now),
      date: current,
      meta: {
        isToday: isSameDay(current, getNow()),
        isStartDay: isSameDay(current, startDay),
        isEndDay: isSameDay(current, endDay),
        isBeforeStartDay: current.isBefore(startDay, 'days'),
        isAfterEndDay: !!endDay && current.isAfter(endDay, 'days'),
        isNotChecked: isNotCheckedFun(current, {
          specifiedDays,
          disabledWeeks,
          disabledDays,
        }),
      },
    }
  }

  return weekDays
}

export type NormalDay = {
  date: Moment
  meta: {
    isToday: boolean
    isStartDay: boolean
    isEndDay: boolean
    isBeforeStartDay: boolean
    isAfterEndDay: boolean
    isNotChecked: boolean
    isExpire: boolean
  }
}

export const gainNormalDay = ({
  startDay,
  endDay,
  dayIdx,
  disabledWeeks,
  specifiedDays,
  disabledDays,
  advance,
}: {
  startDay: Moment
  dayIdx: number
  endDay?: Moment
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  advance?: Offset | boolean
}): NormalDay => {
  const current = startDay.clone().add(dayIdx, 'days')
  return {
    date: current,
    meta: {
      isToday: isSameDay(current, getNow()),
      isStartDay: isSameDay(current, startDay),
      isEndDay: isSameDay(current, endDay),
      isBeforeStartDay: current.isBefore(startDay, 'days'),
      isAfterEndDay: !!endDay && current.isAfter(endDay, 'days'),
      isExpire: isExpireFun(current, advance),
      isNotChecked: isNotCheckedFun(current, {
        specifiedDays,
        disabledWeeks,
        disabledDays,
      }),
    },
  }
}

export const gainWeekIdxByDayIdx = (startDay: Moment, dayIdx: number) => {
  const localeData = startDay.localeData()
  const firstDayOfWeek = localeData.firstDayOfWeek()
  const startDayCode = startDay.day()
  const d = startDayCode === 0 && firstDayOfWeek >= 1 ? -7 : 0

  return floor((dayIdx + startDayCode - d - firstDayOfWeek) / 7)
}

export const gainDayIdxByDay = (startDay: Moment, day: Moment) => {
  return day.diff(startDay.startOf('days'), 'days')
}

export type MonthDay = {
  date: Moment
  month: string
  meta: {
    isToday: boolean
    isStartDay: boolean
    isEndDay: boolean
    isLastMonthDay: boolean
    isNextMonthDay: boolean
    isBeforeStartDay: boolean
    isAfterEndDay: boolean
    isExpire: boolean
    isNotChecked: boolean
  }
}

export type MonthDays = {
  monthDays: MonthDay[]
  firstMonthDay: Moment
  lastMonthDay: Moment
}

export const gainMonthDays = ({
  startDay,
  monthIdx,
  endDay,
  disabledWeeks,
  specifiedDays,
  disabledDays,
  advance,
}: {
  startDay: Moment
  monthIdx: number
  endDay?: Moment
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  advance?: Offset | boolean
}): MonthDays => {
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
        meta: {
          isToday: isSameDay(current, getNow()),
          isStartDay: isSameDay(current, startDay),
          isEndDay: isSameDay(current, endDay),
          isBeforeStartDay: current.isBefore(startDay, 'days'),
          isAfterEndDay: !!endDay && current.isAfter(endDay, 'days'),
          isLastMonthDay: beforeCurrentMonthYear(current, firstMonthDay),
          isNextMonthDay: afterCurrentMonthYear(current, lastMonthDay),
          isExpire: isExpireFun(current, advance),
          isNotChecked: isNotCheckedFun(current, { specifiedDays, disabledWeeks, disabledDays }),
        },
      })
      passed++
    }
  }

  return { monthDays, firstMonthDay, lastMonthDay }
}

export const getTimeRangeBySection = (current: Moment, timeSection: TimeSection): TimeRange => {
  const { start: startTime, end: endTime } = timeSection

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

export const formatTimeSection = (timeSection: TimeSection): string => {
  const now = moment()
  const { start: startTime, end: endTime } = timeSection

  return `${now
    .hour(startTime[0])
    .minute(startTime[1])
    .format('HH:mm')}-${now
    .hour(endTime[0])
    .minute(endTime[1])
    .format('HH:mm')}`
}

export const getDateByArea = (area: Offset, direction: 'before' | 'after' = 'after') => {
  const { unit, value } = area

  if (direction === 'after') {
    return moment().add(value, unit)
  }
  return moment().subtract(value, unit)
}

export const isSameRange = (range1?: TimeRange, range2?: TimeRange, granularity?: unitOfTime.StartOf): boolean =>
  !!range1?.[0]?.isSame(range2?.[0], granularity) && !!range1?.[1]?.isSame(range2?.[1], granularity)
