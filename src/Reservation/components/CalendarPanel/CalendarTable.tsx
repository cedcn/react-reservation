/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import moment, { Moment } from 'moment'
import { map, isArray } from 'lodash'
import CalendarTBody from './CalendarTBody'
import { WeekCode, SpecifiedDays, Offset } from '../../interface'
import { CalendarValue, CalendarQuota } from '../Calendar'
import { gainMonthDays } from '../../utils'
import { CalendarCellProps } from '../CalendarCell'

export interface CalendarListProps {
  displayIdxs: number[]
  width: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: CalendarValue | null
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange?: (value?: CalendarValue | null) => void
  quotas?: CalendarQuota[]
  advance?: Offset | boolean
  cellRenderer?: React.ComponentType<CalendarCellProps>
  isMultiple?: boolean
}

const CalendarTable: React.FC<CalendarListProps> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    endDay,
    quotas,
    advance,
    cellRenderer,
    isMultiple,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const { monthDays, firstMonthDay, lastMonthDay } = gainMonthDays(startDay, idx)
        console.log('monthDays', monthDays)
        const key = firstMonthDay.format('YYYY-MM')
        const startTime = firstMonthDay.format()
        const endTime = lastMonthDay.format()

        const tBodyProps = {
          prefixCls,
          startDay,
          endDay,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          monthDays,
          onChange,
          firstMonthDay,
          lastMonthDay,
          width,
          value,
          quotas,
          advance,
          cellRenderer,
          isMultiple,
        }

        return <CalendarTBody key={key} {...tBodyProps} />
      }),
    [
      displayIdxs,
      prefixCls,
      value && (isArray(value) ? map(value, (item) => item.format()).join('') : value.format()),
      startDay.format(),
      endDay?.format(),
      width,
      disabledWeeks,
      disabledDays,
      map(specifiedDays, (item) => item.format()).join(''),
      quotas,
      advance,
      moment.locale(),
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default CalendarTable
