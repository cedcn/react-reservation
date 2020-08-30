/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import * as styles from '../CalendarHeader/styles'

interface WeekRollerHeaderProps {
  prefixCls?: string
  startWeekDay?: Moment
  endWeekDay?: Moment
  isMinShort?: boolean
  canToLast: boolean
  canToNext: boolean
  toLast: () => void
  toNext: () => void
}

const WeekRollerHeader: React.FC<WeekRollerHeaderProps> = (props) => {
  const { prefixCls, startWeekDay, endWeekDay, toLast, toNext, canToLast, canToNext, isMinShort } = props

  return (
    <div className={`${prefixCls}-header`} css={styles.header}>
      {canToLast && (
        <a
          className={`${prefixCls}-header__arrow ${prefixCls}-header__prev-arrow`}
          onClick={() => toLast()}
          title="Prev"
          css={(theme) => [styles.headerArrow(), styles.headerPrevArrow()]}
        >
          Prev
        </a>
      )}
      <div className={`${prefixCls}-header__label`} css={styles.headerLabel}>
        {startWeekDay && startWeekDay.format('LL')} - {endWeekDay && endWeekDay.format('LL')}
      </div>
      {canToNext && (
        <a
          className={`${prefixCls}-header__arrow ${prefixCls}-header__next-arrow`}
          onClick={() => toNext()}
          title="Next"
          css={(theme) => [styles.headerArrow(), styles.headerNextArrow()]}
        >
          Next
        </a>
      )}
    </div>
  )
}

export default WeekRollerHeader
