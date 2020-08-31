import React, { useCallback } from 'react'
import { Moment } from 'moment'
import { some, cloneDeep, isEqual, filter, isFunction, isNil } from 'lodash'
import { isExpireFun, isSameRange } from '../utils'
import { TimeBucketValue, ByTimeBucketQuota, isListTimeBucket, TimeRange, Offset } from '../interface'

export interface TimeRangeItemProps {
  value?: TimeBucketValue
  timeRange: TimeRange
  quotasObj?: Map<string, ByTimeBucketQuota>
  onChange: (value?: TimeBucketValue) => void
  current?: Moment
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  isLoadingQuota?: boolean
  advance?: Offset | boolean
  isMultiple?: boolean
  isNotChecked?: boolean
}

export interface ItemChildrenResult {
  isDisabled: boolean
  isSelected: boolean
  remaining?: number
  startTime: Moment
  endTime: Moment
  onClick: () => void
}

const MAX_SHOW_QUOTA = 99
const TimeRangeItem: React.FC<TimeRangeItemProps> = (props) => {
  const {
    advance,
    isBeforeStartDay,
    isAfterEndDay,
    quotasObj,
    onChange,
    value,
    isMultiple,
    timeRange,
    isNotChecked,
    children,
    isLoadingQuota,
  } = props

  const [startDateTime, endDateTime] = timeRange
  const quota = quotasObj?.get(`${startDateTime.format('YYYY-MM-DD.HH:ss')}-${endDateTime.format('YYYY-MM-DD.HH:ss')}`)
  const remaining = quota?.remaining
  const isMakefull = !isNil(remaining) && remaining <= 0
  const isALittleRemaining = !isNil(remaining) && remaining > 0 && remaining < MAX_SHOW_QUOTA
  const isExpire = isExpireFun(startDateTime, advance)

  const isSelectable = !isBeforeStartDay && !isAfterEndDay && !isNotChecked && !isExpire
  const isDisabled = !isSelectable || isMakefull

  const isSelected = value
    ? isListTimeBucket(value)
      ? some(value, (item) => isSameRange(item, [startDateTime, endDateTime], 'minute'))
      : isSameRange(value, [startDateTime, endDateTime], 'minute')
    : false

  const onClick = useCallback(() => {
    if (isDisabled || isLoadingQuota) return

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
