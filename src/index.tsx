import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import ReservationCalendar, { ReservationTimeBuckets } from './Reservation'
import 'normalize.css'
import './index.css'

ReactDOM.render(
  <div>
    <h2>Repeat </h2>
    <ReservationCalendar />
    <ReservationCalendar
      quotas={[
        { day: moment(), remaining: 1 },
        { day: moment().add(1, 'day'), remaining: 1 },
        { day: moment().add(3, 'day'), remaining: 0 },
        { day: moment().add(10, 'day'), remaining: 100 },
        { day: moment().add(20, 'day'), remaining: 88 },
      ]}
    />
    <h2>Repeat, set disabled weeks and set disabled days</h2>
    <ReservationCalendar days={{ disabledWeeks: [0, 6], disabledDays: [moment('2020-04-03')] }} />
    <h2>Repeat, set start day and set end day</h2>
    <ReservationCalendar days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }} />
    <h2>Specified days</h2>
    <ReservationCalendar days={[moment('2020-04-03'), moment('2020-02-04')]} />
    <h2>Time Buckets</h2>
    <ReservationTimeBuckets
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
      days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }}
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      mode="tabs"
    />
  </div>,
  document.getElementById('root')
)
