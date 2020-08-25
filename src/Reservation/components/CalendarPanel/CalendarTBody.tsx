/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useCallback } from 'react'
import moment, { Moment } from 'moment'
import cx from 'classnames'
import { DATE_COL_COUNT, DATE_ROW_COUNT } from '../../constants'
import {
  beforeCurrentMonthYear,
  afterCurrentMonthYear,
  isSameDay,
  isExpireFun,
  MonthDay,
  today,
  isNotCheckedFun,
} from '../../utils'
import { CalendarValue, CalendarQuota } from '../Calendar'
import { SpecifiedDays, WeekCode, Offset } from '../../interface'
import { find, get, isUndefined, isArray, cloneDeep, filter, isEqual, isNil, some } from 'lodash'
import CellRenderer, { CalendarCellProps } from '../CalendarCell'
import * as styles from './styles'

export interface CalendarTBodyProps {
  width: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: CalendarValue | null
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange?: (value?: CalendarValue | null) => void
  className?: string
  quotas?: CalendarQuota[]
  firstMonthDay: Moment
  monthDays: MonthDay[]
  advance?: Offset | boolean
  cellRenderer?: React.ComponentType<CalendarCellProps>
  isMultiple?: boolean
  toggleOff?: boolean
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
    width,
    disabledWeeks = [],
    specifiedDays,
    disabledDays,
    onChange,
    quotas,
    advance,
    isMultiple,
    toggleOff,
    cellRenderer: CustomCellRenderer,
  } = props

  const onCellClick = useCallback(
    (current, isDisabled, isSelected) => {
      if (isDisabled) return

      let newValue = cloneDeep(value)

      if (isMultiple) {
        if (newValue && !isArray(newValue)) {
          newValue = [newValue]
        }

        if (isSelected) {
          newValue = filter(newValue ?? [], (item) => !isSameDay(current, item))
        } else {
          newValue = [...(newValue ?? []), current]
        }
      } else {
        if (newValue && isArray(newValue)) {
          newValue = newValue[0]
        }

        if (isSelected && !toggleOff) {
          newValue = undefined
        } else {
          newValue = current
        }
      }

      if (!isEqual(newValue, value)) {
        onChange?.(newValue)
      }
    },
    [isMultiple, toggleOff, value, onChange]
  )

  let passed = 0
  const tableHtml = []

  for (let iIndex = 0; iIndex < DATE_ROW_COUNT; iIndex++) {
    let isCurrentWeek
    const dateCells = []

    for (let jIndex = 0; jIndex < DATE_COL_COUNT; jIndex++) {
      const current = monthDays[passed].date

      const isToday = isSameDay(current, today)
      const isStartDate = isSameDay(current, startDay)
      const isEndDate = isSameDay(current, endDay)

      const isLastMonthDay = beforeCurrentMonthYear(current, firstMonthDay)
      const isNextMonthDay = afterCurrentMonthYear(current, firstMonthDay)
      const isBeforeStartDay = current.isBefore(startDay, 'days')
      const isAfterEndDay = !!endDay && current.isAfter(endDay, 'days')

      const isExpire = isExpireFun(current, advance)
      const currentQuota = find(quotas, (quota) => !!isSameDay(current, moment(quota.day)))
      const remaining = get(currentQuota, 'remaining')
      const isNotChecked = isNotCheckedFun(current, { specifiedDays, disabledWeeks, disabledDays })

      const isSelectable =
        !isLastMonthDay && !isNextMonthDay && !isBeforeStartDay && !isAfterEndDay && !isNotChecked && !isExpire
      const isMakefull = !isNil(remaining) && remaining <= 0
      const isALittleRemaining = !isNil(remaining) && remaining > 0 && remaining < MAX_SHOW_QUOTA
      const isDisabled = !isSelectable || isMakefull
      const isSelected = isArray(value) ? some(value, (item) => isSameDay(current, item)) : isSameDay(current, value)

      if (isToday) {
        isCurrentWeek = true
      }
      const cellRendererProps = {
        key: 'cell-' + passed,
        prefixCls,
        isDisabled,
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
        currentDay: current,
        remaining,
        onClick: onCellClick.bind(null, current, isDisabled, isSelected),
      }
      const title = current.format('LL')

      dateCells.push(
        <span key={title} title={title} css={styles.td}>
          {isUndefined(CustomCellRenderer) ? (
            <CellRenderer {...cellRendererProps} />
          ) : (
            <CustomCellRenderer {...cellRendererProps} />
          )}
        </span>
      )
      passed++
    }

    tableHtml.push(
      <div
        key={'row-' + iIndex}
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
      className={cx(`${prefixCls}-tbody`)}
      style={{ width }}
      title={firstMonthDay.format('YYYY年MM月')}
      css={styles.tbody}
    >
      {tableHtml}
    </div>
  )
}

export default React.memo(CalendarTBody)
