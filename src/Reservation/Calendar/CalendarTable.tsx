/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { Moment } from 'moment'
import useResize from '../useResize'
import { map } from 'lodash'
import CalendarTHead from './CalendarTHead'
import CalendarTBody from './CalendarTBody'
import VirtualSlider from '../VirtualSlider'
import { CalendarTableCommonProps, CalendarValue, WeekCode, SpecifiedDays, CalendarQuota } from '../interface'
import { gainMonthDays } from '../utils'
import styles from '../styles'

export interface CalendarListProps {
  displayIdxs: number[]
  width?: number
  prefixCls: string
  startDay: Moment
  endDay?: Moment
  value?: CalendarValue
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  onChange: (value: CalendarValue) => void
  quotas?: CalendarQuota[]
}

const CalendarList: React.FC<CalendarListProps> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    endDay,
    quotas,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const { monthDays, firstMonthDay, lastMonthDay } = gainMonthDays(startDay, idx)
        const key = firstMonthDay.format('YYYY-MM')

        const tBodyProps = {
          prefixCls,
          startDay,
          endDay,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          monthDays,
          onChange,
          firstMonthDay,
          lastMonthDay,
          width,
          value,
          quotas,
        }

        return <CalendarTBody key={key} {...tBodyProps} />
      }),
    [
      displayIdxs,
      prefixCls,
      value?.format(),
      startDay.format(),
      endDay?.format(),
      width,
      disabledWeeks,
      disabledDays,
      specifiedDays,
      quotas,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

interface CalendarTableProps extends CalendarTableCommonProps {}

const CalendarTable: React.FC<CalendarTableProps> = (props) => {
  const {
    prefixCls,
    value,
    toNext,
    startDay,
    endDay,
    currentMonthIdx,
    toLast,
    specifiedDays,
    disabledWeeks,
    disabledDays,
    onChange,
    quotas,
  } = props
  const [viewEl, width] = useResize()
  return (
    <div className={`${prefixCls}-table`} css={styles.table}>
      <CalendarTHead prefixCls={prefixCls} value={value} />
      <div className={`${prefixCls}-viewer`} css={styles.tbodyViewer} ref={viewEl}>
        {!!width && (
          <VirtualSlider
            className={`${prefixCls}-tbody-list`}
            width={width}
            idx={currentMonthIdx}
            toNext={toNext}
            toLast={toLast}
          >
            {({ displayIdxs }) => (
              <CalendarList
                displayIdxs={displayIdxs}
                startDay={startDay}
                endDay={endDay}
                disabledWeeks={disabledWeeks}
                disabledDays={disabledDays}
                specifiedDays={specifiedDays}
                onChange={onChange}
                value={value}
                width={width}
                prefixCls={prefixCls}
                quotas={quotas}
              />
            )}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default CalendarTable
