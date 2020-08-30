/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Moment } from 'moment'
import useResize from '../../utils/useResize'
import { WeekCode, SpecifiedDays } from '../../interface'
import VirtualSlider from '../VirtualSlider'
import WeekRollerList from './WeekRollerList'
import { WeekRollerCellProps } from '../WeekRollerCell'
import { Offset } from '../../interface'
import * as styles from './styles'

export interface WeekRollerPanelProps {
  prefixCls: string
  currentWeekIdx: number
  value?: Moment | null
  onChange?: (value?: Moment | null) => void
  disabledWeeks?: WeekCode[]
  specifiedDays?: SpecifiedDays
  disabledDays?: Moment[]
  startDay: Moment
  endDay?: Moment
  toNext: () => boolean
  toLast: () => boolean
  isMinShort?: boolean
  advance?: Offset | boolean
  cellRenderer?: React.ComponentType<WeekRollerCellProps>
}

const WeekRollerPanel: React.FC<WeekRollerPanelProps> = (props) => {
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
    currentWeekIdx,
    onChange,
    advance,
    isMinShort,
    cellRenderer,
  } = props

  const [viewRef, width] = useResize()

  return (
    <div className={`${prefixCls}-panel`} ref={viewRef} css={styles.panel}>
      {!!width && (
        <VirtualSlider
          className={`${prefixCls}-week-list-container`}
          width={width}
          idx={currentWeekIdx}
          toNext={toNext}
          toLast={toLast}
        >
          {({ displayIdxs }) => (
            <WeekRollerList
              value={value}
              width={width}
              onChange={onChange}
              displayIdxs={displayIdxs}
              disabledWeeks={disabledWeeks}
              specifiedDays={specifiedDays}
              disabledDays={disabledDays}
              startDay={startDay}
              endDay={endDay}
              prefixCls={prefixCls}
              cellRenderer={cellRenderer}
            />
          )}
        </VirtualSlider>
      )}
    </div>
  )
}

export default WeekRollerPanel
