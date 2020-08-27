import { mount } from 'enzyme'
import moment from 'moment'
import ReservationByDay from '../ReservationByDay'
import CalendarPanel from '../components/CalendarPanel'
import React from 'react'

describe('ReservationByDay', () => {
  it('should prop correct startDay when default', () => {
    const wrapper = mount(<ReservationByDay />)

    expect(wrapper.find(CalendarPanel).props()).toMatchObject({ startDay: moment().startOf('day') })
  })
})
