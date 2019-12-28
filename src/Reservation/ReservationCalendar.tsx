/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Moment } from 'moment'
import React, { useState, useEffect } from 'react'
import Calendar from './Calendar'
import { isEqual } from 'lodash'
import { CalendarValue, Theme, Days, CalendarQuota, CalendarCellRenderFun } from './interface'

const defaultTheme = { borderColor: '#eee' }
export interface ReservationCalendarProps {
  theme?: Theme
  prefixCls?: string
  defaultValue?: CalendarValue
  value?: CalendarValue
  onChange?: (value: CalendarValue) => void
  days?: Days
  quotas?: CalendarQuota[] | ((startDay: Moment, endDay: Moment) => CalendarQuota[])
  advance?: number | boolean
  cellRender?: CalendarCellRenderFun
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = (props) => {
  const { theme = defaultTheme, ...rest } = props

  const v = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = useState<CalendarValue>(v)

  const onChange = (value: CalendarValue) => {
    setValue(value)
    props.onChange && props.onChange(value)
  }

  useEffect(() => {
    if (!isEqual(props.value, value)) {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <ThemeProvider theme={theme}>
      <Calendar value={value} onChange={onChange} {...rest} />
    </ThemeProvider>
  )
}

export default ReservationCalendar
