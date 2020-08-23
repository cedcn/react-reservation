/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { last, first } from 'lodash'
import useResize from '../../utils/useResize'
import VirtualSlider from '../../components/VirtualSlider'
import { TimeBucketValue, WeekCode, SpecifiedDays, TimeSection } from '../../interface'
import { gainDayByDayIdx, gainWeekIdxByDayIdx, gainWeekDays, WeekDay } from '../../utils'
import TImeBucketViewer from './TImeBucketViewer'
import WeekList from './WeekList'
import { Moment } from 'moment'
import TimeBucketHeader from '../../components/TimeBucketHeader'
import * as styles from './styles'

export interface TimeBucketTabsProps {
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: TimeBucketValue
  onChange: (value?: TimeBucketValue) => void
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  ranges: TimeSection[]
}

const TimeBucketTabs: React.FC<TimeBucketTabsProps> = (props) => {
  const { prefixCls, disabledWeeks, specifiedDays, disabledDays, startDay, endDay, onChange, ranges, value } = props

  const [viewEl, width] = useResize()

  const [currentDayIdx, setCurrentDayIdx] = useState(0)
  const [currentWeekIdx, setCurrentWeekIdx] = useState(0)

  const currentDay = gainDayByDayIdx(startDay, currentDayIdx)
  const canToLastDay = startDay.isBefore(currentDay, 'day')
  const canToNextDay = !endDay || (endDay && endDay.isAfter(currentDay, 'day'))

  const weekDays: WeekDay[] = gainWeekDays(startDay, currentWeekIdx)
  const startWeekDay = first(weekDays)?.date
  const endWeekDay = last(weekDays)?.date
  const canToLastWeek = startDay.isBefore(startWeekDay, 'week')
  const canToNextWeek = !endDay || (endDay && endDay.isAfter(endWeekDay, 'week'))

  const toNextDay = (): boolean => {
    if (!canToNextDay) return false

    const targetCurrentDayIdx = currentDayIdx + 1
    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, targetCurrentDayIdx))
    return true
  }

  const toLastDay = (): boolean => {
    if (!canToLastDay) return false

    const targetCurrentDayIdx = currentDayIdx - 1
    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, targetCurrentDayIdx))
    return true
  }

  const toNextWeek = (): boolean => {
    if (!canToNextWeek) return false
    setCurrentWeekIdx(currentWeekIdx + 1)
    return true
  }

  const toLastWeek = (): boolean => {
    if (!canToLastWeek) return false
    setCurrentWeekIdx(currentWeekIdx - 1)
    return true
  }

  return (
    <div>
      <TimeBucketHeader
        prefixCls={prefixCls}
        startWeekDay={startWeekDay}
        endWeekDay={endWeekDay}
        canToLast={canToLastWeek}
        canToNext={canToNextWeek}
        toNext={toNextWeek}
        toLast={toLastWeek}
      />
      <div className={`${prefixCls}-tabs`} ref={viewEl} css={styles.tabs}>
        {!!width && (
          <VirtualSlider
            className={`${prefixCls}-week-list-container`}
            width={width}
            idx={currentWeekIdx}
            toNext={toNextWeek}
            toLast={toLastWeek}
          >
            {({ displayIdxs }) => (
              <WeekList
                width={width}
                currentDayIdx={currentDayIdx}
                setCurrentDayIdx={setCurrentDayIdx}
                displayIdxs={displayIdxs}
                disabledWeeks={disabledWeeks}
                specifiedDays={specifiedDays}
                disabledDays={disabledDays}
                startDay={startDay}
                endDay={endDay}
                prefixCls={prefixCls}
              />
            )}
          </VirtualSlider>
        )}
        <br />
        {!!width && (
          <VirtualSlider
            className={`${prefixCls}-time-section-list-container`}
            width={width}
            idx={currentDayIdx}
            toNext={toNextDay}
            toLast={toLastDay}
          >
            {({ displayIdxs }) => (
              <TImeBucketViewer
                width={width}
                value={value}
                displayIdxs={displayIdxs}
                disabledWeeks={disabledWeeks}
                specifiedDays={specifiedDays}
                disabledDays={disabledDays}
                startDay={startDay}
                endDay={endDay}
                prefixCls={prefixCls}
                ranges={ranges}
                onChange={(value?: TimeBucketValue) => {
                  setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, currentDayIdx))
                  onChange(value)
                }}
              />
            )}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default TimeBucketTabs
