/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import { map } from 'lodash'
import { getTimeRangeBySection } from '../../utils'
import { TimeBucketValue, TimeSection, Offset } from '../../interface'
import TimeRangeItem, { ItemChildrenResult } from '../TimeRangeItem'
import TimeBucketCell from '../TimeBucketCell'
import * as styles from './styles'

interface TimeBucketListProps {
  prefixCls: string
  value?: TimeBucketValue
  width: number
  startDay: Moment
  endDay?: Moment
  currentDay: Moment
  ranges: TimeSection[]
  onChange: (value?: TimeBucketValue) => void
  quotas?: any
  advance?: Offset | boolean
  isMultiple?: boolean
  isNotChecked: boolean
}

const TimeBucketList: React.FC<TimeBucketListProps> = (props) => {
  const {
    prefixCls,
    value,
    width,
    startDay,
    onChange,
    endDay,
    ranges,
    quotas,
    advance,
    currentDay,
    isMultiple,
    isNotChecked,
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
            startDay={startDay}
            endDay={endDay}
            onChange={onChange}
            value={value}
            isMultiple={isMultiple}
            isNotChecked={isNotChecked}
          >
            {({
              isMakefull,
              isDisabled,
              isSelected,
              onClick,
              startTime,
              endTime,
              remainingQuota,
              isBeforeStartDayMinute,
              isAfterEndDayMinute,
            }: ItemChildrenResult) => {
              const isSelectable = !isDisabled

              return (
                <TimeBucketCell
                  prefixCls={prefixCls}
                  isSelected={isSelected}
                  isToday={false}
                  isBeforeStartDayMinute={isBeforeStartDayMinute}
                  isAfterEndDayMinute={isAfterEndDayMinute}
                  isMakefull={isMakefull}
                  isSelectable={isSelectable}
                  isNotChecked={isNotChecked}
                  currentDay={currentDay}
                  onClick={onClick}
                  startTime={startTime}
                  endTime={endTime}
                  remaining={remainingQuota}
                />
              )
            }}
          </TimeRangeItem>
        )
      })}
    </div>
  )
}

export default React.memo(TimeBucketList)
