import React from 'react'
import { get, first, last } from 'lodash'
import { TimeBucketsTableCommonProps } from '../interface'

interface TimeBucketsContentViewProps extends TimeBucketsTableCommonProps {
  renderer: React.ComponentType<any>
  width?: number
}

const TimeBucketsContentView: React.FC<TimeBucketsContentViewProps> = ({
  renderer: Renderer, 
  weekDays,
  width,
  ...rest
}) => {
  const firstCurrentWeekDay = get(first(weekDays), 'date') // 当前周的第一天
  const lastCurrentWeekDay = get(last(weekDays), 'date') // 当前周的最后一天
  const startTime = firstCurrentWeekDay && firstCurrentWeekDay.format()
  const endTime = lastCurrentWeekDay && lastCurrentWeekDay.format()

  const tBodyProps = {
    ...rest,
    weekDays,
    width,
  }

  return <Renderer {...tBodyProps} />
}

export default TimeBucketsContentView
