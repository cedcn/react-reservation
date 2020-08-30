/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import { map, isUndefined } from 'lodash'
import { getTimeRangeBySection } from '../../utils'
import { TimeBucketValue, TimeSection, Offset, ByTimeBucketCellProps } from '../../interface'
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
  ranges: TimeSection[]
  onChange: (value?: TimeBucketValue) => void
  quotas?: any
  advance?: Offset | boolean
  isMultiple?: boolean
  isNotChecked: boolean
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
    quotas,
    advance,
    currentDay,
    isMultiple,
    isNotChecked,
    cellRenderer: CustomCellRenderer,
  } = props

  return (
    <div className={`${prefixCls}-time-section-list`} css={styles.timeSectionList} style={{ width }}>
      {map(ranges, (section, index) => {
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
            isMultiple={isMultiple}
            isNotChecked={isNotChecked}
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
