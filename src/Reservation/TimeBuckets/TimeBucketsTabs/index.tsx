/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { floor, find } from 'lodash'
import useResize from '../../useResize'
import VirtualSlider from '../../VirtualSlider'
import { TimeBucketsTableCommonProps } from '../../interface'
import { isNotCheckedFun, gainCurrentDay } from '../../utils'
import TimeSectionList from './TimeSectionList'
import WeekList from './WeekList'
import styles from '../../styles'

export type TimeBucketsTabsProps = TimeBucketsTableCommonProps
const TimeBucketsTabs: React.FC<TimeBucketsTabsProps> = (props) => {
  const {
    prefixCls,
    toNext,
    toLast,
    currentWeekIdx,
    startDay,
    endDay,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    setCurrentWeekIdx,
    onChange,
    weekDays,
  } = props

  const [viewEl, width] = useResize()
  let canToNextDay = true
  let canToLastDay = true
  const defaultActiveWeekDay = find(weekDays, (weekDay) => {
    if (weekDay.date.isBefore(startDay, 'day')) {
      return false
    }

    const isNotChecked = isNotCheckedFun(weekDay.date, { specifiedDays, disabledWeeks, disabledDays })
    return !isNotChecked
  })

  const [currentDayIdx, setCurrentDayIdx] = useState(defaultActiveWeekDay ? defaultActiveWeekDay.date.day() : 0)

  const toNextDay = (): boolean => {
    if (!canToNextDay) return false

    const targetCurrentDayIdx = currentDayIdx + 1
    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(floor(targetCurrentDayIdx / 7))
    return true
  }

  const toLastDay = (): boolean => {
    if (!canToLastDay) return false

    const targetCurrentDayIdx = currentDayIdx - 1
    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(floor(targetCurrentDayIdx / 7))
    return true
  }
  const currentDay = gainCurrentDay(startDay, currentDayIdx)
  canToLastDay = startDay.isBefore(currentDay, 'day')
  canToNextDay = !endDay || (endDay && endDay.isAfter(currentDay, 'day'))

  return (
    <div className={`${prefixCls}-viewer--tabs`} ref={viewEl} css={styles.tbodyViewer}>
      {!!width && (
        <VirtualSlider
          className={`${prefixCls}-week-list-container`}
          width={width}
          idx={currentWeekIdx}
          toNext={toNext}
          toLast={toLast}
        >
          {({ displayIdxs }) => (
            <WeekList
              {...props}
              width={width}
              currentDayIdx={currentDayIdx}
              setCurrentDayIdx={setCurrentDayIdx}
              displayIdxs={displayIdxs}
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
            <TimeSectionList
              {...props}
              width={width}
              displayIdxs={displayIdxs}
              onChange={(value: any) => {
                setCurrentWeekIdx(floor(currentDayIdx / 7))
                onChange(value)
              }}
            />
          )}
        </VirtualSlider>
      )}
    </div>
  )
}

export default TimeBucketsTabs
