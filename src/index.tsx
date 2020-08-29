import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { OffsetUnit } from './Reservation/interface'
import ReservationByDay, { ReservationByTimeBucket, TimeSection } from './Reservation'
import 'normalize.css'
import './index.css'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
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

const quotaRequest = (start: string, end: string) =>
  new Promise((resolve, reject) => {
    resolve([
      {
        day: moment()
          .add(1, 'day')
          .format('YYYY-MM-DD'),
        remaining: 1,
      },
      {
        day: moment()
          .add(3, 'day')
          .format('YYYY-MM-DD'),
        remaining: 0,
      },
      {
        day: moment()
          .add(10, 'day')
          .format('YYYY-MM-DD'),
        remaining: 100,
      },
      {
        day: moment()
          .add(20, 'day')
          .format('YYYY-MM-DD'),
        remaining: 88,
      },
    ])
  })

const ranges: TimeSection[] = [
  { start: [10, 10], end: [11, 20] },
  { start: [11, 30], end: [13, 30] },
  { start: [13, 30], end: [15, 30] },
  { start: [15, 30], end: [20, 30] },
]

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
      {/* <h2>默认</h2>
      <ReservationByDay />
      <ReservationByDay defaultValue={moment().add(1, 'day')} />
      <ReservationByDay isMinShort />
      <h2>支持多选</h2>
      <ReservationByDay isMultiple />
      <ReservationByDay isMultiple defaultValue={[moment().add(1, 'day'), moment().add(3, 'day')]} />
      <h2>提前预约</h2>
      <ReservationByDay advance />
      <ReservationByDay advance={{ value: 2, unit: OffsetUnit.Day }} />
      <h2>指定开始时间</h2>
      <h5>开始时间在当天之后</h5>
      <ReservationByDay days={{ startDay: moment().add(60, 'day') }} />
      <h5>开始时间在当天之前</h5>
      <ReservationByDay days={{ startDay: moment().subtract(60, 'day') }} />
      <ReservationByDay days={{ startDay: moment().subtract(60, 'day') }} advance />
      <h2>指定开始时间和结束时间</h2>
      <ReservationByDay days={{ startDay: moment().add(60, 'day'), endDay: moment().add(100, 'day') }} />
      <h2>禁用某些Week和禁用某些天</h2>
      <ReservationByDay
        days={{ disabledWeeks: [0, 6], disabledDays: [moment().add(3, 'day'), moment().add(4, 'day')] }}
      />
      <h2>限定指定哪些天可预约</h2>
      <ReservationByDay days={[moment().subtract(60, 'day'), moment().add(0, 'day'), moment().add(100, 'day')]} />
      <h2>自定义 Cell Renderer</h2>
      <ReservationByDay cellRenderer={({ currentDay }) => <span>{currentDay.format('DD')}</span>} />
      <h2>限定可预约的范围</h2>
      <ReservationByDay area={{ value: 2, unit: OffsetUnit.Month }} />
      <ReservationByDay advance area={{ value: 2, unit: OffsetUnit.Day }} /> */}

      {/* <h2>默认</h2>
      <ReservationByTimeBucket ranges={ranges} />

      <h2>支持多选</h2>
      <ReservationByTimeBucket ranges={ranges} isMultiple />
      <ReservationByTimeBucket
        days={{ disabledWeeks: [0, 6], disabledDays: [moment('2020-04-03')] }}
        ranges={ranges}
        isMultiple
        mode="tabs"
      />

      <h2>提前预约</h2>
      <ReservationByTimeBucket ranges={ranges} advance />
      <ReservationByTimeBucket ranges={ranges} advance={{ value: 12, unit: OffsetUnit.Day }} />
      <h2>指定开始时间</h2>
      <ReservationByTimeBucket ranges={ranges} days={{ startDay: moment().add(60, 'day') }} advance />
      <h5>开始时间在当天之前</h5>
      <ReservationByTimeBucket ranges={ranges} days={{ startDay: moment().subtract(60, 'day') }} />
      <h2>指定开始时间和结束时间</h2>
      <ReservationByTimeBucket
        ranges={ranges}
        days={{ startDay: moment().add(60, 'day'), endDay: moment().add(100, 'day') }}
      />
      <h2>禁用某些Week和禁用某些天</h2>
      <ReservationByTimeBucket
        ranges={ranges}
        days={{ disabledWeeks: [0, 6], disabledDays: [moment().add(3, 'day'), moment().add(4, 'day')] }}
      />
      <h2>自定义 Cell Renderer</h2>
      <ReservationByTimeBucket
        ranges={ranges}
        cellRenderer={({ currentDay }) => <span>{currentDay.format('DD')}</span>}
      />
      <h2>限定可预约的范围</h2>
      <ReservationByTimeBucket ranges={ranges} area={{ value: 2, unit: OffsetUnit.Month }} />
      <ReservationByTimeBucket ranges={ranges} advance area={{ value: 2, unit: OffsetUnit.Day }} /> */}

      <h2>默认</h2>
      <ReservationByTimeBucket ranges={ranges} mode="tabs" />

      <h2>支持多选</h2>
      <ReservationByTimeBucket ranges={ranges} isMultiple mode="tabs" />
      <ReservationByTimeBucket
        days={{ disabledWeeks: [0, 6], disabledDays: [moment('2020-04-03')] }}
        ranges={ranges}
        isMultiple
        mode="tabs"
      />

      <h2>提前预约</h2>
      <ReservationByTimeBucket ranges={ranges} advance mode="tabs" />
      <ReservationByTimeBucket ranges={ranges} advance={{ value: 12, unit: OffsetUnit.Day }} mode="tabs" />
      <h2>指定开始时间</h2>
      <ReservationByTimeBucket ranges={ranges} days={{ startDay: moment().add(60, 'day') }} advance mode="tabs" />
      <h5>开始时间在当天之前</h5>
      <ReservationByTimeBucket ranges={ranges} days={{ startDay: moment().subtract(60, 'day') }} mode="tabs" />
      <h2>指定开始时间和结束时间</h2>
      <ReservationByTimeBucket
        ranges={ranges}
        mode="tabs"
        days={{ startDay: moment().add(60, 'day'), endDay: moment().add(100, 'day') }}
      />
      <h2>禁用某些Week和禁用某些天</h2>
      <ReservationByTimeBucket
        ranges={ranges}
        mode="tabs"
        days={{ disabledWeeks: [0, 6], disabledDays: [moment().add(3, 'day'), moment().add(4, 'day')] }}
      />
      <h2>自定义 Cell Renderer</h2>
      <ReservationByTimeBucket
        ranges={ranges}
        mode="tabs"
        cellRenderer={({ currentDay }) => <span>{currentDay.format('DD')}</span>}
      />
      <h2>限定可预约的范围</h2>
      <ReservationByTimeBucket ranges={ranges} area={{ value: 2, unit: OffsetUnit.Month }} mode="tabs" />
      <ReservationByTimeBucket ranges={ranges} advance area={{ value: 2, unit: OffsetUnit.Day }} mode="tabs" />
    </div>
  )
}

ReactDOM.render(
  <div style={{ maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
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
