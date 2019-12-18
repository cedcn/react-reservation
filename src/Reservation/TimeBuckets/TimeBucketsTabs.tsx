/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo, useState } from 'react'
import { map, isNil, ceil, floor } from 'lodash'
import moment, { Moment } from 'moment'
import useResize from '../useResize'
import VirtualSlider from '../VirtualSlider'
import { TimeBucketsTableCommonProps } from '../interface'
import { gainWeekDays, gainTimeSections, gainCurrentDay } from '../utils'
import styles from '../styles'

const WeekList: React.FC<any> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    toNext,
    toLast,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    currentDayIdx,
    onChange,
    endDay,
    weekDays,
    currentWeekIdx,
    setCurrentDayIdx,
    ranges,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays(startDay, idx)
        const current = gainCurrentDay(startDay, currentDayIdx)
        const key = weekDaysItem[0].date.format()

        const tBodyProps = {
          prefixCls,
          startDay,
          endDay,
          currentWeekIdx,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          weekDays,
          toNext,
          toLast,
          onChange,
          width,
          value,
          ranges,
        }

        return (
          <div style={{ width, display: 'flex', justifyContent: 'space-between' }} key={key}>
            {map(weekDaysItem, (weekDay) => {
              return (
                <div
                  onClick={() => {
                    setCurrentDayIdx(currentWeekIdx * 7 + weekDay.date.day())
                  }}
                  key={weekDay.date.format()}
                >
                  <div>{weekDay.week}</div>
                  <div>{current.isSame(weekDay.date, 'days') ? 'current' : ''}</div>
                  {weekDay.date.format('MM-DD')}
                </div>
              )
            })}
          </div>
        )
      }),
    [displayIdxs, width, currentDayIdx, setCurrentDayIdx]
  )

  return <React.Fragment>{child}</React.Fragment>
}

const TimeBucketsList: React.FC<any> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    toNext,
    toLast,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    endDay,
    weekDays,
    currentWeekIdx,
    ranges,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const timeSections = gainTimeSections(startDay, idx, ranges)
        const key = timeSections[0].date.format()
        const tBodyProps = {
          prefixCls,
          startDay,
          endDay,
          currentWeekIdx,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          weekDays,
          toNext,
          toLast,
          onChange,
          width,
          value,
          ranges,
        }

        return (
          <div style={{ width, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }} key={key}>
            {map(timeSections, (section, index) => {
              return (
                <div style={{ width: '45%', textAlign: 'center', marginBottom: '10px' }} key={index}>
                  <div>
                    {section.range.start[0]}:{section.range.start[1]}-{section.range.end[0]}:{section.range.end[1]}
                  </div>
                  {section.date.format('MM-DD')}
                </div>
              )
            })}
          </div>
        )
      }),
    [displayIdxs, width]
  )

  return <React.Fragment>{child}</React.Fragment>
}

interface TimeBucketsTabsProps extends TimeBucketsTableCommonProps {}
const TimeBucketsTabs: React.FC<TimeBucketsTabsProps> = (props) => {
  const { prefixCls, toNext, toLast, startDay, currentWeekIdx, setCurrentWeekIdx, weekDays } = props
  const [viewEl, width] = useResize()
  const [currentDayIdx, setCurrentDayIdx] = useState(0)

  const toNextDay = () => {
    const targetCurrentDayIdx = currentDayIdx + 1
    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(floor(targetCurrentDayIdx / 7))
    return true
  }

  const toLastDay = () => {
    const targetCurrentDayIdx = currentDayIdx - 1
    setCurrentDayIdx(targetCurrentDayIdx)
    setCurrentWeekIdx(floor(targetCurrentDayIdx / 7))
    return true
  }

  return (
    <div className={`${prefixCls}-weeks-viewer`} ref={viewEl} css={styles.tbodyViewer}>
      {!!width && (
        <VirtualSlider
          className={`${prefixCls}-tbody-list`}
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
          className={`${prefixCls}-tbody-list`}
          width={width}
          idx={currentDayIdx}
          toNext={toNextDay}
          toLast={toLastDay}
        >
          {({ displayIdxs }) => <TimeBucketsList {...props} width={width} displayIdxs={displayIdxs} />}
        </VirtualSlider>
      )}
    </div>
  )
}

export default TimeBucketsTabs
