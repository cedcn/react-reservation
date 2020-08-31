/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { isNil } from 'lodash'
import cx from 'classnames'
import { ByTimeBucketCellProps } from '../../interface'
import CellStatus from '../../components/CellStatus'
import * as styles from './styles'

const CellRenderer: React.FC<ByTimeBucketCellProps> = (props) => {
  const {
    isBeforeStartDay,
    isAfterEndDay,
    isSelectable,
    isNotChecked,
    isSelected,
    remaining,
    onClick,
    prefixCls,
    startTime,
    endTime,
  } = props
  const isMakefull = !isNil(remaining) && remaining <= 0

  return (
    <div
      onClick={onClick}
      role="gridcell"
      data-is-before-start-day={isBeforeStartDay}
      data-is-after-end-day={isAfterEndDay}
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
            isInvalid: isBeforeStartDay || isAfterEndDay,
            isALittleRemaining: !isNil(remaining) && remaining > 0 && remaining <= 100,
          })
        }
      >
        <div>{`${startTime?.format('HH')}:${startTime?.format('mm')} - ${endTime?.format('HH')}:${endTime?.format(
          'mm'
        )}`}</div>
        <CellStatus isSelectable={isSelectable} isSelected={!!isSelected} remaining={remaining} prefixCls={prefixCls} />
      </div>
    </div>
  )
}

export default React.memo(CellRenderer)
