/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import moment from 'moment'
import CalendarHeader from './CalendarHeader'
import CalendarTable from './CalendarTable'
import { Calendar, isFixedDays } from '../interface'
import styles from '../styles'

interface CalendarProps extends Calendar {}

const ReservationCalendar: React.FC<CalendarProps> = (props) => {
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

  const { prefixCls = 'rV', days, value } = props

  const today = moment()

  if (!isFixedDays(days)) {
    const { startDay, endDay, availableWeeks } = days

    const startMonthDay = startDay && startDay.isAfter(today, 'minute') ? startDay.startOf('day') : today.startOf('day')
    const endMonthDay = endDay ? endDay.endOf('day') : undefined
    const onChange = () => {}
    const currentMonthDay = startMonthDay.clone().month(currentMonthIdx + startMonthDay.month())

    canToLast = startMonthDay.isBefore(currentMonthDay, 'month')
    canToNext = !endMonthDay || (endMonthDay && endMonthDay.isAfter(currentMonthDay, 'month'))

    const commonProps = {
      prefixCls,
      currentMonthIdx,
      startDay: startMonthDay,
      endDay: endMonthDay,
      availableWeeks,
      value,
      onChange,
      toLast: toLastMonth,
      toNext: toNextMonth,
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

  return null
}

export default ReservationCalendar
