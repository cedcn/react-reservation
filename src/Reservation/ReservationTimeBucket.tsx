/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import React, { useState, useEffect } from 'react'
import TimeBucket from './TimeBucket'
import { TimeBucketValue, Theme, TimeRange, Days, TimeBucketQuota } from './interface'

const defaultTheme = { borderColor: '#eee' }
export interface ReservationTimeBucketProps {
  theme?: Theme
  prefixCls?: string
  defaultValue?: TimeBucketValue
  value?: TimeBucketValue
  mode?: 'tabs' | 'table'
  days?: Days
  ranges: TimeRange[]
  onChange?: (value: TimeBucketValue) => void
  quotas?: TimeBucketQuota[]
}

const ReservationTimeBucket: React.FC<ReservationTimeBucketProps> = (props) => {
  const { theme = defaultTheme, prefixCls, days, ranges, mode, quotas } = props

  const v = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = useState<TimeBucketValue>(v)

  const onChange = (value: TimeBucketValue) => {
    setValue(value)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <ThemeProvider theme={theme}>
      <TimeBucket
        value={value}
        onChange={onChange}
        prefixCls={prefixCls}
        days={days}
        ranges={ranges}
        mode={mode}
        quotas={quotas}
      />
    </ThemeProvider>
  )
}

export default ReservationTimeBucket
