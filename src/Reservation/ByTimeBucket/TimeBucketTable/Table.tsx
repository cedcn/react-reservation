/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { Moment } from 'moment'
import { map } from 'lodash'
import TimeBucketTbody from './Tbody'
import { gainWeekDays } from '../../utils'
import {
  TimeBucketValue,
  SameSectionRanges,
  WeekCode,
  SpecifiedDays,
  Offset,
  ByTimeBucketCellProps,
  ByTimeBucketQuota,
} from '../../interface'

interface TimeBucketListProps {
  displayIdxs: number[]
  width: number
  value?: TimeBucketValue
  ranges: SameSectionRanges
  prefixCls: string
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  startDay: Moment
  endDay?: Moment
  onChange: (value?: TimeBucketValue) => void
  advance?: Offset | boolean
  isMultiple?: boolean
  currentWeekIdx: number
  toNext: () => boolean
  toLast: () => boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
  quotaRequest?: (start: Moment, end: Moment) => Promise<ByTimeBucketQuota[]>
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
    advance,
    isMultiple,
    cellRenderer,
    quotaRequest,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx, idxIndex) => {
        const weekDaysItem = gainWeekDays({
          startDay,
          endDay,
          weekIdx: idx,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          advance,
        })
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
          quotaRequest,
          isActive: idxIndex === 1,
          ranges,
          advance,
          isMultiple,
          cellRenderer,
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
      advance,
      isMultiple,
      quotaRequest,
      cellRenderer,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default TimeBucketTable
