import React from 'react'
import Reservation from '../'
import renderer from 'react-test-renderer'
import MockDate from 'mockdate'

MockDate.set('2020-11-22')

it('renders correctly', () => {
  const tree = renderer.create(<Reservation />).toJSON()
  expect(tree).toMatchSnapshot()
})
