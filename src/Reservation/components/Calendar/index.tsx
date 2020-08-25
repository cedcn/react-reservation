/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import moment, { Moment, MomentInput } from 'moment'
import cx from 'classnames'
import { map } from 'lodash'
import CalendarHeader from '../CalendarHeader'
import CalendarPanel from '../CalendarPanel'
import { Days, isSpecifiedDays, Offset } from '../../interface'
import { getDateByArea, getNow } from '../../utils'
import { CalendarCellProps } from '../CalendarCell'

// calendar
export type CalendarValue = Moment | Moment[] | null
export type CalendarChangeFunc<T> = (value?: T) => void
export interface CalendarQuota {
  day: MomentInput
  remaining: number
}

export interface CalendarProps {
  prefixCls: string
  value?: CalendarValue | null
  defaultValue?: CalendarValue | null
  onChange?: (value?: CalendarValue | null) => void
  className?: string
  isMultiple?: boolean
  toggleOff?: boolean
  days?: Days
  advance?: Offset | boolean
  area?: Offset
  quotaRequest?: (start: Moment, end: Moment) => Promise<CalendarQuota>
  cellRenderer?: React.ComponentType<CalendarCellProps>
  isMinShort?: boolean
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    prefixCls = 'rV',
    className,
    isMultiple,
    isMinShort,
    area,
    days,
    value,
    advance,
    onChange,
    cellRenderer,
  } = props
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0)

  let startDay: Moment | null | undefined
  let endDay: Moment | null | undefined
  let disabledWeeks
  let disabledDays
  let specifiedDays

  if (isSpecifiedDays(days)) {
    startDay = moment.min(days)
    endDay = moment.max(days)
    specifiedDays = map(days, (day) => day.clone().startOf('day'))
  } else {
    startDay = days?.startDay
    endDay = days?.endDay
    disabledWeeks = days?.disabledWeeks
    disabledDays = days?.disabledDays
  }

  const today = getNow()
  const startMonthDay = startDay && startDay.isAfter(today, 'minute') ? startDay.startOf('day') : today.startOf('day')
  let endMonthDay = endDay ? endDay.endOf('day') : undefined
  if (area) {
    const endOffsetMonthDay = getDateByArea(area)

    if (!endMonthDay || (endMonthDay && endMonthDay.isAfter(endOffsetMonthDay, 'minute'))) {
      endMonthDay = endOffsetMonthDay
    }
  }

  const currentMonthDay = startMonthDay.clone().month(currentMonthIdx + startMonthDay.month())
  const canableToLast = startMonthDay.isBefore(currentMonthDay, 'month')
  const canableToNext = !endMonthDay || (endMonthDay && endMonthDay.isAfter(currentMonthDay, 'month'))

  const gotoMonth = (offset: number) => {
    setCurrentMonthIdx(currentMonthIdx + offset)
  }

  const toLastMonth = () => {
    if (!canableToLast) return false
    gotoMonth(-1)
    return true
  }

  const toNextMonth = () => {
    if (!canableToNext) return false
    gotoMonth(1)
    return true
  }

  const calendarPanelProps = {
    value,
    prefixCls,
    currentMonthIdx,
    onChange,
    startDay: startMonthDay,
    endDay: endMonthDay,
    specifiedDays,
    disabledWeeks,
    disabledDays,
    toLast: toLastMonth,
    toNext: toNextMonth,
    advance,
    isMinShort,
    isMultiple,
    cellRenderer,
  }

  return (
    <div className={cx('reservation-by-day', className)}>
      <CalendarHeader
        prefixCls={prefixCls}
        currentDay={currentMonthDay}
        canToLast={canableToLast}
        canToNext={canableToNext}
        toNextMonth={toNextMonth}
        toLastMonth={toLastMonth}
      />
      <CalendarPanel {...calendarPanelProps} />
    </div>
  )
}

export default Calendar
