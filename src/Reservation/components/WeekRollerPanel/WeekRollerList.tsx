/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map, isUndefined } from 'lodash'
import moment, { Moment } from 'moment'
import { gainWeekDays } from '../../utils'
import { WeekCode, SpecifiedDays, Offset } from '../../interface'
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
  advance?: Offset | boolean
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
    advance,
    cellRenderer: CustomCellRenderer,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays({
          startDay,
          endDay,
          weekIdx: idx,
          specifiedDays,
          disabledWeeks,
          disabledDays,
          advance,
        })
        const key = weekDaysItem[0].date.format()

        return (
          <div style={{ width }} key={key} css={styles.weekTabContainer} className={`${prefixCls}-week-tab-container`}>
            {map(weekDaysItem, (weekDay) => {
              const { date, meta } = weekDay
              const { isToday, isStartDay, isEndDay, isBeforeStartDay, isAfterEndDay, isNotChecked } = meta

              const isDisabled = isNotChecked || isBeforeStartDay || isAfterEndDay
              const isSelected = !!value?.isSame(date, 'days')

              const cellRendererProps = {
                prefixCls,
                isDisabled,
                isToday,
                isStartDay,
                isEndDay,
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
