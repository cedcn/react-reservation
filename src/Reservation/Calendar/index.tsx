import React, { useState } from 'react'
import moment from 'moment'
// import CalendarTable from './CalendarTable'
import CalendarHeader from './CalendarHeader'
import { Calendar, isDays } from '../interface'

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

  const { prefixCls = 'reservation-calendar', availableDays } = props

  const today = moment()

  if (!isDays(availableDays)) {
    const { startDay, endDay } = availableDays

    const startMonthDay = startDay && startDay.isAfter(today, 'minute') ? startDay.startOf('day') : today.startOf('day')
    const endMonthDay = endDay ? endDay.endOf('day') : undefined
    const currentMonthDay = startMonthDay.clone().month(currentMonthIdx + startMonthDay.month())

    canToLast = startMonthDay.isBefore(currentMonthDay, 'month')
    canToNext = !endMonthDay || (endMonthDay && endMonthDay.isAfter(currentMonthDay, 'month'))

    // const commonProps = {
    //   ...props,
    //   currentMonthIdx,
    //   startDay: startMonthDay,
    //   endDay: endMonthDay,
    //   availableWeeks,
    //   toLast: toLastMonth,
    //   toNext: toNextMonth,
    // }

    return (
      <div className={prefixCls}>
        <CalendarHeader
          prefixCls={prefixCls}
          currentDay={currentMonthDay}
          canToLast={canToLast}
          canToNext={canToNext}
          toNext={toNextMonth}
          toLast={toLastMonth}
        />
      </div>
    )
  }

  return null
}

export default ReservationCalendar
