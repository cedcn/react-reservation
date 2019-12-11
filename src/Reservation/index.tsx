/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import ReservationCalendar from './Calendar'

const Reservation: React.FC<any> = (props) => {
  const theme = { borderColor: '#eee' }

  return (
    <ThemeProvider theme={theme}>
      <ReservationCalendar value={null} onChange={() => ({})} days={{ availableWeeks: [0, 1] }} />
    </ThemeProvider>
  )
}

export default Reservation
