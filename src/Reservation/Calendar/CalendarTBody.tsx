/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import moment, { Moment } from 'moment'
import cx from 'classnames'
import { DATE_COL_COUNT, DATE_ROW_COUNT } from '../constants'
import {
  beforeCurrentMonthYear,
  afterCurrentMonthYear,
  isSameDay,
  gainCellCls,
  MonthDay,
  isNotCheckedFun,
} from '../utils'
import { find, get, isNil } from 'lodash'
import { CalendarValue, WeekCode, SpecifiedDays, CalendarQuota } from '../interface'
import ReservationCell from '../ReservationCell'
import CalendarCellStatus from './CalendarCellStatus'
import styles from '../styles'

const getTitleString = (value: Moment) => value.format('LL')

export interface CalendarTBodyProps {
  width?: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: CalendarValue
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange: (value: CalendarValue) => void
  className?: string
  quotas?: CalendarQuota[]
  firstMonthDay: Moment
  monthDays: MonthDay[]
}

const MAX_SHOW_QUOTA = 99
const CalendarTBody: React.FC<CalendarTBodyProps> = (props) => {
  const {
    prefixCls,
    monthDays,
    firstMonthDay,
    value,
    startDay,
    endDay,
    className,
    width,
    disabledWeeks = [],
    specifiedDays,
    disabledDays,
    onChange,
    quotas,
  } = props

  const today = moment()
  let passed = 0
  const tableHtml = []
  let current: Moment

  for (let iIndex = 0; iIndex < DATE_ROW_COUNT; iIndex++) {
    let isActiveWeek
    const dateCells = []

    for (let jIndex = 0; jIndex < DATE_COL_COUNT; jIndex++) {
      current = monthDays[passed].date

      const isToday = !!isSameDay(current, today)
      const isStartDate = !!isSameDay(current, startDay)
      const isEndDate = !!isSameDay(current, endDay)
      const isLastMonthDay = beforeCurrentMonthYear(current, firstMonthDay)
      const isNextMonthDay = afterCurrentMonthYear(current, firstMonthDay)
      const isBeforeStartDay = current.isBefore(startDay, 'days')
      const isAfterEndDay = endDay && current.isAfter(endDay, 'days')

      const currentQuota = find(quotas, (quota) => !!isSameDay(current, moment(quota.day)))
      const remaining = get(currentQuota, 'remaining')

      const isNotChecked = isNotCheckedFun(current, { specifiedDays, disabledWeeks, disabledDays })

      const isSelectable = !isLastMonthDay && !isNextMonthDay && !isBeforeStartDay && !isAfterEndDay && !isNotChecked
      const isMakefull = !isNil(remaining) && remaining <= 0
      const isALittleRemaining = !isNil(remaining) && remaining > 0 && remaining < MAX_SHOW_QUOTA
      const isDisabled = !isSelectable || isMakefull
      const isSelected = !isDisabled && !!isSameDay(current, value)

      if (isToday) {
        isActiveWeek = true
      }

      const status = {
        isToday,
        isStartDate,
        isEndDate,
        isBeforeStartDay,
        isAfterEndDay,
        isLastMonthDay,
        isNextMonthDay,
        isMakefull,
        isSelectable,
        isNotChecked,
        isSelected,
        isALittleRemaining,
      }

      dateCells.push(
        <div
          key={current.format('YYYY-MM-DD')}
          onClick={isDisabled ? undefined : isSelected ? onChange.bind(null, null) : onChange.bind(null, current)}
          role="gridcell"
          title={getTitleString(current)}
          css={styles.td}
          className={gainCellCls(`${prefixCls}-td`, status)}
        >
          <ReservationCell className={`${prefixCls}-cell`} status={status}>
            <CalendarCellStatus
              isSelectable={isSelectable}
              isSelected={isSelected}
              isMakefull={isMakefull}
              remaining={remaining}
              remainingMaxThreshold={MAX_SHOW_QUOTA}
              current={current}
            />
          </ReservationCell>
        </div>
      )

      passed++
    }

    tableHtml.push(
      <div
        key={iIndex}
        role="row"
        css={styles.tr}
        className={cx(`${prefixCls}-tr`, { 'is-active-week': isActiveWeek })}
      >
        {dateCells}
      </div>
    )
  }
  return (
    <div
      className={cx(`${prefixCls}-tbody`, className)}
      css={styles.tbody}
      style={{ width }}
      title={firstMonthDay.format('YYYY年MM月')}
    >
      {tableHtml}
    </div>
  )
}

export default React.memo(CalendarTBody)
