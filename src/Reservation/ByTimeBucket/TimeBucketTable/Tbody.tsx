/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import { map, isUndefined } from 'lodash'
import cx from 'classnames'
import { WeekDay, formatTimeSection, isNotCheckedFun, getTimeRangeBySection } from '../../utils'
import { TimeBucketValue, TimeSection, WeekCode, SpecifiedDays, Offset, ByTimeBucketCellProps } from '../../interface'
import TimeRangeItem, { ItemChildrenResult } from '../TimeRangeItem'
import TimeBucketCell from './Cell'
import * as styles from './styles'

export interface TimeBucketTbodyProps {
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
  advance?: Offset | boolean
  isMultiple?: boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const TimeBucketTbody: React.FC<TimeBucketTbodyProps> = (props) => {
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
    cellRenderer: CustomCellRenderer,
    onChange,
    advance,
    isMultiple,
  } = props

  return (
    <div className={`${prefixCls}-tbody`} style={{ width }} css={styles.tbody}>
      {map(ranges, (section, index) => {
        return (
          <div role="row" key={index} className={`${prefixCls}-tr`} css={styles.tr}>
            <div
              key="column"
              className={cx(`${prefixCls}-td`, `${prefixCls}-column-cell`)}
              css={[styles.td, styles.column]}
            >
              <span className={`${prefixCls}-td-inner`}>{formatTimeSection(section)}</span>
            </div>
            {map(weekDays, (day: WeekDay, tdIndex) => {
              const current = day.date
              const timeRange = getTimeRangeBySection(current, section)
              const isNotChecked = isNotCheckedFun(current, { specifiedDays, disabledWeeks, disabledDays })

              return (
                <TimeRangeItem
                  key={tdIndex}
                  timeRange={timeRange}
                  current={current}
                  advance={advance}
                  startDay={startDay}
                  endDay={endDay}
                  onChange={onChange}
                  value={value}
                  isMultiple={isMultiple}
                  isNotChecked={isNotChecked}
                >
                  {({
                    isDisabled,
                    isSelected,
                    onClick,
                    startTime,
                    endTime,
                    remaining,
                    isBeforeStartDayMinute,
                    isAfterEndDayMinute,
                  }: ItemChildrenResult) => {
                    const isSelectable = !isDisabled

                    const cellRendererProps = {
                      prefixCls,
                      isSelected,
                      isToday: false,
                      isBeforeStartDayMinute,
                      isAfterEndDayMinute,
                      isSelectable,
                      isNotChecked,
                      day: current,
                      onClick,
                      startTime,
                      endTime,
                    }

                    return (
                      <span css={styles.td}>
                        {isUndefined(CustomCellRenderer) ? (
                          <TimeBucketCell {...cellRendererProps} />
                        ) : (
                          <CustomCellRenderer {...cellRendererProps} />
                        )}
                      </span>
                    )
                  }}
                </TimeRangeItem>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default React.memo(TimeBucketTbody)
