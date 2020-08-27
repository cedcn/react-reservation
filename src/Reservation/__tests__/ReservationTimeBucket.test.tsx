import { mount } from 'enzyme'
import ReservationTimeBucket from '../ReservationTimeBucket'
import TimeBucketTable from '../ByTimeBucket/TimeBucketTable'
import TimeBucketTabs from '../ByTimeBucket/TimeBucketTabs'

import React from 'react'
import { TimeSection } from '../interface'

describe('ReservationTimeBucket', () => {
  const ranges: TimeSection[] = [
    { start: [10, 10], end: [11, 20] },
    { start: [11, 30], end: [13, 30] },
    { start: [13, 30], end: [15, 30] },
    { start: [15, 30], end: [20, 30] },
  ]

  it('should render TimeBucketTable when default', () => {
    const wrapper = mount(<ReservationTimeBucket ranges={ranges} />)
    expect(wrapper.find(TimeBucketTable).length).toEqual(1)
  })

  it('should render TimeBucketTabs when the mode is "tabs"', () => {
    const wrapper = mount(<ReservationTimeBucket ranges={ranges} mode="tabs" />)
    expect(wrapper.find(TimeBucketTabs).length).toEqual(1)
  })
})
