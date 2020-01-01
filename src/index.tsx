import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import ReservationCalendar, { ReservationTimeBucket } from './Reservation'
import 'normalize.css'
import './index.css'
import 'moment/locale/zh-cn'

// moment.locale('zh-cn')
const gainCalendarQuotas = () => {
  return [
    { day: moment().add(1, 'day'), remaining: 1 },
    { day: moment().add(3, 'day'), remaining: 0 },
    { day: moment().add(10, 'day'), remaining: 100 },
    { day: moment().add(20, 'day'), remaining: 88 },
  ]
}

const gainTimeBucketQuotas = () => {
  return [
    { start: moment('2020-02-04 10:10'), end: moment('2020-02-04 11:20'), remaining: 1 },
    { start: moment('2020-02-04 11:30'), end: moment('2020-02-04 13:30'), remaining: 0 },
    { start: moment('2020-02-06 13:30'), end: moment('2020-02-06 15:30'), remaining: 32 },
  ]
}

const Com: React.FC<any> = () => {
  const [locale, setLocale] = useState('zh-cn')

  const onLocaleChange = (locale: string) => {
    setLocale(locale)
  }
  moment.locale(locale)

  return (
    <div>
      <button onClick={() => onLocaleChange('en')}>英文</button>
      <button onClick={() => onLocaleChange('zh-cn')}>中文</button>
      <ReservationTimeBucket
        days={{ startDay: moment('2020-01-05'), endDay: moment('2020-02-03 16: 00') }}
        ranges={[
          { start: [10, 0], end: [11, 0] },
          { start: [11, 0], end: [12, 0] },
          { start: [12, 0], end: [13, 0] },
          { start: [13, 0], end: [14, 0] },
          { start: [14, 0], end: [15, 0] },
          { start: [15, 0], end: [16, 0] },
          { start: [16, 0], end: [17, 0] },
        ]}
        mode="tabs"
      />
    </div>
  )
}

ReactDOM.render(
  <div>
    <h2>Repeat </h2>
    <Com />
    {/* <ReservationCalendar cellRender={() => <div>123</div>} />
    <ReservationCalendar advance />
    <ReservationCalendar quotas={gainCalendarQuotas} />
    <h2>Repeat, set disabled weeks and set disabled days</h2>
    <ReservationCalendar days={{ disabledWeeks: [0, 6], disabledDays: [moment('2020-04-03')] }} />
    <h2>Repeat, set start day and set end day</h2>
    <ReservationCalendar days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }} />
    <h2>Specified days</h2>
    <ReservationCalendar days={[moment('2020-04-03'), moment('2020-02-04')]} />
    <h2>Time Bucket</h2> */}

    {/* <ReservationTimeBucket
      days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }}
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
    />
    <h2>Time Bucket with quotas</h2>
    <ReservationTimeBucket
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [17, 30], end: [20, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      advance
    />
    <h2>Time Bucket with quotas</h2>
    <ReservationTimeBucket
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      mode="tabs"
      cellRender={() => <div>789</div>}
    />
    <ReservationTimeBucket
      days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03'), disabledDays: [moment('2020-02-07')] }}
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      quotas={gainTimeBucketQuotas}
    />
    <h2>Time Bucket list</h2>
    <ReservationTimeBucket
      days={{ startDay: moment('2020-02-03'), endDay: moment('2020-05-03') }}
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      mode="tabs"
    />
    <h2>Time Bucket list with quotas</h2>
    <ReservationTimeBucket
      days={{
        endDay: moment('2020-05-03'),
      }}
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      mode="tabs"
      quotas={[
        { start: moment('2020-02-04 10:10'), end: moment('2020-02-04 11:20'), remaining: 1 },
        { start: moment('2020-02-04 11:30'), end: moment('2020-02-04 13:30'), remaining: 0 },
        { start: moment('2020-02-06 13:30'), end: moment('2020-02-06 15:30'), remaining: 32 },
      ]}
    />
    <h2>Time Bucket list with async quotas</h2>
    <ReservationTimeBucket
      days={{
        endDay: moment('2020-05-03'),
      }}
      ranges={[
        { start: [10, 10], end: [11, 20] },
        { start: [11, 30], end: [13, 30] },
        { start: [13, 30], end: [15, 30] },
        { start: [15, 30], end: [20, 30] },
      ]}
      mode="tabs"
      quotas={[
        { start: moment('2020-02-04 10:10'), end: moment('2020-02-04 11:20'), remaining: 1 },
        { start: moment('2020-02-04 11:30'), end: moment('2020-02-04 13:30'), remaining: 0 },
        { start: moment('2020-02-06 13:30'), end: moment('2020-02-06 15:30'), remaining: 32 },
      ]}
      advance
    /> */}
  </div>,
  document.getElementById('root')
)
