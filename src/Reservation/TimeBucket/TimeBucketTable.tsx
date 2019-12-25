/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map } from 'lodash'
import cx from 'classnames'
import useResize from '../useResize'
import TimeBucketTbody from './TimeBucketTbody'
import moment from 'moment'
import VirtualSlider from '../VirtualSlider'
import { TimeBucketTableCommonProps } from '../interface'
import { gainWeekDays } from '../utils'
import comss from '../styles'
import styles from '../styles/timeBucket'

interface TimeBucketListProps extends TimeBucketTableProps {
  displayIdxs: number[]
  width: number
}

const TimeBucketList: React.FC<TimeBucketListProps> = (props) => {
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
    currentWeekIdx,
    setCurrentWeekIdx,
    ranges,
    quotas,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const weekDaysItem = gainWeekDays(startDay, idx)
        const key = weekDaysItem[0].date.format()

        const tBodyProps = {
          prefixCls,
          startDay,
          endDay,
          currentWeekIdx,
          disabledWeeks,
          specifiedDays,
          disabledDays,
          weekDays: weekDaysItem,
          toNext,
          toLast,
          onChange,
          width,
          value,
          ranges,
          quotas,
          setCurrentWeekIdx,
        }

        return <TimeBucketTbody key={key} {...tBodyProps} />
      }),
    [
      prefixCls,
      displayIdxs,
      width,
      value?.[0]?.format(),
      value?.[1]?.format(),
      disabledDays,
      specifiedDays,
      disabledWeeks,
      startDay.format(),
      endDay && endDay.format(),
      ranges,
      quotas,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export interface TimeBucketTableProps extends TimeBucketTableCommonProps {}
const TimeBucketTable: React.FC<TimeBucketTableProps> = (props) => {
  const { prefixCls, weekDays, currentWeekIdx, toNext, toLast } = props

  const isCurrentWeek = currentWeekIdx === 0
  const weekDaysEls = map(weekDays, (day, xindex) => {
    const isToday = day.date.isSame(moment(), 'days')

    return (
      <div key={xindex} title={day.week} className={cx(`${prefixCls}-th`, { 'is-today': isToday })} css={comss.th}>
        <span className={cx(`${prefixCls}-th-inner`)} css={styles.thInner}>
          <span>{day.week}</span>
          <span>{day.date.format('M.D')}</span>
        </span>
      </div>
    )
  })
  const [viewEl, width] = useResize()

  return (
    <div className={`${prefixCls}-table`} css={comss.table}>
      <div className={`${prefixCls}-thead`} css={comss.thead}>
        <div className={cx(`${prefixCls}-tr`, { 'is-current-week': isCurrentWeek })} css={comss.tr}>
          <div
            key="column"
            role="column"
            className={cx(`${prefixCls}-th`, `${prefixCls}-column`)}
            css={[comss.th, styles.column]}
          >
            <span>时段/日期</span>
          </div>
          {weekDaysEls}
        </div>
      </div>
      <div className={`${prefixCls}-viewer ${prefixCls}-viewer--weeks`} ref={viewEl} css={comss.tbodyViewer}>
        {!!width && (
          <VirtualSlider
            className={`${prefixCls}-tbody-list`}
            width={width}
            idx={currentWeekIdx}
            toNext={toNext}
            toLast={toLast}
          >
            {({ displayIdxs }) => <TimeBucketList {...props} width={width} displayIdxs={displayIdxs} />}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default TimeBucketTable
