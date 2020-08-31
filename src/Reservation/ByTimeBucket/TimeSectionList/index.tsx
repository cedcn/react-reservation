/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import { map, isUndefined } from 'lodash'
import { getTimeRangeBySection, gainWeekByCode } from '../../utils'
import {
  TimeBucketValue,
  SectionRanges,
  Offset,
  ByTimeBucketCellProps,
  isSameSectionRanges,
  ByTimeBucketQuota,
} from '../../interface'
import TimeRangeItem, { ItemChildrenResult } from '../TimeRangeItem'
import TimeBucketCell from '../TimeBucketCell'
import * as styles from './styles'

interface TimeBucketListProps {
  prefixCls: string
  value?: TimeBucketValue
  width: number
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  currentDay: Moment
  ranges: SectionRanges
  onChange: (value?: TimeBucketValue) => void
  advance?: Offset | boolean
  isMultiple?: boolean
  isNotChecked: boolean
  isLoadingQuota?: boolean
  quotasObj?: Map<string, ByTimeBucketQuota>
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const TimeBucketList: React.FC<TimeBucketListProps> = (props) => {
  const {
    prefixCls,
    value,
    width,
    isBeforeStartDay,
    onChange,
    isAfterEndDay,
    ranges,
    advance,
    currentDay,
    quotasObj,
    isMultiple,
    isNotChecked,
    cellRenderer: CustomCellRenderer,
    isLoadingQuota,
  } = props

  const key = gainWeekByCode(currentDay.day())?.key
  const activeRanges = isSameSectionRanges(ranges) ? ranges : key && ranges[key]

  return (
    <div className={`${prefixCls}-time-section-list`} css={styles.timeSectionList} style={{ width }}>
      {map(activeRanges, (section, index) => {
        const timeRange = getTimeRangeBySection(currentDay, section)

        return (
          <TimeRangeItem
            key={index}
            timeRange={timeRange}
            current={currentDay}
            advance={advance}
            isBeforeStartDay={isBeforeStartDay}
            isAfterEndDay={isAfterEndDay}
            onChange={onChange}
            value={value}
            quotasObj={quotasObj}
            isMultiple={isMultiple}
            isNotChecked={isNotChecked}
            isLoadingQuota={isLoadingQuota}
          >
            {({ isDisabled, isSelected, onClick, startTime, endTime, remaining }: ItemChildrenResult) => {
              const isSelectable = !isDisabled

              const cellRendererProps = {
                prefixCls,
                isSelected,
                isToday: false,
                isBeforeStartDay,
                isAfterEndDay,
                isSelectable,
                isNotChecked,
                day: currentDay,
                onClick,
                startTime,
                endTime,
                remaining,
              }
              return isUndefined(CustomCellRenderer) ? (
                <TimeBucketCell {...cellRendererProps} />
              ) : (
                <CustomCellRenderer {...cellRendererProps} />
              )
            }}
          </TimeRangeItem>
        )
      })}
    </div>
  )
}

export default React.memo(TimeBucketList)
