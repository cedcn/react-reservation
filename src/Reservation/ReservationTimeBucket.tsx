/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Moment } from 'moment'
import { ThemeProvider } from 'emotion-theming'
import React, { useState, useEffect } from 'react'
import ByTimeBucket from './ByTimeBucket'
import {
  TimeBucketValue,
  Theme,
  Days,
  ByTimeBucketQuota,
  TimeSection,
  Offset,
  ByTimeBucketCellProps,
} from './interface'

const defaultTheme = { borderColor: '#eee' }
export interface ReservationTimeBucketProps {
  theme?: Theme
  prefixCls?: string
  defaultValue?: TimeBucketValue
  value?: TimeBucketValue
  mode?: 'tabs' | 'table'
  days?: Days
  ranges: TimeSection[]
  onChange?: (value?: TimeBucketValue) => void
  quotas?: ByTimeBucketQuota[] | ((startDay: Moment, endDay: Moment) => ByTimeBucketQuota[])
  advance?: Offset | boolean
  area?: Offset
  isMultiple?: boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const ReservationTimeBucket: React.FC<ReservationTimeBucketProps> = (props) => {
  const { theme = defaultTheme, ...rest } = props

  const v = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = useState<TimeBucketValue | undefined>(v)

  const onChange = (value?: TimeBucketValue) => {
    setValue(value)
  }

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <ThemeProvider theme={theme}>
      <ByTimeBucket value={value} onChange={onChange} {...rest} />
    </ThemeProvider>
  )
}

export default ReservationTimeBucket
