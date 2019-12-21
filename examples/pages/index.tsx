import React from 'react'
import moment from 'moment'
import ReservationCalendar, { ReservationTimeBuckets } from 'react-reservation'
import Head from 'next/head'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reservation</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <style jsx>{`
          .container {
            width: 100%;
            max-width: 768px;
            margin-left: auto;
            margin-right: auto;
          }

          h1 {
            text-align: center;
          }
        `}</style>
        <div className="container">
          <h1>Reservation</h1>
          <div>
            <h2>Repeat </h2>
            <ReservationCalendar />
            <h2>Repeat, set disabled weeks and set disabled days</h2>
            <ReservationCalendar days={{ disabledWeeks: [0, 1], disabledDays: [moment('2020-04-03')] }} />
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
                { start: [10, 30], end: [11, 30] },
                { start: [11, 30], end: [12, 30] },
                { start: [13, 30], end: [14, 30] },
                { start: [14, 30], end: [15, 30] },
                { start: [15, 30], end: [16, 30] },
                { start: [16, 30], end: [20, 30] },
              ]}
              mode="tabs"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
