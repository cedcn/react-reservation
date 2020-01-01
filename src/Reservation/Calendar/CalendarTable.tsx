/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import moment, { Moment } from 'moment'
import useResize from '../useResize'
import { map, isFunction, first, last } from 'lodash'
import CalendarTHead from './CalendarTHead'
import CalendarTBody from './CalendarTBody'
import VirtualSlider from '../VirtualSlider'
import {
  CalendarTableCommonProps,
  CalendarValue,
  WeekCode,
  SpecifiedDays,
  CalendarQuota,
  CalendarCellRenderFun,
} from '../interface'
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
  advance?: number | boolean
  cellRender?: CalendarCellRenderFun
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
    advance,
    cellRender,
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
          advance,
          cellRender,
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
      advance,
      moment.locale(),
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
    advance,
    cellRender,
  } = props
  const [viewEl, width] = useResize()
  const { monthDays } = gainMonthDays(startDay, currentMonthIdx)

  const startMonthDay = first(monthDays)?.date
  const endMonthDay = last(monthDays)?.date
  const quotaList = isFunction(quotas) ? startMonthDay && endMonthDay && quotas(startMonthDay, endMonthDay) : quotas

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
                quotas={quotaList}
                advance={advance}
                cellRender={cellRender}
              />
            )}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default CalendarTable
