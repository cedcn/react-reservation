/** @jsx jsx */
import { jsx } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Moment } from 'moment'
import React, { useState, useEffect } from 'react'
import ByDay from './ByDay'
import { isEqual } from 'lodash'
import { Theme, Days, ByDayQuota, ByDayCellProps, Offset } from './interface'

export type Value = Moment | Moment[] | null

const defaultTheme = { borderColor: '#eee' }
export interface ReservationByDayProps {
  theme?: Theme
  prefixCls?: string
  defaultValue?: Value
  value?: Value
  onChange?: (value?: Value) => void
  days?: Days
  quotas?: ByDayQuota[] | ((startDay: Moment, endDay: Moment) => ByDayQuota[])
  advance?: Offset | boolean
  isMultiple?: boolean
  area?: Offset
  cellRenderer?: React.ComponentType<ByDayCellProps>
}

const ReservationByDay: React.FC<ReservationByDayProps> = (props) => {
  const { theme = defaultTheme, ...rest } = props

  const v = typeof props.value === 'undefined' ? props.defaultValue : props.value
  const [value, setValue] = useState<Value | undefined>(v)

  const onChange = (value?: Value) => {
    setValue(value)
    props.onChange && props.onChange(value)
  }

  useEffect(() => {
    if (!isEqual(props.value, value)) {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <ThemeProvider theme={theme}>
      <ByDay value={value} onChange={onChange} {...rest} />
    </ThemeProvider>
  )
}

export default ReservationByDay
