/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { floor } from 'lodash'
import moment, { Moment } from 'moment'
import useResize from '../../useResize'
import VirtualSlider from '../../VirtualSlider'
import { TimeBucketsTableCommonProps } from '../../interface'
import TimeSectionList from './TimeSectionList'
import WeekList from './WeekList'
import styles from '../../styles'

export type TimeBucketsTabsProps = TimeBucketsTableCommonProps
const TimeBucketsTabs: React.FC<TimeBucketsTabsProps> = (props) => {
  const { prefixCls, toNext, toLast, currentWeekIdx, setCurrentWeekIdx, weekDays } = props
  const [viewEl, width] = useResize()
  const [currentDayIdx, setCurrentDayIdx] = useState(0)

  const toNextDay = (): boolean => {
    const targetCurrentDayIdx = currentDayIdx + 1

    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(floor(targetCurrentDayIdx / 7))
    return true
  }

  const toLastDay = (): boolean => {
    const targetCurrentDayIdx = currentDayIdx - 1

    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(floor(targetCurrentDayIdx / 7))
    return true
  }

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
          {({ displayIdxs }) => <TimeSectionList {...props} width={width} displayIdxs={displayIdxs} />}
        </VirtualSlider>
      )}
    </div>
  )
}

export default TimeBucketsTabs
