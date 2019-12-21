/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import React, { useState, useEffect } from 'react'
import TimeBuckets from './TimeBuckets'
import { TimeBucketsValue, Theme, TimeRange, Days } from './interface'

const defaultTheme = { borderColor: '#eee' }
export interface ReservationTimeBucketsProps {
  theme?: Theme
  prefixCls?: string
  defaultValue?: TimeBucketsValue
  value?: TimeBucketsValue
  mode?: 'tabs' | 'table'
  days?: Days
  ranges: TimeRange[]
  onChange?: (value: TimeBucketsValue) => void
}

const ReservationTimeBuckets: React.FC<ReservationTimeBucketsProps> = (props) => {
  const { theme = defaultTheme, prefixCls, days, ranges, mode } = props

  const v = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = useState<TimeBucketsValue>(v)

  const onChange = (value: TimeBucketsValue) => {
    setValue(value)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <ThemeProvider theme={theme}>
      <TimeBuckets value={value} onChange={onChange} prefixCls={prefixCls} days={days} ranges={ranges} mode={mode} />
    </ThemeProvider>
  )
}

export default ReservationTimeBuckets
