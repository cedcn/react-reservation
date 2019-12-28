/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import CalendarHeader from './CalendarHeader'
import CalendarTable from './CalendarTable'
import { map } from 'lodash'
import { Calendar as CalendarType, isSpecifiedDays } from '../interface'
import styles from '../styles'

interface CalendarProps extends CalendarType {}
const Calendar: React.FC<CalendarProps> = (props) => {
  let canToNext = true
  let canToLast = true
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0)

  const toNextMonth = () => {
    if (!canToNext) return false
    setCurrentMonthIdx(currentMonthIdx + 1)
    return true
  }

  const toLastMonth = () => {
    if (!canToLast) return false
    setCurrentMonthIdx(currentMonthIdx - 1)
    return true
  }

  const { prefixCls = 'rV', days, value, onChange, quotas, advance, cellRender } = props
  const today = moment()

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

  const startMonthDay = startDay && startDay.isAfter(today, 'minute') ? startDay.startOf('day') : today.startOf('day')
  const endMonthDay = endDay ? endDay.endOf('day') : undefined
  const currentMonthDay = startMonthDay.clone().month(currentMonthIdx + startMonthDay.month())

  canToLast = startMonthDay.isBefore(currentMonthDay, 'month')
  canToNext = !endMonthDay || (endMonthDay && endMonthDay.isAfter(currentMonthDay, 'month'))

  const commonProps = {
    prefixCls,
    currentMonthIdx,
    startDay: startMonthDay,
    endDay: endMonthDay,
    disabledWeeks,
    disabledDays,
    specifiedDays,
    value,
    onChange,
    toLast: toLastMonth,
    toNext: toNextMonth,
    quotas,
    advance,
    cellRender,
  }

  return (
    <div className={prefixCls} css={styles.reservation}>
      <CalendarHeader
        prefixCls={prefixCls}
        currentDay={currentMonthDay}
        canToLast={canToLast}
        canToNext={canToNext}
        toNext={toNextMonth}
        toLast={toLastMonth}
      />
      <CalendarTable {...commonProps} />
    </div>
  )
}

export default Calendar
