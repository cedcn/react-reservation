/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { isNil } from 'lodash'
import { Moment } from 'moment'
import cx from 'classnames'
import CellStatus from '../CellStatus'
import * as styles from './styles'

export interface CalendarCellProps {
  prefixCls: string
  isSelected: boolean
  isToday: boolean
  isStartDay: boolean
  isEndDay: boolean
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  isLastMonthDay: boolean
  isNextMonthDay: boolean
  isSelectable: boolean
  isNotChecked: boolean
  day: Moment
  remaining?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isDisabled?: boolean, isSelected?: boolean) => void
  className?: string
}

const CellRenderer: React.FC<CalendarCellProps> = (props) => {
  const {
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
    day,
    remaining,
    onClick,
    prefixCls,
  } = props
  const isMakefull = !isNil(remaining) && remaining <= 0

  return (
    <div
      onClick={onClick}
      role="gridcell"
      data-is-today={isToday}
      data-is-start-day={isStartDay}
      data-is-end-day={isEndDay}
      data-is-before-start-day={isBeforeStartDay}
      data-is-after-end-day={isAfterEndDay}
      data-is-last-month-day={isLastMonthDay}
      data-is-next-month-day={isNextMonthDay}
      data-is-make-full={isMakefull}
      data-is-selectable={isSelectable}
      data-is-not-checked={isNotChecked}
      data-is-selected={isSelected}
      className={cx(`${prefixCls}-cell-wrapper`)}
      css={styles.wrapper}
    >
      <div
        className={`${prefixCls}-cell`}
        css={(theme) =>
          styles.cell(theme, {
            isSelected,
            isSelectable,
            isLineGray: isNotChecked,
            isMakeFull: isMakefull,
            notInMonth: isLastMonthDay || isNextMonthDay,
            isInvalid: isBeforeStartDay || isAfterEndDay || isLastMonthDay || isNextMonthDay,
            isALittleRemaining: !isNil(remaining) && remaining > 0 && remaining <= 100,
          })
        }
      >
        <span>{day.format('DD')}</span>
        <CellStatus isSelectable={isSelectable} isSelected={!!isSelected} remaining={remaining} prefixCls={prefixCls} />
      </div>
    </div>
  )
}

export default React.memo(CellRenderer)
