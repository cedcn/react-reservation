/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo, useState } from 'react'
import { map, isNil, ceil, floor } from 'lodash'
import { gainTimeSections, formatTimeRange } from '../../utils'
import styles from '../../styles'

const TimeSectionList: React.FC<any> = (props) => {
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
    weekDays,
    currentWeekIdx,
    ranges,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const timeSections = gainTimeSections(startDay, idx, ranges)
        const key = timeSections[0].date.format()

        return (
          <div style={{ width, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }} key={key}>
            {map(timeSections, (section, index) => {
              return (
                <div style={{ width: '45%', textAlign: 'center', marginBottom: '10px' }} key={index}>
                  <div>{formatTimeRange(section.range)}</div>
                  {section.date.format('MM-DD')}
                </div>
              )
            })}
          </div>
        )
      }),
    [displayIdxs, width]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default TimeSectionList
