/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import cx from 'classnames'
import { ByTimeBucketCellProps } from '../../../interface'
import CellStatus from '../../../components/CellStatus'
import * as styles from './styles'

const CellRenderer: React.FC<ByTimeBucketCellProps> = (props) => {
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
            isLineGray: isNotChecked || isBeforeStartDayMinute || isAfterEndDayMinute,
            isMakeFull: isMakefull,
          })
        }
      >
        <CellStatus
          css={styles.status}
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
