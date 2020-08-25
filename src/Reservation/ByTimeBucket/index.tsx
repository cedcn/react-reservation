/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import moment, { Moment } from 'moment'
import TimeBucketTable from './TimeBucketTable'
import TimeBucketTabs from './TimeBucketTabs'
import { map } from 'lodash'
import { isSpecifiedDays, Days, TimeBucketValue, TimeSection, Offset } from '../interface'
import { today } from '../utils'
import comss from '../styles'

interface TimeBucketProps {
  prefixCls?: string
  days?: Days
  value?: TimeBucketValue
  onChange: (value?: TimeBucketValue) => void
  mode?: 'tabs' | 'table'
  ranges: TimeSection[]
  advance?: Offset | boolean
}

const TimeBucket: React.FC<TimeBucketProps> = (props) => {
  const { prefixCls = 'rTb', days, value, onChange, ranges, mode = 'table', advance } = props

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

  const commonProps = {
    prefixCls,
    ranges,
    startDay,
    endDay,
    disabledWeeks,
    disabledDays,
    specifiedDays,
    value,
    onChange,
    advance,
  }

  return (
    <div className={`${prefixCls}-time-bucket`} css={comss.reservation}>
      {mode === 'tabs' ? <TimeBucketTabs {...commonProps} /> : <TimeBucketTable {...commonProps} />}
    </div>
  )
}

export default TimeBucket
