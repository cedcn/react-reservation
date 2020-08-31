/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useEffect, useMemo } from 'react'
import moment, { Moment } from 'moment'
import { map, isUndefined, isNil, first, last, forEach } from 'lodash'
import cx from 'classnames'
import { WeekDay, formatTimeSection, getTimeRangeBySection } from '../../utils'
import { TimeBucketValue, SameSectionRanges, Offset, ByTimeBucketCellProps, ByTimeBucketQuota } from '../../interface'
import TimeRangeItem, { ItemChildrenResult } from '../TimeRangeItem'
import TimeBucketCell from './Cell'
import * as styles from './styles'

export interface TimeBucketTbodyProps {
  width: number
  value?: TimeBucketValue
  weekDays: WeekDay[]
  ranges: SameSectionRanges
  prefixCls: string
  onChange: (value?: TimeBucketValue) => void
  advance?: Offset | boolean
  isMultiple?: boolean
  isActive: boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
  quotaRequest?: (start: Moment, end: Moment) => Promise<ByTimeBucketQuota[]>
}

const TimeBucketTbody: React.FC<TimeBucketTbodyProps> = (props) => {
  const {
    value,
    weekDays,
    ranges,
    prefixCls,
    width,
    cellRenderer: CustomCellRenderer,
    onChange,
    advance,
    isMultiple,
    isActive,
    quotaRequest,
  } = props

  const firstWeekDay = first(weekDays)?.date
  const lastWeekDay = last(weekDays)?.date
  const [quotas, setQuotas] = useState<ByTimeBucketQuota[] | undefined | null>(null)
  const [isLoadingQuota, setIsLoadingQuota] = useState(false)

  useEffect(() => {
    if (quotaRequest && isActive && isNil(quotas) && firstWeekDay && lastWeekDay) {
      setIsLoadingQuota(true)
      quotaRequest(firstWeekDay, lastWeekDay)
        .then((data) => {
          setQuotas(data)
        })
        .finally(() => {
          setIsLoadingQuota(false)
        })
    }
  }, [isActive])

  const quotasObj = useMemo(() => {
    if (isNil(quotas)) return undefined

    const mObj = new Map<string, ByTimeBucketQuota>()
    forEach(quotas, (quota) => {
      const { start, end } = quota
      mObj.set(`${moment(start).format('YYYY-MM-DD.HH:ss')}-${moment(end).format('YYYY-MM-DD.HH:ss')}`, quota)
    })

    return mObj
  }, [quotas])

  return (
    <div className={`${prefixCls}-tbody`} style={{ width, opacity: isLoadingQuota ? 0.6 : 1 }} css={styles.tbody}>
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
            {map(weekDays, (weekday: WeekDay, tdIndex) => {
              const { date: current, meta } = weekday
              const { isNotChecked, isToday, isBeforeStartDay, isAfterEndDay } = meta
              const timeRange = getTimeRangeBySection(current, section)

              return (
                <TimeRangeItem
                  key={tdIndex}
                  timeRange={timeRange}
                  current={current}
                  advance={advance}
                  isAfterEndDay={isAfterEndDay}
                  isBeforeStartDay={isBeforeStartDay}
                  onChange={onChange}
                  value={value}
                  isMultiple={isMultiple}
                  isNotChecked={isNotChecked}
                  isLoadingQuota={isLoadingQuota}
                  quotasObj={quotasObj}
                >
                  {({ isDisabled, isSelected, onClick, startTime, endTime, remaining }: ItemChildrenResult) => {
                    const isSelectable = !isDisabled

                    const cellRendererProps = {
                      prefixCls,
                      isSelected,
                      isBeforeStartDay,
                      isAfterEndDay,
                      isSelectable,
                      isNotChecked,
                      day: current,
                      onClick,
                      startTime,
                      endTime,
                      remaining,
                      isToday,
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
