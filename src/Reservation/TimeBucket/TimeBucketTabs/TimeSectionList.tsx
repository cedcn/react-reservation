/** @jsx jsx */
import { jsx } from '@emotion/core'
import moment from 'moment'
import React, { useMemo } from 'react'
import { map, isNil, find, get } from 'lodash'
import ReservationCell from '../../ReservationCell'
import { gainTimeSections, formatTimeRange, gainCellCls, gainDateTimeRange } from '../../utils'
import CellStatus from './CellStatus'
import styles from '../../styles/timeBucketTabs'

const MAX_SHOW_QUOTA = 99
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
    quotas,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const timeSections = gainTimeSections(startDay, idx, ranges)
        const key = timeSections[0].date.format()

        return (
          <div className={`${prefixCls}-time-section-list`} css={styles.timeSectionList} style={{ width }} key={key}>
            {map(timeSections, (section, index) => {
              const [startDateTime, endDateTime] = gainDateTimeRange(section.date, section.range)
              const currentQuota = find(
                quotas,
                (quota) =>
                  startDateTime.isSame(moment(quota.start), 'minute') && endDateTime.isSame(moment(quota.end), 'minute')
              )
              const isBeforeStartDayMinute = endDateTime.isBefore(startDay, 'minute')
              const isAfterEndDayMinute = endDay && endDateTime.isAfter(endDay, 'minute')

              const remaining = get(currentQuota, 'remaining')
              const isMakefull = !isNil(remaining) && remaining <= 0
              const isALittleRemaining = !isNil(remaining) && remaining > 0 && remaining < MAX_SHOW_QUOTA
              
              const isSelectable = !isBeforeStartDayMinute && !isAfterEndDayMinute
              const isDisabled = !isSelectable || isMakefull
              const isSelected = startDateTime.isSame(value?.[0], 'minute') && endDateTime.isSame(value?.[1], 'minute')

              const status = {
                isMakefull,
                isSelectable,
                isBeforeStartDayMinute,
                isAfterEndDayMinute,
                isSelected,
                isALittleRemaining,
              }

              return (
                <div
                  key={index}
                  css={styles.timeSection}
                  className={gainCellCls(`${prefixCls}-time-section`, status)}
                  onClick={isDisabled ? undefined : onChange.bind(null, [startDateTime, endDateTime])}
                >
                  <ReservationCell className={`${prefixCls}-cell`} status={status}>
                    <CellStatus
                      isSelectable={isSelectable}
                      isSelected={isSelected}
                      isMakefull={isMakefull}
                      timeSection={section}
                      remaining={remaining}
                      remainingMaxThreshold={MAX_SHOW_QUOTA}
                    />
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

export default React.memo(TimeSectionList)
