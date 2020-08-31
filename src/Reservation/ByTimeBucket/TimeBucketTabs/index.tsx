/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useCallback, useState, useMemo } from 'react'
import useResize from '../../utils/useResize'
import VirtualSlider from '../../components/VirtualSlider'
import {
  TimeBucketValue,
  WeekCode,
  SpecifiedDays,
  SectionRanges,
  ByTimeBucketCellProps,
  Offset,
  ByTimeBucketQuota,
} from '../../interface'
import { isNil, forEach } from 'lodash'
import TimeSectionListViewer from '../TimeSectionListViewer'
import moment, { Moment } from 'moment'
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
  quotaRequest?: (start: Moment, end: Moment) => Promise<ByTimeBucketQuota[]>
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
    quotaRequest,
  } = props

  const [viewEl, width] = useResize()
  const [quotas, setQuotas] = useState<ByTimeBucketQuota[] | undefined | null>(null)
  const [isLoadingQuota, setIsLoadingQuota] = useState(false)
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
  const onTimeSectionChange = useCallback((value?: TimeBucketValue) => {
    onChange(value)
  }, [])

  const WeekRollerChange = useCallback((newValue) => {
    if (newValue) {
      setCurrentDay(newValue)
    }
  }, [])

  const quotasObj = useMemo(() => {
    if (isNil(quotas)) return undefined

    const mObj = new Map<string, ByTimeBucketQuota>()
    forEach(quotas, (quota) => {
      const { start, end } = quota
      mObj.set(`${moment(start).format('YYYY-MM-DD.HH:ss')}-${moment(end).format('YYYY-MM-DD.HH:ss')}`, quota)
    })

    return mObj
  }, [quotas])

  return (
    <div>
      <div className={`${prefixCls}-tabs`} ref={viewEl} css={styles.tabs} style={{ opacity: isLoadingQuota ? 0.6 : 1 }}>
        <WeekRoller<ByTimeBucketQuota>
          prefixCls={prefixCls}
          startDay={startDay}
          value={currentDay}
          onChange={WeekRollerChange}
          quotaRequest={quotaRequest}
          setQuotas={setQuotas}
          setIsLoadingQuota={setIsLoadingQuota}
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
                quotasObj={quotasObj}
                isLoadingQuota={isLoadingQuota}
                cellRenderer={cellRenderer}
                advance={advance}
                onChange={onTimeSectionChange}
              />
            )}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default TimeBucketTabs
