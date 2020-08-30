/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import moment, { Moment } from 'moment'
import { map } from 'lodash'
import { gainNormalDay } from '../../utils'
import { WeekCode, SpecifiedDays, TimeBucketValue, TimeSection, Offset, ByTimeBucketCellProps } from '../../interface'
import TimeSectionList from '../TimeSectionList'

interface TimeSectionListViewerProps {
  prefixCls: string
  value?: TimeBucketValue
  displayIdxs: number[]
  width: number
  startDay: Moment
  endDay?: Moment
  ranges: TimeSection[]
  onChange: (value?: TimeBucketValue) => void
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  quotas?: any
  advance?: Offset | boolean
  isMultiple?: boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const TimeSectionListViewer: React.FC<TimeSectionListViewerProps> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    endDay,
    ranges,
    quotas,
    advance,
    isMultiple,
    cellRenderer,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const { date: currentDay, meta } = gainNormalDay({
          startDay,
          dayIdx: idx,
          specifiedDays,
          disabledWeeks,
          disabledDays,
          endDay,
        })
        const { isNotChecked, isBeforeStartDay, isAfterEndDay } = meta
        const key = currentDay.format('YYYY-MM-DD')

        return (
          <TimeSectionList
            key={key}
            ranges={ranges}
            isNotChecked={isNotChecked}
            value={value}
            isBeforeStartDay={isBeforeStartDay}
            isAfterEndDay={isAfterEndDay}
            onChange={onChange}
            advance={advance}
            isMultiple={isMultiple}
            currentDay={currentDay}
            width={width}
            prefixCls={prefixCls}
            cellRenderer={cellRenderer}
          />
        )
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
      isMultiple,
      cellRenderer,
      moment.locale(),
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default React.memo(TimeSectionListViewer)
