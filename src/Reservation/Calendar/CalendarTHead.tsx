import React from 'react'
import { DATE_COL_COUNT } from '../constants'
import moment, { Moment } from 'moment'

interface CalendarTHeadProps {
  prefixCls: string
  value?: Moment | null
}

const CalendarTHead: React.FC<CalendarTHeadProps> = (props) => {
  const { value, prefixCls } = props

  const localeData = value ? value.localeData() : moment.localeData()
  const weekDays = []
  const firstDayOfWeek = localeData.firstDayOfWeek()
  const now = moment()

  for (let dateColIndex = 0; dateColIndex < DATE_COL_COUNT; dateColIndex++) {
    const index = (firstDayOfWeek + dateColIndex) % (DATE_COL_COUNT + 1)
    now.day(index)
    weekDays[dateColIndex] = localeData.weekdaysShort(now)
  }

  const weekDaysEls = weekDays.map((day, xindex) => {
    return (
      <div key={xindex} role="columnheader" title={day} className={`${prefixCls}-th ${prefixCls}-column-header`}>
        <span className={`${prefixCls}-column-header-inner`}>{day}</span>
      </div>
    )
  })

  return (
    <div className={`${prefixCls}-thead`}>
      <div className={`${prefixCls}-tr`} role="row">
        {weekDaysEls}
      </div>
    </div>
  )
}

export default CalendarTHead
