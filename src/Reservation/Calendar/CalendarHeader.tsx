/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import styles from '../styles'

interface CalendarHeaderProps {
  prefixCls?: string
  currentDay: Moment
  canToLast: boolean
  canToNext: boolean
  toLast: () => void
  toNext: () => void
}

const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const monthYearElement = () => {
    const { currentDay } = props
    return <span>{currentDay.format('YYYY-MM')}</span>
  }

  const { prefixCls, toLast, toNext, canToLast, canToNext } = props

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
        {monthYearElement()}
      </div>
      {canToNext && (
        <a
          className={`${prefixCls}-header__arrow ${prefixCls}-header__next-arrow`}
          onClick={() => toNext()}
          title="next"
          css={(theme) => [styles.headerArrow(), styles.headerNextArrow()]}
        >
          Next
        </a>
      )}
    </div>
  )
}

export default CalendarHeader
