import { Moment } from 'moment'

export const gainDayByDayIdx = (startDay: Moment, dayIdx: number) => {
  return startDay.clone().add(dayIdx, 'days')
}
