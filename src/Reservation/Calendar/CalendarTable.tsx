/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import useResize from '../useResize'
import { map } from 'lodash'
import CalendarTHead from './CalendarTHead'
import CalendarTBody from './CalendarTBody'
import VirtualSlider from '../VirtualSlider'
import { CalendarTableCommonProps } from '../interface'
import { gainMonthDays } from '../utils'
import styles from '../styles'

export interface CalendarTableProps extends CalendarTableCommonProps {}
const CalendarList: React.FC<any> = (props) => {
  const {
    displayIdxs,
    prefixCls,
    value,
    width,
    startDay,
    toNext,
    toLast,
    disabledWeeks,
    specifiedDays,
    disabledDays,
    onChange,
    endDay,
    quotas,
    currentMonthIdx,
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
          currentMonthIdx,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          monthDays,
          toNext,
          toLast,
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
      value && value.format(),
      width,
      disabledWeeks,
      disabledDays,
      specifiedDays,
      onChange,
      quotas,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

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
