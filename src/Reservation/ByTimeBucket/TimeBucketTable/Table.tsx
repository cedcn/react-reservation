/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { Moment } from 'moment'
import { map } from 'lodash'
import TimeBucketTbody from './Tbody'
import { gainWeekDays, WeekDay } from '../../utils'
import { TimeBucketValue, TimeSection, WeekCode, SpecifiedDays } from '../../interface'

interface TimeBucketListProps {
  displayIdxs: number[]
  width: number
  value?: TimeBucketValue
  weekDays: WeekDay[]
  ranges: TimeSection[]
  prefixCls: string
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  startDay: Moment
  endDay?: Moment
  onChange: (value?: TimeBucketValue) => void
  advance?: number | boolean
  isMultiple?: boolean
  quotas?: any
  currentWeekIdx: number
  toNext: () => boolean
  toLast: () => boolean
}

const TimeBucketTable: React.FC<TimeBucketListProps> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    toNext,
    toLast,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    endDay,
    currentWeekIdx,
    ranges,
    quotas,
    advance,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays(startDay, idx)
        const key = weekDaysItem[0].date.format()

        const tBodyProps = {
          prefixCls,
          startDay,
          endDay,
          currentWeekIdx,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          weekDays: weekDaysItem,
          toNext,
          toLast,
          onChange,
          width,
          value,
          ranges,
          quotas,
          advance,
        }

        return <TimeBucketTbody key={key} {...tBodyProps} />
      }),
    [
      prefixCls,
      displayIdxs,
      width,
      value,
      disabledDays,
      specifiedDays,
      disabledWeeks,
      startDay.format(),
      endDay && endDay.format(),
      ranges,
      quotas,
      advance,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default TimeBucketTable
