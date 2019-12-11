/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import React, { useState } from 'react'
import ReservationCalendar from './Calendar'
import { CalendarValue } from './interface'

const Reservation: React.FC<any> = (props) => {
  const theme = { borderColor: '#eee' }
  const [value, setValue] = useState<CalendarValue>(null)
  const onChange = (value: CalendarValue) => {
    setValue(value)
  }

  return (
    <ThemeProvider theme={theme}>
      <ReservationCalendar value={value} onChange={onChange} days={{ availableWeeks: [0, 1] }} />
    </ThemeProvider>
  )
}

export default Reservation
