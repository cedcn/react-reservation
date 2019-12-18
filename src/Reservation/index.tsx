/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import React, { useState } from 'react'
import ReservationCalendar from './Calendar'
import { CalendarValue, TimeBucketsValue } from './interface'
import moment from 'moment'
import ReservationTimeBuckets from './TimeBuckets'

const Reservation: React.FC<any> = (props) => {
  const theme = { borderColor: '#eee' }
  const [value, setValue] = useState<CalendarValue>(null)
  const onChange = (value: CalendarValue) => {
    setValue(value)
  }

  const [timeBucketsValue, setTimeBucketsValue] = useState<TimeBucketsValue>(null)
  const onTimeBucketsChange = (value: TimeBucketsValue) => {
    setTimeBucketsValue(value)
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
      <h2>Time Buckets</h2>
      <ReservationTimeBuckets
        value={timeBucketsValue}
        onChange={onTimeBucketsChange}
        days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }}
        ranges={[
          { start: [10, 10], end: [11, 20] },
          { start: [11, 30], end: [13, 30] },
          { start: [13, 30], end: [15, 30] },
          { start: [15, 30], end: [20, 30] },
        ]}
      />
      <h2>Time Buckets list</h2>
      <ReservationTimeBuckets
        value={timeBucketsValue}
        onChange={onTimeBucketsChange}
        days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }}
        ranges={[
          { start: [10, 10], end: [11, 20] },
          { start: [11, 30], end: [13, 30] },
          { start: [13, 30], end: [15, 30] },
          { start: [15, 30], end: [20, 30] },
        ]}
        mode="tabs"
      />
    </ThemeProvider>
  )
}

export default Reservation
