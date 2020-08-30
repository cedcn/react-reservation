/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { isNil } from 'lodash'
import { Moment } from 'moment'
import cx from 'classnames'
import CellStatus from '../CellStatus'
import * as styles from './styles'

export interface WeekRollerCellProps {
  prefixCls: string
  isSelected: boolean
  isToday: boolean
  isStartDate: boolean
  isEndDate: boolean
  isSelectable: boolean
  isBeforeStartDay: boolean
  isAfterEndDay: boolean
  isNotChecked: boolean
  day: Moment
  remaining?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isDisabled?: boolean, isSelected?: boolean) => void
  className?: string
}

const CellRenderer: React.FC<WeekRollerCellProps> = (props) => {
  const {
    isToday,
    isStartDate,
    isEndDate,
    isSelectable,
    isNotChecked,
    isSelected,
    remaining,
    onClick,
    day,
    prefixCls,
  } = props

  const isMakefull = !isNil(remaining) && remaining <= 0

  return (
    <div
      onClick={onClick}
      role="gridcell"
      data-is-today={isToday}
      data-is-start-day={isStartDate}
      data-is-end-day={isEndDate}
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
            isMakeFull: isMakefull,
            isInvalid: isNotChecked,
          })
        }
      >
        <div>{day.localeData().weekdaysShort(day)}</div>
        <div>{day.format('MM-DD')}</div>
      </div>
    </div>
  )
}

export default React.memo(CellRenderer)
