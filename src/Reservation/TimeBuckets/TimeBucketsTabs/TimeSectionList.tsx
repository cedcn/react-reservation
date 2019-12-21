/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map } from 'lodash'
import ReservationCell from '../../ReservationCell'
import { gainTimeSections, formatTimeRange, gainCellCls, gainDateTimeRange } from '../../utils'
import styles from '../../styles/timeBucketsTabs'

const TimeSectionList: React.FC<any> = (props) => {
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
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const timeSections = gainTimeSections(startDay, idx, ranges)
        const key = timeSections[0].date.format()

        return (
          <div className={`${prefixCls}-time-section-list`} css={styles.timeSectionList} style={{ width }} key={key}>
            {map(timeSections, (section, index) => {
              const isMakefull = false
              const [startDateTime, endDateTime] = gainDateTimeRange(section.date, section.range)

              const isBeforeStartDayMinute = endDateTime.isBefore(startDay, 'minute')
              const isAfterEndDayMinute = endDay && endDateTime.isAfter(endDay, 'minute')
              const isDisabled = isBeforeStartDayMinute || isAfterEndDayMinute || isMakefull
              const isSelectable = !isDisabled
              const isSelected = startDateTime.isSame(value?.[0], 'minute') && endDateTime.isSame(value?.[1], 'minute')

              const status = {
                isMakefull,
                isSelectable,
                isBeforeStartDayMinute,
                isAfterEndDayMinute,
                isSelected,
              }

              return (
                <div
                  key={index}
                  css={styles.timeSection}
                  className={gainCellCls(`${prefixCls}-time-section`, status)}
                  onClick={isDisabled ? undefined : onChange.bind(null, [startDateTime, endDateTime])}
                >
                  <ReservationCell className={`${prefixCls}-cell`} status={status}>
                    <div>
                      <div>{formatTimeRange(section.range)}</div>
                      <div>{section.date.format('MM-DD')}</div>
                    </div>
                  </ReservationCell>
                </div>
              )
            })}
          </div>
        )
      }),
    [
      displayIdxs,
      width,
      prefixCls,
      startDay.format(),
      disabledWeeks,
      disabledDays,
      specifiedDays,
      value?.[0]?.format(),
      value?.[1]?.format(),
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default TimeSectionList
