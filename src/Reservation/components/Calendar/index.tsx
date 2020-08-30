/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { Moment, MomentInput } from 'moment'
import cx from 'classnames'
import CalendarHeader from '../CalendarHeader'
import CalendarPanel from '../CalendarPanel'
import { WeekCode, SpecifiedDays, Offset } from '../../interface'
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
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  advance?: Offset | boolean
  quotaRequest?: (start: Moment, end: Moment) => Promise<CalendarQuota>
  cellRenderer?: React.ComponentType<CalendarCellProps>
  isMinShort?: boolean
  startDay: Moment
  endDay?: Moment
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    prefixCls = 'rV',
    className,
    isMultiple,
    isMinShort,
    value,
    advance,
    onChange,
    cellRenderer,
    startDay,
    endDay,
    specifiedDays,
    disabledWeeks,
    disabledDays,
  } = props
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0)

  const currentMonthDay = startDay.clone().month(currentMonthIdx + startDay.month())
  const canableToLast = startDay.isBefore(currentMonthDay, 'month')
  const canableToNext = !endDay || (endDay && endDay.isAfter(currentMonthDay, 'month'))

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
    startDay,
    endDay,
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
    <div className={cx(`${prefixCls}-calendar`, className)}>
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
