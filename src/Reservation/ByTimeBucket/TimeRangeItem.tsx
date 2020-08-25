import React, { useCallback } from 'react'
import { Moment } from 'moment'
import { some, cloneDeep, isEqual, filter, isFunction, isNil } from 'lodash'
import { isExpireFun, isSameRange } from '../utils'
import { TimeBucketValue, ByTimeBucketQuota, isListTimeBucket, TimeRange, Offset } from '../interface'

export interface TimeRangeItemProps {
  value?: TimeBucketValue
  timeRange: TimeRange
  quota?: ByTimeBucketQuota
  onChange: (value?: TimeBucketValue) => void
  current?: Moment
  startDay: Moment
  endDay?: Moment
  isLoadingQuota?: boolean
  advance?: Offset | boolean
  isMultiple?: boolean
  isNotChecked?: boolean
}

export interface ItemChildrenResult {
  isMakefull: boolean
  isDisabled: boolean
  isSelected: boolean
  isExpire: boolean
  isBeforeStartDayMinute: boolean
  isAfterEndDayMinute: boolean
  remainingQuota?: number
  startTime: Moment
  endTime: Moment
  onClick: () => void
}

const MAX_SHOW_QUOTA = 99
const TimeRangeItem: React.FC<TimeRangeItemProps> = (props) => {
  const {
    advance,
    startDay,
    endDay,
    quota,
    onChange,
    value,
    isMultiple,
    isLoadingQuota,
    timeRange,
    isNotChecked,
    children,
  } = props

  const [startDateTime, endDateTime] = timeRange
  const isBeforeStartDayMinute = endDateTime.isBefore(startDay, 'minute')
  const isAfterEndDayMinute = !!endDay && endDateTime.isAfter(endDay, 'minute')

  const remaining = quota?.remaining
  const isMakefull = !isNil(remaining) && remaining <= 0
  const isALittleRemaining = !isNil(remaining) && remaining > 0 && remaining < MAX_SHOW_QUOTA
  const isExpire = isExpireFun(startDateTime, advance)

  const isSelectable = !isBeforeStartDayMinute && !isAfterEndDayMinute && !isNotChecked && !isExpire
  const isDisabled = !isSelectable || isMakefull

  const isSelected = value
    ? isListTimeBucket(value)
      ? some(value, (item) => isSameRange(item, [startDateTime, endDateTime], 'minute'))
      : isSameRange(value, [startDateTime, endDateTime], 'minute')
    : false

  const onClick = useCallback(() => {
    if (isDisabled) return

    let newValue = cloneDeep(value)
    if (isMultiple) {
      if (newValue && !isListTimeBucket(newValue)) {
        newValue = [newValue]
      }

      if (isSelected) {
        newValue = filter(newValue ?? [], (item) => !isSameRange([startDateTime, endDateTime], item, 'minute'))
      } else {
        newValue = [...(newValue ?? []), [startDateTime, endDateTime]]
      }
    } else {
      if (newValue && isListTimeBucket(newValue)) {
        newValue = newValue[0]
      }

      if (isSelected) {
        newValue = undefined
      } else {
        newValue = [startDateTime, endDateTime]
      }
    }

    if (!isEqual(newValue, value)) {
      onChange?.(newValue)
    }
  }, [value, isDisabled, isMultiple, isSelected, startDateTime, endDateTime])

  if (isFunction(children)) {
    return children({
      isMakefull,
      isDisabled,
      isBeforeStartDayMinute,
      isAfterEndDayMinute,
      isSelected,
      isExpire,
      isALittleRemaining,
      remaining,
      startTime: startDateTime,
      endTime: endDateTime,
      onClick,
    } as ItemChildrenResult)
  } else {
    return children
  }
}

export default TimeRangeItem
