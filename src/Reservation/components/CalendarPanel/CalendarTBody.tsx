/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useCallback } from 'react'
import moment, { Moment } from 'moment'
import cx from 'classnames'
import { DATE_COL_COUNT, DATE_ROW_COUNT } from '../../constants'
import { isSameDay, MonthDay } from '../../utils'
import { CalendarValue, CalendarQuota } from '../Calendar'
import { find, get, isUndefined, isArray, cloneDeep, filter, isEqual, isNil, some } from 'lodash'
import CellRenderer, { CalendarCellProps } from '../CalendarCell'
import * as styles from './styles'

export interface CalendarTBodyProps {
  width: number
  prefixCls: string
  value?: CalendarValue | null
  onChange?: (value?: CalendarValue | null) => void
  className?: string
  quotas?: CalendarQuota[]
  firstMonthDay: Moment
  monthDays: MonthDay[]
  cellRenderer?: React.ComponentType<CalendarCellProps>
  isMultiple?: boolean
  toggleOff?: boolean
}

const CalendarTBody: React.FC<CalendarTBodyProps> = (props) => {
  const {
    prefixCls,
    monthDays,
    firstMonthDay,
    value,
    width,
    onChange,
    quotas,
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
      const { meta, date } = monthDays[passed]

      const current = date
      const {
        isToday,
        isStartDay,
        isEndDay,
        isLastMonthDay,
        isNextMonthDay,
        isBeforeStartDay,
        isAfterEndDay,
        isExpire,
        isNotChecked,
      } = meta

      const currentQuota = find(quotas, (quota) => !!isSameDay(current, moment(quota.day)))
      const remaining = get(currentQuota, 'remaining')

      const isSelectable =
        !isLastMonthDay && !isNextMonthDay && !isBeforeStartDay && !isAfterEndDay && !isNotChecked && !isExpire
      const isMakefull = !isNil(remaining) && remaining <= 0
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
        isStartDay,
        isEndDay,
        isBeforeStartDay,
        isAfterEndDay,
        isLastMonthDay,
        isNextMonthDay,
        isSelectable,
        isNotChecked,
        isSelected,
        day: current,
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
