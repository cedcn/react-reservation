/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map } from 'lodash'
import moment from 'moment'
import cx from 'classnames'
import { gainWeekDays, gainCurrentDay, isSameDay, isNotCheckedFun } from '../../utils'
import styles from '../../styles/timeBucketsTabs'
import { TimeBucketsTabsProps } from './'

interface WeekListProps extends TimeBucketsTabsProps {
  displayIdxs: number[]
  width?: number
  currentDayIdx: number
  setCurrentDayIdx: (idx: number) => void
}

const WeekList: React.FC<WeekListProps> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    width,
    startDay,
    endDay,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    currentDayIdx,
    currentWeekIdx,
    setCurrentDayIdx,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays(startDay, idx)
        const currentDay = gainCurrentDay(startDay, currentDayIdx)

        const key = weekDaysItem[0].date.format()

        return (
          <div style={{ width }} key={key} css={styles.weekTabContainer} className={`${prefixCls}-week-tab-container`}>
            {map(weekDaysItem, (weekDay) => {
              const isToday = isSameDay(weekDay.date, moment())
              const isNotChecked = isNotCheckedFun(weekDay.date, {
                specifiedDays,
                disabledWeeks,
                disabledDays,
              })

              const isBeforeStartDay = weekDay.date.isBefore(startDay, 'days')
              const isAfterEndDay = endDay && weekDay.date.isAfter(endDay, 'days')
              const isDisabled = isNotChecked || isBeforeStartDay || isAfterEndDay
              const isActive = currentDay.isSame(weekDay.date, 'days')

              return (
                <div
                  onClick={() => {
                    if (isDisabled) {
                      return
                    }

                    setCurrentDayIdx(currentWeekIdx * 7 + weekDay.date.day())
                  }}
                  key={weekDay.date.format()}
                  className={cx(`${prefixCls}-week-tab`, {
                    [`${prefixCls}-is-disabled`]: isDisabled,
                    [`${prefixCls}-is-today`]: isToday,
                    [`${prefixCls}-is-active`]: isActive,
                  })}
                  css={() => styles.weekTab({ isDisabled, isToday, isActive })}
                >
                  <div>{weekDay.week}</div>
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

export default WeekList
