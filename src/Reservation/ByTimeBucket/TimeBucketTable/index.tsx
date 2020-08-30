/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { map, first, last } from 'lodash'
import cx from 'classnames'
import useResize from '../../utils/useResize'
import moment, { Moment } from 'moment'
import VirtualSlider from '../../components/VirtualSlider'
import { gainWeekDays, WeekDay } from '../../utils'
import WeekRollerHeader from '../../components/WeekRollerHeader'
import TimeBucketTable from './Table'
import { TimeBucketValue, TimeSection, WeekCode, SpecifiedDays, Offset, ByTimeBucketCellProps } from '../../interface'
import * as styles from './styles'

export interface TimeBucketViewerProps {
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: TimeBucketValue
  ranges: TimeSection[]
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange: (value?: TimeBucketValue) => void
  advance?: Offset | boolean
  isMultiple?: boolean
  cellRenderer?: React.ComponentType<ByTimeBucketCellProps>
}

const TimeBucketViewer: React.FC<TimeBucketViewerProps> = (props) => {
  const {
    prefixCls,
    startDay,
    endDay,
    value,
    ranges,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    isMultiple,
    advance,
    cellRenderer,
  } = props
  const [currentWeekIdx, setCurrentWeekIdx] = useState(0)

  const weekDays: WeekDay[] = gainWeekDays({
    startDay,
    weekIdx: currentWeekIdx,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    endDay,
    advance,
  })

  const startWeekDay = first(weekDays)?.date
  const endWeekDay = last(weekDays)?.date

  const canToLast = startDay.isBefore(startWeekDay, 'week')
  const canToNext = !endDay || (endDay && endDay.isAfter(endWeekDay, 'week'))

  const toNextWeek = (): boolean => {
    if (!canToNext) return false
    setCurrentWeekIdx(currentWeekIdx + 1)
    return true
  }

  const toLastWeek = (): boolean => {
    if (!canToLast) return false
    setCurrentWeekIdx(currentWeekIdx - 1)
    return true
  }

  const isCurrentWeek = currentWeekIdx === 0
  const weekDaysEls = map(weekDays, (day, xindex) => {
    const isToday = day.date.isSame(moment(), 'days')

    return (
      <div key={xindex} title={day.week} className={cx(`${prefixCls}-th`, { 'is-today': isToday })} css={styles.th}>
        <span className={cx(`${prefixCls}-th-inner`)} css={styles.thInner}>
          <span>{day.week}</span>
          <span>{day.date.format('M.D')}</span>
        </span>
      </div>
    )
  })
  const [viewEl, width] = useResize()

  return (
    <div>
      <WeekRollerHeader
        prefixCls={prefixCls}
        startWeekDay={startWeekDay}
        endWeekDay={endWeekDay}
        canToLast={canToLast}
        canToNext={canToNext}
        toNext={toNextWeek}
        toLast={toLastWeek}
      />
      <div className={`${prefixCls}-table`} css={styles.table}>
        <div className={`${prefixCls}-thead`} css={styles.thead}>
          <div className={cx(`${prefixCls}-tr`, { 'is-current-week': isCurrentWeek })} css={styles.tr}>
            <div
              key="column"
              role="column"
              className={cx(`${prefixCls}-th`, `${prefixCls}-column`)}
              css={[styles.th, styles.column]}
            ></div>
            {weekDaysEls}
          </div>
        </div>
        <div className={`${prefixCls}-viewer ${prefixCls}-viewer--weeks`} ref={viewEl} css={styles.viewer}>
          {!!width && (
            <VirtualSlider
              className={`${prefixCls}-tbody-list`}
              width={width}
              idx={currentWeekIdx}
              toNext={toNextWeek}
              toLast={toLastWeek}
            >
              {({ displayIdxs }) => (
                <TimeBucketTable
                  prefixCls={prefixCls}
                  disabledWeeks={disabledWeeks}
                  width={width}
                  displayIdxs={displayIdxs}
                  value={value}
                  ranges={ranges}
                  specifiedDays={specifiedDays}
                  disabledDays={disabledDays}
                  startDay={startDay}
                  endDay={endDay}
                  onChange={onChange}
                  currentWeekIdx={currentWeekIdx}
                  toNext={toNextWeek}
                  toLast={toLastWeek}
                  isMultiple={isMultiple}
                  advance={advance}
                  cellRenderer={cellRenderer}
                />
              )}
            </VirtualSlider>
          )}
        </div>
      </div>
    </div>
  )
}

export default TimeBucketViewer
