/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import TimeBucketsHeader from './TimeBucketsHeader'
import TimeBucketsTable from './TimeBucketsTable'
import TimeBucketsTabs from './TimeBucketsTabs'
import { map, first, last, get } from 'lodash'
import { TimeBuckets as TimeBucketsType, isSpecifiedDays } from '../interface'
import { WeekDay, gainWeekDays } from '../utils'
import styles from '../styles'

type TimeBucketsProps = TimeBucketsType
const TimeBuckets: React.FC<TimeBucketsProps> = (props) => {
  let canToNext = true
  let canToLast = true
  const [currentWeekIdx, setCurrentWeekIdx] = useState(0)

  const toNextWeek = (): boolean => {
    if (!canToNext) return false
    setCurrentWeekIdx(currentWeekIdx + 1)
    return true
  }

  const toLastWeek = (): boolean => {
    if (!canToLast) return false
    setCurrentWeekIdx(currentWeekIdx - 1)
    return true
  }

  const { prefixCls = 'rT', days, value, onChange, ranges, mode = 'table' } = props
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

  const startMonthDay = startDay && startDay.isAfter(today, 'minute') ? startDay : today
  const endMonthDay = endDay ? endDay.endOf('day') : undefined

  const weekDays: WeekDay[] = gainWeekDays(startMonthDay, currentWeekIdx)

  const startWeekDay = get(first(weekDays), 'date')
  const endWeekDay = get(last(weekDays), 'date')

  canToLast = startMonthDay.isBefore(startWeekDay, 'week')
  canToNext = !endMonthDay || (endMonthDay && endMonthDay.isAfter(endWeekDay, 'week'))

  const commonProps = {
    prefixCls,
    currentWeekIdx,
    weekDays,
    ranges,
    startDay: startMonthDay,
    endDay: endMonthDay,
    disabledWeeks,
    disabledDays,
    specifiedDays,
    value,
    onChange,
    setCurrentWeekIdx,
    toLast: toLastWeek,
    toNext: toNextWeek,
  }

  return (
    <div className={prefixCls} css={styles.reservation}>
      <TimeBucketsHeader
        prefixCls={prefixCls}
        startWeekDay={startWeekDay}
        endWeekDay={endWeekDay}
        canToLast={canToLast}
        canToNext={canToNext}
        toNext={toNextWeek}
        toLast={toLastWeek}
      />
      {mode === 'tabs' ? <TimeBucketsTabs {...commonProps} /> : <TimeBucketsTable {...commonProps} />}
    </div>
  )
}

export default TimeBuckets
