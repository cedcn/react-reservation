/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import moment from 'moment'
import { map } from 'lodash'
import cx from 'classnames'
import { find, get } from 'lodash'
import { gainDateTimeRange, gainCellCls, WeekDay, formatTimeRange, isNotCheckedFun } from '../utils'
import TimeBucketsCellStatus from './TimeBucketsCellStatus'
import ReservationCell from '../ReservationCell'
import { TimeBucketsTableProps } from './TimeBucketsTable'
import styles from '../styles'

export interface TimeBucketsTbodyProps extends TimeBucketsTableProps {
  width?: number
}
const quota: any[] = []

const TimeBucketsTbody: React.FC<TimeBucketsTbodyProps> = (props) => {
  const {
    value,
    weekDays,
    ranges,
    prefixCls,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    startDay,
    endDay,
    width,
    onChange,
  } = props

  return (
    <div className={`${prefixCls}-tbody`} style={{ width }} css={styles.tbody}>
      {map(ranges, (timeRange, index) => {
        return (
          <div role="row" key={index} className={`${prefixCls}-tr`} css={styles.tr}>
            <div key="column" className={cx(`${prefixCls}-td`, `${prefixCls}-column-cell`)} css={styles.td}>
              <span className={`${prefixCls}-td-inner`}>{formatTimeRange(timeRange)}</span>
            </div>
            {map(weekDays, (day: WeekDay, tdIndex) => {
              const current = day.date
              const [startDateTime, endDateTime] = gainDateTimeRange(current, timeRange)

              const currentQuota = find(
                quota,
                (item) =>
                  startDateTime.isSame(moment(item.startTime), 'minute') &&
                  endDateTime.isSame(moment(item.endTime), 'minute')
              )
              const isBeforeStartDayMinute = endDateTime.isBefore(startDay, 'minute')
              const isAfterEndDayMinute = !!endDay && endDateTime.isAfter(endDay, 'minute')

              const remaining = get(currentQuota, 'remaining')
              const isNotChecked = isNotCheckedFun(current, { specifiedDays, disabledWeeks, disabledDays })

              const isSelectable = !isBeforeStartDayMinute && !isAfterEndDayMinute && !isNotChecked
              const isMakefull = remaining === 0
              const isDisabled = !isSelectable || isMakefull
              const isSelected =
                !isDisabled && startDateTime.isSame(value?.[0], 'minute') && endDateTime.isSame(value?.[1], 'minute')

              const status = {
                isMakefull,
                isSelectable,
                isNotChecked,
                isBeforeStartDayMinute,
                isAfterEndDayMinute,
                isSelected,
              }

              return (
                <div
                  role="gridcell"
                  className={gainCellCls(`${prefixCls}-td`, status)}
                  key={tdIndex}
                  css={styles.td}
                  onClick={isDisabled ? undefined : onChange.bind(null, [startDateTime, endDateTime])}
                >
                  <ReservationCell className={`${prefixCls}-reservation-cell`} status={status}>
                    <TimeBucketsCellStatus
                      isSelectable={isSelectable}
                      isSelected={isSelected}
                      remaining={remaining}
                      isMakefull={isMakefull}
                    />
                  </ReservationCell>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default TimeBucketsTbody
