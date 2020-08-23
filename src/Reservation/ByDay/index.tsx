/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Calendar, { CalendarProps } from '../components/Calendar'

type ByDayProps = Omit<CalendarProps, 'prefixCls'> & {
  prefixCls?: string
}

const ByDay: React.FC<ByDayProps> = (props) => {
  const { prefixCls = 'rV', ...rest } = props
  return <Calendar {...rest} className={`${prefixCls}-by-day`} prefixCls={prefixCls} />
}

export default ByDay
