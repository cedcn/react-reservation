import React from 'react'
import { Moment } from 'moment'

interface CalendarHeaderProps {
  prefixCls?: string
  currentDay: Moment
  canToLast: boolean
  canToNext: boolean
  toLast: () => void
  toNext: () => void
}

class CalendarHeader extends React.Component<CalendarHeaderProps> {
  monthYearElement = () => {
    const { currentDay } = this.props
    return <span>{currentDay.format('YYYY年MM月')}</span>
  }

  render() {
    const { prefixCls, toLast, toNext, canToLast, canToNext } = this.props

    return (
      <div className={`reservation-header ${prefixCls}-header`}>
        {canToLast && (
          <a onClick={() => toLast()} title="上一月" className="reservation-prev-button">
            上一月
          </a>
        )}
        <div className={`reservation-header__title ${prefixCls}-header__week`}>{this.monthYearElement()}</div>
        {canToNext && (
          <a onClick={() => toNext()} title="下一月" className="reservation-next-button">
            下一月
          </a>
        )}
      </div>
    )
  }
}

export default CalendarHeader
