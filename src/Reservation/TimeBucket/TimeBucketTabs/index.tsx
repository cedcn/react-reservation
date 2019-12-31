/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import useResize from '../../useResize'
import VirtualSlider from '../../VirtualSlider'
import { TimeBucketTableCommonProps, TimeBucketValue } from '../../interface'
import { gainDayByDayIdx, gainWeekIdxByDayIdx } from '../../utils'
import TimeSectionList from './TimeSectionList'
import WeekList from './WeekList'
import styles from '../../styles'

export type TimeBucketTabsProps = TimeBucketTableCommonProps
const TimeBucketTabs: React.FC<TimeBucketTabsProps> = (props) => {
  const { prefixCls, toNext, toLast, currentWeekIdx, startDay, endDay, setCurrentWeekIdx, onChange } = props

  const [viewEl, width] = useResize()
  let canToNextDay = true
  let canToLastDay = true

  const [currentDayIdx, setCurrentDayIdx] = useState(0)
  const currentDay = gainDayByDayIdx(startDay, currentDayIdx)

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
              onChange={(value: TimeBucketValue) => {
                setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, currentDayIdx))
                onChange(value)
              }}
            />
          )}
        </VirtualSlider>
      )}
    </div>
  )
}

export default TimeBucketTabs
