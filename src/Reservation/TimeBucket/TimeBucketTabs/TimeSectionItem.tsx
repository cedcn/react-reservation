/** @jsx jsx */
import { jsx } from '@emotion/core'
import moment, { Moment } from 'moment'
import React from 'react'
import { isNil, find, get } from 'lodash'
import ReservationCell from '../../ReservationCell'
import { gainCellCls, gainDateTimeRange, TimeSection } from '../../utils'
import CellStatus from './CellStatus'
import styles from '../../styles/timeBucketTabs'
import { TimeBucketQuota, TimeBucketValue } from '../../interface'

interface TimeSectionItemProps {
  section: TimeSection
  quotas?: TimeBucketQuota[]
  startDay: Moment
  endDay?: Moment
  value?: TimeBucketValue
  prefixCls?: string
  onChange: (value: TimeBucketValue) => void
  isNotChecked: boolean
}

const MAX_SHOW_QUOTA = 99
const TimeSectionItem: React.FC<TimeSectionItemProps> = (props) => {
  const { section, quotas, startDay, endDay, value, prefixCls, onChange, isNotChecked } = props

  const [startDateTime, endDateTime] = gainDateTimeRange(section.date, section.range)
  const currentQuota = find(
    quotas,
    (quota) => startDateTime.isSame(moment(quota.start), 'minute') && endDateTime.isSame(moment(quota.end), 'minute')
  )
  const isBeforeStartDayMinute = endDateTime.isBefore(startDay, 'minute')
  const isAfterEndDayMinute = endDay && endDateTime.isAfter(endDay, 'minute')

  const remaining = get(currentQuota, 'remaining')
  const isMakefull = !isNil(remaining) && remaining <= 0
  const isALittleRemaining = !isNil(remaining) && remaining > 0 && remaining < MAX_SHOW_QUOTA

  const isSelectable = !isBeforeStartDayMinute && !isAfterEndDayMinute && !isNotChecked
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
      css={styles.timeSection}
      className={gainCellCls(`${prefixCls}-time-section`, status)}
      onClick={
        isDisabled
          ? undefined
          : isSelected
          ? onChange.bind(null, null)
          : onChange.bind(null, [startDateTime, endDateTime])
      }
    >
      <ReservationCell className={`${prefixCls}-cell`} status={status} height={50}>
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
}

export default React.memo(TimeSectionItem)
