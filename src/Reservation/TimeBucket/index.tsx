/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import moment, { Moment } from 'moment'
import TimeBucketHeader from './TimeBucketHeader'
import TimeBucketTable from './TimeBucketTable'
import TimeBucketTabs from './TimeBucketTabs'
import { map, first, last, isFunction } from 'lodash'
import { TimeBucket as TimeBucketType, isSpecifiedDays } from '../interface'
import { WeekDay, gainWeekDays } from '../utils'
import comss from '../styles'

type TimeBucketProps = TimeBucketType
const TimeBucket: React.FC<TimeBucketProps> = (props) => {
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

  const { prefixCls = 'rT', days, value, onChange, ranges, mode = 'table', quotas, advance, cellRender } = props
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

  if (!startDay || (startDay && startDay.isBefore(today, 'minute'))) {
    startDay = today
  }

  const weekDays: WeekDay[] = gainWeekDays(startDay, currentWeekIdx)
  const startWeekDay = first(weekDays)?.date
  const endWeekDay = last(weekDays)?.date
  const quotaList = isFunction(quotas) ? startWeekDay && endWeekDay && quotas(startWeekDay, endWeekDay) : quotas

  canToLast = startDay.isBefore(startWeekDay, 'week')
  canToNext = !endDay || (endDay && endDay.isAfter(endWeekDay, 'week'))

  const commonProps = {
    prefixCls,
    currentWeekIdx,
    weekDays,
    ranges,
    startDay,
    endDay,
    disabledWeeks,
    disabledDays,
    specifiedDays,
    value,
    onChange,
    setCurrentWeekIdx,
    toLast: toLastWeek,
    toNext: toNextWeek,
    quotas: quotaList,
    advance,
    cellRender,
  }

  return (
    <div className={prefixCls} css={comss.reservation}>
      <TimeBucketHeader
        prefixCls={prefixCls}
        startWeekDay={startWeekDay}
        endWeekDay={endWeekDay}
        canToLast={canToLast}
        canToNext={canToNext}
        toNext={toNextWeek}
        toLast={toLastWeek}
      />
      {mode === 'tabs' ? <TimeBucketTabs {...commonProps} /> : <TimeBucketTable {...commonProps} />}
    </div>
  )
}

export default TimeBucket
