/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import moment, { Moment } from 'moment'
import TimeBucketTable from './TimeBucketTable'
import TimeBucketTabs from './TimeBucketTabs'
import { map } from 'lodash'
import {
  isSpecifiedDays,
  Days,
  TimeBucketValue,
  SectionRanges,
  Offset,
  ByTimeBucketCellProps,
  isSameSectionRanges,
} from '../interface'

import { getNow, getDateByArea } from '../utils'
import comss from '../styles'

interface TimeBucketProps {
  prefixCls?: string
  days?: Days
  value?: TimeBucketValue
  onChange: (value?: TimeBucketValue) => void
  mode?: 'tabs' | 'table'
  ranges: SectionRanges
  advance?: Offset | boolean
  isMultiple?: boolean
  area?: Offset
  isMinShort?: boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const TimeBucket: React.FC<TimeBucketProps> = (props) => {
  const {
    prefixCls = 'rTb',
    days,
    value,
    onChange,
    ranges,
    mode = 'table',
    advance,
    isMultiple,
    isMinShort,
    area,
    cellRenderer,
  } = props

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
  if (!startDay || (startDay && startDay.isBefore(today, 'minute'))) {
    startDay = today
  }

  if (area) {
    const endOffsetDay = getDateByArea(area)

    if (!endDay || (endDay && endDay.isAfter(endOffsetDay, 'minute'))) {
      endDay = endOffsetDay
    }
  }

  const commonProps = {
    prefixCls,
    startDay,
    endDay,
    disabledWeeks,
    disabledDays,
    specifiedDays,
    value,
    onChange,
    advance,
    isMultiple,
    isMinShort,
    cellRenderer,
  }

  let content

  if (mode === 'tabs') {
    content = <TimeBucketTabs ranges={ranges} {...commonProps} />
  }

  if (mode === 'table') {
    content = isSameSectionRanges(ranges) ? (
      <TimeBucketTable ranges={ranges} {...commonProps} />
    ) : (
      <TimeBucketTabs ranges={ranges} {...commonProps} />
    )
  }

  return (
    <div className={`${prefixCls}-time-bucket`} css={comss.reservation}>
      {content}
    </div>
  )
}

export default TimeBucket
