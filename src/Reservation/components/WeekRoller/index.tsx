/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Moment } from 'moment'
import cx from 'classnames'
import { first, last } from 'lodash'
import WeekRollerHeader from '../WeekRollerHeader'
import WeekRollerPanel from '../WeekRollerPanel'
import { Offset, WeekCode, SpecifiedDays } from '../../interface'
import { gainWeekDays, WeekDay } from '../../utils'
import { WeekRollerCellProps } from '../WeekRollerCell'

export interface WeekRollerProps {
  prefixCls: string
  value?: Moment | null
  onChange?: (value?: Moment | null) => void
  className?: string
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  advance?: Offset | boolean
  cellRenderer?: React.ComponentType<WeekRollerCellProps>
  isMinShort?: boolean
  startDay: Moment
  endDay?: Moment
}

const WeekRoller: React.FC<WeekRollerProps> = (props) => {
  const {
    prefixCls = 'rV',
    className,
    isMinShort,
    value,
    advance,
    onChange,
    cellRenderer,
    startDay,
    endDay,
    disabledWeeks,
    disabledDays,
    specifiedDays,
  } = props

  const [currentWeekIdx, setCurrentWeekIdx] = useState(0)
  const weekDays: WeekDay[] = gainWeekDays(startDay, currentWeekIdx)
  const startWeekDay = first(weekDays)?.date
  const endWeekDay = last(weekDays)?.date
  const canToLastWeek = startDay.isBefore(startWeekDay, 'week')
  const canToNextWeek = !endDay || (endDay && endDay.isAfter(endWeekDay, 'week'))

  const gotoWeek = (offset: number) => {
    setCurrentWeekIdx(currentWeekIdx + offset)
  }

  const toLastWeek = () => {
    if (!canToLastWeek) return false
    gotoWeek(-1)
    return true
  }

  const toNextWeek = () => {
    if (!canToNextWeek) return false
    gotoWeek(1)
    return true
  }

  useEffect(() => {
    onChange?.(startWeekDay)
  }, [currentWeekIdx])

  const calendarPanelProps = {
    value,
    prefixCls,
    currentWeekIdx,
    onChange,
    startDay,
    endDay,
    specifiedDays,
    disabledWeeks,
    disabledDays,
    toLast: toLastWeek,
    toNext: toNextWeek,
    advance,
    isMinShort,
    cellRenderer,
  }

  return (
    <div className={cx(`${prefixCls}-week-roller`, className)}>
      <WeekRollerHeader
        prefixCls={prefixCls}
        startWeekDay={startWeekDay}
        endWeekDay={endWeekDay}
        canToLast={canToLastWeek}
        canToNext={canToNextWeek}
        toNext={toNextWeek}
        toLast={toLastWeek}
      />
      <WeekRollerPanel {...calendarPanelProps} />
    </div>
  )
}

export default WeekRoller
