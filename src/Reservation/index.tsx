/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import ReservationCalendar from './Calendar'

const style = css`
  color: hotpink;
  background-color: #000;
`

const Reservation: React.FC<any> = () => {
  return (
    <div css={style}>
      <ReservationCalendar value={null} onChange={() => ({})} days={{ availableWeeks: [0, 1] }} />
    </div>
  )
}

export default Reservation
