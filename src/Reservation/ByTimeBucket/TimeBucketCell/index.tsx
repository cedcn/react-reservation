/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import cx from 'classnames'
import CellStatus from '../../components/CellStatus'
import * as styles from './styles'

export interface CellRendererProps {
  prefixCls: string
  isSelected: boolean
  isToday: boolean
  isBeforeStartDayMinute: boolean
  isAfterEndDayMinute: boolean
  isMakefull: boolean
  isSelectable: boolean
  isNotChecked: boolean
  currentDay: Moment
  remaining?: number
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, isDisabled?: boolean, isSelected?: boolean) => void
  className?: string
  startTime: Moment
  endTime: Moment
}

const CellRenderer: React.FC<CellRendererProps> = (props) => {
  const {
    isBeforeStartDayMinute,
    isAfterEndDayMinute,
    isMakefull,
    isSelectable,
    isNotChecked,
    isSelected,
    remaining,
    onClick,
    prefixCls,
    startTime,
    endTime,
  } = props

  return (
    <div
      onClick={onClick}
      role="gridcell"
      data-is-before-start-day-minute={isBeforeStartDayMinute}
      data-is-after-end-day-minute={isAfterEndDayMinute}
      data-is-make-full={isMakefull}
      data-is-selectable={isSelectable}
      data-is-not-checked={isNotChecked}
      data-is-selected={isSelected}
      className={cx(`${prefixCls}-cell-wrapper`)}
      css={styles.wrapper}
    >
      <div
        className={cx(`${prefixCls}-cell`)}
        css={(theme) =>
          styles.cell(theme, {
            isSelected,
            isSelectable,
            isLineGray: isNotChecked,
            isMakeFull: isMakefull,
            isInvalid: isBeforeStartDayMinute || isAfterEndDayMinute,
          })
        }
      >
        <div>{`${startTime?.format('HH')}:${startTime?.format('mm')} - ${endTime?.format('HH')}:${endTime?.format(
          'mm'
        )}`}</div>
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
