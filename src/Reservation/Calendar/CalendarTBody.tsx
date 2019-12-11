/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import moment, { Moment } from 'moment'
import cx from 'classnames'
import { DATE_COL_COUNT, DATE_ROW_COUNT } from '../constants'
import { beforeCurrentMonthYear, afterCurrentMonthYear, isSameDay, gainCellCls, MonthDay } from '../utils'
import { includes, find, get, isEmpty, findIndex } from 'lodash'
import ReservationCellStatus from '../ReservationCellStatus'
import { CalendarTableProps } from './CalendarTable'
import styles from '../styles'

const getTitleString = (value: Moment) => value.format('LL')

const quotaSummary: any[] = []
export interface CalendarTBodyProps extends CalendarTableProps {
  width: number
  className?: string
  quotaSummary?: any[]
  isLoadingQuota?: boolean
  firstMonthDay: Moment
  monthDays: MonthDay[]
}

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
    availableWeeks = [0, 1, 2, 3, 4, 5, 6],
    availableDays,
    onChange,
  } = props

  const today = moment()
  let passed = 0
  const tableHtml = []
  let current: Moment
  const cellClass = `${prefixCls}-td`

  for (let iIndex = 0; iIndex < DATE_ROW_COUNT; iIndex++) {
    let isCurrentWeek
    const dateCells = []

    for (let jIndex = 0; jIndex < DATE_COL_COUNT; jIndex++) {
      current = monthDays[passed].date

      const isToday = isSameDay(current, today)
      const isStartDate = isSameDay(current, startDay)
      const isEndDate = isSameDay(current, endDay)
      const isLastMonthDay = beforeCurrentMonthYear(current, firstMonthDay)
      const isNextMonthDay = afterCurrentMonthYear(current, firstMonthDay)
      const isBeforeStartDay = current.isBefore(startDay, 'days')
      const isAfterEndDay = endDay && current.isAfter(endDay, 'days')
      const isSelected = isSameDay(current, value)

      const currentQuotaSummary = find(quotaSummary, (item) => isSameDay(current, moment(item.datetime)))
      const remainingQuota = get(currentQuotaSummary, 'remainingQuota')

      let isNotChecked = !includes(availableWeeks, current.day())

      if (!isEmpty(availableDays)) {
        isNotChecked = findIndex(availableDays, (day) => isSameDay(day, current)) === -1
      }

      const isMakefull = !isNotChecked && remainingQuota === 0

      const isDisabled =
        isLastMonthDay || isNextMonthDay || isBeforeStartDay || isAfterEndDay || isMakefull || isNotChecked

      const isSelectable = !isDisabled

      if (isToday) {
        isCurrentWeek = true
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
      }
      dateCells.push(
        <div
          key={passed}
          onClick={isDisabled ? undefined : onChange.bind(null, current)}
          role="gridcell"
          title={getTitleString(current)}
          css={styles.td}
          className={gainCellCls(cellClass, status)}
        >
          <div className={`${prefixCls}-cell`} css={(theme) => styles.cell(theme, status)}>
            <span>{current.format('DD')}</span>
            <ReservationCellStatus
              isSelectable={isSelectable}
              isSelected={!!isSelected}
              remainingQuota={remainingQuota}
              isFully={isMakefull && !isBeforeStartDay && !isAfterEndDay}
            />
          </div>
        </div>
      )

      passed++
    }

    tableHtml.push(
      <div
        key={iIndex}
        role="row"
        css={styles.tr}
        className={cx(`${prefixCls}-tr`, { 'is-current-week': isCurrentWeek })}
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

export default CalendarTBody
