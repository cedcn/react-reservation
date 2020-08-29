/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import moment, { Moment } from 'moment'
import { map } from 'lodash'
import { isNotCheckedFun, gainDayByDayIdx } from '../../utils'
import { WeekCode, SpecifiedDays, TimeBucketValue, TimeSection, Offset, ByTimeBucketCellProps } from '../../interface'
import TimeBucketList from './TimeBucketList'

interface TImeBucketViewerProps {
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

const TImeBucketViewer: React.FC<TImeBucketViewerProps> = (props) => {
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
        const currentDay = gainDayByDayIdx(startDay, idx)
        const key = currentDay.format('YYYY-MM-DD')
        const isNotChecked = isNotCheckedFun(currentDay, { specifiedDays, disabledWeeks, disabledDays })

        return (
          <TimeBucketList
            key={key}
            ranges={ranges}
            isNotChecked={isNotChecked}
            value={value}
            startDay={startDay}
            endDay={endDay}
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

export default React.memo(TImeBucketViewer)
