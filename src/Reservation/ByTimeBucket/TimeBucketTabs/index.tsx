/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import useResize from '../../utils/useResize'
import VirtualSlider from '../../components/VirtualSlider'
import { TimeBucketValue, WeekCode, SpecifiedDays, SectionRanges, ByTimeBucketCellProps, Offset } from '../../interface'
import TimeSectionListViewer from '../TimeSectionListViewer'
import { Moment } from 'moment'
import { gainDayIdxByDay } from '../../utils'
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
  ranges: SectionRanges
  isMultiple?: boolean
  isMinShort?: boolean
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
    isMinShort,
    cellRenderer,
    advance,
  } = props

  const [viewEl, width] = useResize()

  const [currentDay, setCurrentDay] = useState<Moment>(startDay)
  const currentDayIdx = gainDayIdxByDay(startDay, currentDay)

  const canToLastDay = startDay.isBefore(currentDay, 'day')
  const canToNextDay = !endDay || (endDay && endDay.isAfter(currentDay, 'day'))

  const toNextDay = (): boolean => {
    if (!canToNextDay) return false

    setCurrentDay(currentDay.clone().add(1, 'day'))
    return true
  }

  const toLastDay = (): boolean => {
    if (!canToLastDay) return false
    setCurrentDay(currentDay.clone().add(-1, 'day'))
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
            if (newValue) {
              setCurrentDay(newValue)
            }
          }}
          isMinShort={isMinShort}
          disabledWeeks={disabledWeeks}
          specifiedDays={specifiedDays}
          disabledDays={disabledDays}
          endDay={endDay}
        />
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
