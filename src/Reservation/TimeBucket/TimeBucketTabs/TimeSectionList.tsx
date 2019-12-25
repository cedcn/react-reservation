/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useMemo } from 'react'
import { map } from 'lodash'
import { gainTimeSections } from '../../utils'
import TimeSectionItem from './TimeSectionItem'
import styles from '../../styles/timeBucketTabs'
import { TimeBucketTabsProps } from './'

interface TimeSectionListProps extends TimeBucketTabsProps {
  displayIdxs: number[]
  width?: number
}

const TimeSectionList: React.FC<TimeSectionListProps> = (props) => {
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
    ranges,
    quotas,
  } = props

  const child = useMemo(
    () =>
      map(displayIdxs, (idx) => {
        const timeSections = gainTimeSections(startDay, idx, ranges)
        const key = timeSections[0].date.format()

        return (
          <div className={`${prefixCls}-time-section-list`} css={styles.timeSectionList} style={{ width }} key={key}>
            {map(timeSections, (section, index) => (
              <TimeSectionItem
                section={section}
                key={index}
                quotas={quotas}
                startDay={startDay}
                endDay={endDay}
                value={value}
                prefixCls={prefixCls}
                onChange={onChange}
              />
            ))}
          </div>
        )
      }),
    [
      displayIdxs,
      width,
      prefixCls,
      startDay.format(),
      disabledWeeks,
      disabledDays,
      specifiedDays,
      value?.[0]?.format(),
      value?.[1]?.format(),
      ranges,
      quotas,
    ]
  )

  return <React.Fragment>{child}</React.Fragment>
}

export default React.memo(TimeSectionList)
