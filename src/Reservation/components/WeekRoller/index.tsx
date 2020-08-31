/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Moment } from 'moment'
import usePrevious from '../../utils/usePrevious'
import cx from 'classnames'
import { first, last, find } from 'lodash'
import WeekRollerHeader from '../WeekRollerHeader'
import WeekRollerPanel from '../WeekRollerPanel'
import { Offset, WeekCode, SpecifiedDays } from '../../interface'
import { gainWeekDays, WeekDay, isSameDay, gainWeekIdxByDay } from '../../utils'
import { WeekRollerCellProps } from '../WeekRollerCell'

export interface WeekRollerProps<Q> {
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
  quotaRequest?: (start: Moment, end: Moment) => Promise<Q[]>
  setQuotas?: (quotas: Q[]) => void
  setIsLoadingQuota?: (bool: boolean) => void
}

const WeekRoller = <Q extends any>(props: WeekRollerProps<Q>) => {
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
    quotaRequest,
    setIsLoadingQuota,
    setQuotas,
  } = props

  const prevValue = usePrevious(value)
  const [currentWeekIdx, setCurrentWeekIdx] = useState(0)
  const weekDays: WeekDay[] = gainWeekDays({
    startDay,
    endDay,
    weekIdx: currentWeekIdx,
    disabledWeeks,
    disabledDays,
    specifiedDays,
    advance,
  })

  const startWeekDay = first(weekDays)?.date
  const endWeekDay = last(weekDays)?.date
  const canToLastWeek = startDay.isBefore(startWeekDay, 'week')
  const canToNextWeek = !endDay || (endDay && endDay.isAfter(endWeekDay, 'week'))

  const firstAvailableDay = find(weekDays, (day) => !day.meta.isNotChecked && !day.meta.isBeforeStartDay)

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
    if (startWeekDay && !isSameDay(startWeekDay, value) && firstAvailableDay) {
      onChange?.(firstAvailableDay.date)
    }
  }, [currentWeekIdx])

  useEffect(() => {
    let didCancel = false
    if (quotaRequest && startWeekDay && endWeekDay) {
      setIsLoadingQuota?.(true)
      quotaRequest(startWeekDay, endWeekDay)
        .then((data) => {
          if (!didCancel) {
            setQuotas?.(data)
          }
        })
        .finally(() => {
          if (!didCancel) {
            setIsLoadingQuota?.(false)
          }
        })
    }

    return () => {
      didCancel = true
    }
  }, [currentWeekIdx])

  useEffect(() => {
    if (value) {
      if (!isSameDay(value, prevValue)) {
        setCurrentWeekIdx(gainWeekIdxByDay(startDay, value))
      }

      const currentWeekDay = find(weekDays, (day) => isSameDay(day.date, value))

      if (currentWeekDay?.meta.isNotChecked) {
        onChange?.(value.clone().add(1, 'day'))
      }
    }
  }, [value])

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
