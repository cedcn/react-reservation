/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import useResize from '../../utils/useResize'
import { WeekCode, SpecifiedDays } from '../../interface'
import CalendarTHead from './CalendarTHead'
import VirtualSlider from '../VirtualSlider'
import { CalendarValue } from '../Calendar'
import CalendarTable from './CalendarTable'
import { CalendarCellProps } from '../CalendarCell'
import { Offset } from '../../interface'
import * as styles from './styles'

export interface CalendarPanelProps {
  prefixCls: string
  currentMonthIdx: number
  value?: CalendarValue | null
  onChange?: (value?: CalendarValue | null) => void
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  startDay: Moment
  endDay?: Moment
  toNext: () => boolean
  toLast: () => boolean
  isMinShort?: boolean
  isMultiple?: boolean
  toggleOff?: boolean
  advance?: Offset | boolean
  cellRenderer?: React.ComponentType<CalendarCellProps>
}

const Calendar: React.FC<CalendarPanelProps> = (props) => {
  const {
    prefixCls,
    startDay,
    endDay,
    value,
    toNext,
    toLast,
    specifiedDays,
    disabledWeeks,
    disabledDays,
    currentMonthIdx,
    onChange,
    advance,
    isMinShort,
    cellRenderer,
    isMultiple,
  } = props

  const [viewRef, width] = useResize()

  return (
    <div className={`${prefixCls}-panel`} css={styles.panel}>
      <CalendarTHead prefixCls={prefixCls} isMinShort={isMinShort} />
      <div className={`${prefixCls}-viewer`} ref={viewRef} css={styles.viewer}>
        {!!width && (
          <VirtualSlider
            className={`${prefixCls}-list`}
            width={width}
            idx={currentMonthIdx}
            toNext={toNext}
            toLast={toLast}
          >
            {({ displayIdxs }) => (
              <CalendarTable
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
                advance={advance}
                cellRenderer={cellRenderer}
                isMultiple={isMultiple}
              />
            )}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default Calendar
