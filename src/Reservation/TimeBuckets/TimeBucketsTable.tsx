/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map } from 'lodash'
import cx from 'classnames'
import useResize from '../useResize'
import TimeBucketsTbody from './TimeBucketsTbody'
import moment from 'moment'
import VirtualSlider from '../VirtualSlider'
import { TimeBucketsTableCommonProps } from '../interface'
import { gainWeekDays } from '../utils'
import styles from '../styles'

const TimeBucketsList: React.FC<any> = (props) => {
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
    weekDays,
    currentWeekIdx,
    setCurrentWeekIdx,
    ranges,
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
          weekDays,
          toNext,
          toLast,
          onChange,
          width,
          value,
          ranges,
          setCurrentWeekIdx,
        }

        return <TimeBucketsTbody key={key} {...tBodyProps} />
      }),
    [displayIdxs, width, value?.[0]?.format(), value?.[1]?.format()]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export interface TimeBucketsTableProps extends TimeBucketsTableCommonProps {}
const TimeBucketsTable: React.FC<TimeBucketsTableProps> = (props) => {
  const { prefixCls, weekDays, currentWeekIdx, toNext, toLast } = props

  const isCurrentWeek = currentWeekIdx === 0
  const weekDaysEls = map(weekDays, (day, xindex) => {
    const isToday = day.date.isSame(moment(), 'days')

    return (
      <div key={xindex} title={day.week} className={cx(`${prefixCls}-th`, { 'is-today': isToday })} css={styles.th}>
        <span className={cx(`${prefixCls}-th-inner`)}>
          <span>{day.week}</span>
          <span>{day.date.format('M.D')}</span>
        </span>
      </div>
    )
  })
  const [viewEl, width] = useResize()

  return (
    <div className={`${prefixCls}-table`} css={styles.table}>
      <div className={`${prefixCls}-thead`} css={styles.thead}>
        <div className={cx(`${prefixCls}-tr`, { 'is-current-week': isCurrentWeek })} css={styles.tr}>
          <div key="column" role="column" className={cx(`${prefixCls}-th`, `${prefixCls}-column`)} css={styles.th}>
            <span>时段/日期</span>
          </div>
          {weekDaysEls}
        </div>
      </div>
      <div className={`${prefixCls}-viewer ${prefixCls}-viewer--weeks`} ref={viewEl} css={styles.tbodyViewer}>
        {!!width && (
          <VirtualSlider
            className={`${prefixCls}-tbody-list`}
            width={width}
            idx={currentWeekIdx}
            toNext={toNext}
            toLast={toLast}
          >
            {({ displayIdxs }) => <TimeBucketsList {...props} width={width} displayIdxs={displayIdxs} />}
          </VirtualSlider>
        )}
      </div>
    </div>
  )
}

export default TimeBucketsTable
