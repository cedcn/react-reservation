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
  ByTimeBucketQuota,
} from '../interface'

import { getNow, getDateByArea } from '../utils'
import * as styles from './styles'

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
  quotaRequest?: (start: Moment, end: Moment) => Promise<ByTimeBucketQuota[]>
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
    quotaRequest,
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
    quotaRequest,
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
    <div className={`${prefixCls}-time-bucket`} css={styles.byTimeBucket}>
      {content}
    </div>
  )
}

export default TimeBucket
