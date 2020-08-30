export const DATE_ROW_COUNT = 6
export const DATE_COL_COUNT = 7
export const MAX_SHOW_QUOTA = 9999

export type WeekKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
export type Week = {
  key: WeekKey
  code: number
}
export const WEEKS: Week[] = [
  {
    key: 'sunday',
    code: 0,
  },
  {
    key: 'monday',
    code: 1,
  },
  {
    key: 'tuesday',
    code: 2,
  },
  {
    key: 'wednesday',
    code: 3,
  },
  {
    key: 'thursday',
    code: 4,
  },
  {
    key: 'friday',
    code: 5,
  },
  {
    key: 'saturday',
    code: 6,
  },
]
