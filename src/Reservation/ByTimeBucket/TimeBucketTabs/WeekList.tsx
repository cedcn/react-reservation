/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map } from 'lodash'
import moment, { Moment } from 'moment'
import cx from 'classnames'
import { gainWeekDays, gainDayByDayIdx, isSameDay, isNotCheckedFun, gainDayIdxByDay } from '../../utils'
import { WeekCode, SpecifiedDays } from '../../interface'
import * as styles from './styles'

interface WeekListProps {
  prefixCls: string
  displayIdxs: number[]
  width: number
  currentDayIdx: number
  setCurrentDayIdx: (idx: number) => void
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  startDay: Moment
  endDay?: Moment
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
    setCurrentDayIdx,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays(startDay, idx)
        const currentDay = gainDayByDayIdx(startDay, currentDayIdx)
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
                    setCurrentDayIdx(gainDayIdxByDay(startDay, weekDay.date))
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
    [
      prefixCls,
      displayIdxs,
      width,
      disabledDays,
      specifiedDays,
      disabledWeeks,
      startDay.format(),
      endDay && endDay.format(),
      moment.locale(),
      currentDayIdx,
      setCurrentDayIdx,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default React.memo(WeekList)