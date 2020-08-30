/** @jsx jsx */
import { jsx } from '@emotion/core'
import moment, { Moment } from 'moment'
import { map } from 'lodash'
import React from 'react'
import { getDateByArea, getNow } from '../utils'
import { Days, Offset, isSpecifiedDays } from '../interface'
import Calendar from '../components/Calendar'

interface ByDayProps {
  prefixCls?: string
  days?: Days
  area?: Offset
}

const ByDay: React.FC<ByDayProps> = (props) => {
  const { prefixCls = 'rV', area, days, ...rest } = props

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

  return (
    <Calendar
      {...rest}
      className={`${prefixCls}-by-day`}
      prefixCls={prefixCls}
      specifiedDays={specifiedDays}
      disabledDays={disabledDays}
      disabledWeeks={disabledWeeks}
      startDay={startMonthDay}
      endDay={endMonthDay}
    />
  )
}

export default ByDay
