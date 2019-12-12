/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import React, { useState } from 'react'
import ReservationCalendar from './Calendar'
import { CalendarValue } from './interface'
import moment from 'moment'

const Reservation: React.FC<any> = (props) => {
  const theme = { borderColor: '#eee' }
  const [value, setValue] = useState<CalendarValue>(null)
  const onChange = (value: CalendarValue) => {
    setValue(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <h2>Repeat </h2>
      <ReservationCalendar value={value} onChange={onChange} />
      <h2>Repeat, set disabled weeks and set disabled days</h2>
      <ReservationCalendar
        value={value}
        onChange={onChange}
        days={{ disabledWeeks: [0, 1], disabledDays: [moment('2020-04-03')] }}
      />
      <h2>Repeat, set start day and set end day</h2>
      <ReservationCalendar
        value={value}
        onChange={onChange}
        days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }}
      />
      <h2>Specified days</h2>
      <ReservationCalendar value={value} onChange={onChange} days={[moment('2020-04-03'), moment('2020-02-04')]} />
    </ThemeProvider>
  )
}

export default Reservation
