/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import comss from '../styles'

interface TimeBucketHeaderProps {
  prefixCls?: string
  startWeekDay?: Moment
  endWeekDay?: Moment
  canToLast: boolean
  canToNext: boolean
  toLast: () => void
  toNext: () => void
}

const TimeBucketHeader: React.FC<TimeBucketHeaderProps> = (props) => {
  const { prefixCls, startWeekDay, endWeekDay, toLast, toNext, canToLast, canToNext } = props

  return (
    <div className={`${prefixCls}-header`} css={comss.header}>
      {canToLast && (
        <a
          className={`${prefixCls}-header__arrow ${prefixCls}-header__prev-arrow`}
          onClick={() => toLast()}
          title="Prev"
          css={(theme) => [comss.headerArrow(), comss.headerPrevArrow()]}
        >
          Prev
        </a>
      )}
      <div className={`${prefixCls}-header__label`} css={comss.headerLabel}>
        {startWeekDay && startWeekDay.format('LL')} - {endWeekDay && endWeekDay.format('LL')}
      </div>
      {canToNext && (
        <a
          className={`${prefixCls}-header__arrow ${prefixCls}-header__next-arrow`}
          onClick={() => toNext()}
          title="Next"
          css={(theme) => [comss.headerArrow(), comss.headerNextArrow()]}
        >
          Next
        </a>
      )}
    </div>
  )
}

export default TimeBucketHeader
