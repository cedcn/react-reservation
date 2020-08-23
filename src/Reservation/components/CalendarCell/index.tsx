/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import cx from 'classnames'
import CellStatus from '../CellStatus'
import * as styles from './styles'

export interface CellRendererProps {
  prefixCls: string
  isSelected: boolean
  isToday: boolean
  isStartDate: boolean
  isEndDate: boolean
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  isLastMonthDay: boolean
  isNextMonthDay: boolean
  isMakefull: boolean
  isSelectable: boolean
  isNotChecked: boolean
  currentDay: Moment
  remaining?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isDisabled?: boolean, isSelected?: boolean) => void
  className?: string
}

const CellRenderer: React.FC<CellRendererProps> = (props) => {
  const {
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
    currentDay,
    remaining,
    onClick,
    prefixCls,
  } = props

  return (
    <div
      onClick={onClick}
      role="gridcell"
      data-is-today={isToday}
      data-is-start-day={isStartDate}
      data-is-end-day={isEndDate}
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
          })
        }
      >
        <span>{currentDay.format('DD')}</span>
        <CellStatus
          isSelectable={isSelectable}
          isSelected={!!isSelected}
          remaining={remaining}
          isMakefull={isMakefull}
          prefixCls={prefixCls}
        />
      </div>
    </div>
  )
}

export default React.memo(CellRenderer)
