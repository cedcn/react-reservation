/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map, isUndefined } from 'lodash'
import moment, { Moment } from 'moment'
import { gainWeekDays, gainDayByDayIdx, isSameDay, isNotCheckedFun, gainDayIdxByDay, getNow } from '../../utils'
import { WeekCode, SpecifiedDays } from '../../interface'
import WeekRollerCell, { WeekRollerCellProps } from '../WeekRollerCell'
import * as styles from './styles'

interface WeekRollerPanelProps {
  prefixCls: string
  displayIdxs: number[]
  width: number
  value?: Moment | null
  onChange?: (value?: Moment | null) => void
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  startDay: Moment
  endDay?: Moment
  cellRenderer?: React.ComponentType<WeekRollerCellProps>
}

const WeekRollerList: React.FC<WeekRollerPanelProps> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    width,
    startDay,
    endDay,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    value,
    cellRenderer: CustomCellRenderer,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays(startDay, idx)
        const key = weekDaysItem[0].date.format()

        return (
          <div style={{ width }} key={key} css={styles.weekTabContainer} className={`${prefixCls}-week-tab-container`}>
            {map(weekDaysItem, (weekDay) => {
              const isToday = isSameDay(weekDay.date, getNow())
              const isNotChecked = isNotCheckedFun(weekDay.date, {
                specifiedDays,
                disabledWeeks,
                disabledDays,
              })

              const isStartDate = isSameDay(weekDay.date, startDay)
              const isEndDate = isSameDay(weekDay.date, endDay)
              const isBeforeStartDay = weekDay.date.isBefore(startDay, 'days')
              const isAfterEndDay = !!endDay && weekDay.date.isAfter(endDay, 'days')
              const isDisabled = isNotChecked || isBeforeStartDay || isAfterEndDay
              const isSelected = !!value?.isSame(weekDay.date, 'days')

              const cellRendererProps = {
                prefixCls,
                isDisabled,
                isToday,
                isStartDate,
                isEndDate,
                isBeforeStartDay,
                isAfterEndDay,
                isSelectable: !isDisabled,
                isNotChecked,
                isSelected,
                day: weekDay.date,
                remaining: undefined,
                onClick: () => {
                  onChange?.(weekDay.date)
                },
              }

              return (
                <span>
                  {isUndefined(CustomCellRenderer) ? (
                    <WeekRollerCell {...cellRendererProps} />
                  ) : (
                    <CustomCellRenderer {...cellRendererProps} />
                  )}
                </span>
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
      value,
      onChange,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default React.memo(WeekRollerList)
