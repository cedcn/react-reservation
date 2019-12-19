/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import moment from 'moment'
import { map } from 'lodash'
import cx from 'classnames'
import { includes, find, get, isEmpty, findIndex } from 'lodash'
import { gainDateTimeRange, isSameDay, gainCellCls, WeekDay, formatTimeRange, isNotCheckedFun } from '../utils'
import ReservationCellStatus from '../ReservationCellStatus'
import { TimeBucketsTableProps } from './TimeBucketsTable'
import styles from '../styles'

export interface TimeBucketsTbodyProps extends TimeBucketsTableProps {
  width?: number
}
const quotaSummary: any[] = []

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
    <div className={`${prefixCls}-tbody`} style={{ width }}>
      {map(ranges, (timeRange, index) => {
        return (
          <div role="row" key={index} className={`${prefixCls}-tr`} css={styles.tr}>
            <div key="column" className={cx(`${prefixCls}-td`, `${prefixCls}-column-cell`)} css={styles.td}>
              <span className={`${prefixCls}-td-inner`}>{formatTimeRange(timeRange)}</span>
            </div>
            {map(weekDays, (day: WeekDay, tdIndex) => {
              const current = day.date
              const [startDateTime, endDateTime] = gainDateTimeRange(current, timeRange)

              const currentQuotaSummary = find(
                quotaSummary,
                (item) =>
                  startDateTime.isSame(moment(item.startTime), 'minute') &&
                  endDateTime.isSame(moment(item.endTime), 'minute')
              )

              const remainingQuota = get(currentQuotaSummary, 'remainingQuota')

              const isNotChecked = isNotCheckedFun(current, {
                specifiedDays,
                disabledWeeks,
                disabledDays,
              })

              const isMakefull = !isNotChecked && remainingQuota === 0
              const isBeforeStartDayMinute = endDateTime.isBefore(startDay, 'minute')
              const isAfterEndDayMinute = endDay && endDateTime.isAfter(endDay, 'minute')
              const isDisabled = isBeforeStartDayMinute || isAfterEndDayMinute || isMakefull || isNotChecked
              const isSelectable = !isDisabled
              const isSelected = startDateTime.isSame(value?.[0], 'minute') && endDateTime.isSame(value?.[1], 'minute')

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
                  <div className="reservation-cell__content" css={(theme) => styles.cell(theme, status)}>
                    <ReservationCellStatus
                      isSelectable={isSelectable}
                      isSelected={isSelected}
                      remainingQuota={remainingQuota}
                      isFully={isMakefull && !isBeforeStartDayMinute && !isAfterEndDayMinute}
                    />
                  </div>
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
