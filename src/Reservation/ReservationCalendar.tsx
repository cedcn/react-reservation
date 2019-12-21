/** @jsx jsx */
import { jsx } from '@emotion/core'
import moment from 'moment'
import { ThemeProvider } from 'emotion-theming'
import React, { useState, useEffect } from 'react'
import Calendar from './Calendar'
import { CalendarValue, Theme, Days } from './interface'

const defaultTheme = { borderColor: '#eee' }
export interface ReservationCalendarProps {
  theme?: Theme
  prefixCls?: string
  defaultValue?: CalendarValue
  value?: CalendarValue
  onChange?: (value: CalendarValue) => void
  days?: Days
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = (props) => {
  const { theme = defaultTheme, days, prefixCls } = props

  const v = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = useState<CalendarValue>(v)

  const onChange = (value: CalendarValue) => {
    setValue(value)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <ThemeProvider theme={theme}>
      <Calendar value={value} onChange={onChange} days={days} prefixCls={prefixCls} />
    </ThemeProvider>
  )
}

export default ReservationCalendar
