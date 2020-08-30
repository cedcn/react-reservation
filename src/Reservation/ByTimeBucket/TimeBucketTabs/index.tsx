/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { last, first } from 'lodash'
import useResize from '../../utils/useResize'
import VirtualSlider from '../../components/VirtualSlider'
import { TimeBucketValue, WeekCode, SpecifiedDays, TimeSection, ByTimeBucketCellProps, Offset } from '../../interface'
import { gainDayByDayIdx, gainWeekIdxByDayIdx, gainWeekDays, WeekDay } from '../../utils'
import TimeSectionListViewer from '../TimeSectionListViewer'
import { Moment } from 'moment'
import * as styles from './styles'
import WeekRoller from '../../components/WeekRoller'

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
  isMultiple?: boolean
  advance?: Offset | boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const TimeBucketTabs: React.FC<TimeBucketTabsProps> = (props) => {
  const {
    prefixCls,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    startDay,
    endDay,
    onChange,
    ranges,
    value,
    isMultiple,
    cellRenderer,
    advance,
  } = props

  const [viewEl, width] = useResize()

  const [currentDayIdx, setCurrentDayIdx] = useState(0)
  const [currentDay, setCurrentDay] = useState<Moment>(startDay)

  // const currentDay = gainDayByDayIdx(startDay, currentDayIdx)
  const canToLastDay = startDay.isBefore(currentDay, 'day')
  const canToNextDay = !endDay || (endDay && endDay.isAfter(currentDay, 'day'))

  const toNextDay = (): boolean => {
    if (!canToNextDay) return false

    const targetCurrentDayIdx = currentDayIdx + 1
    setCurrentDayIdx(targetCurrentDayIdx)
    // setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, targetCurrentDayIdx))
    return true
  }

  const toLastDay = (): boolean => {
    if (!canToLastDay) return false

    const targetCurrentDayIdx = currentDayIdx - 1
    setCurrentDayIdx(targetCurrentDayIdx)
    // setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, targetCurrentDayIdx))
    return true
  }

  return (
    <div>
      <div className={`${prefixCls}-tabs`} ref={viewEl} css={styles.tabs}>
        <WeekRoller
          prefixCls={prefixCls}
          startDay={startDay}
          value={currentDay}
          onChange={(newValue) => {
            newValue && setCurrentDay(newValue)
          }}
          disabledWeeks={disabledWeeks}
          specifiedDays={specifiedDays}
          disabledDays={disabledDays}
        />
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
              <TimeSectionListViewer
                width={width}
                value={value}
                displayIdxs={displayIdxs}
                disabledWeeks={disabledWeeks}
                specifiedDays={specifiedDays}
                disabledDays={disabledDays}
                startDay={startDay}
                endDay={endDay}
                prefixCls={prefixCls}
                isMultiple={isMultiple}
                ranges={ranges}
                cellRenderer={cellRenderer}
                advance={advance}
                onChange={(value?: TimeBucketValue) => {
                  // setCurrentWeekIdx(gainWeekIdxByDayIdx(startDay, currentDayIdx))
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
