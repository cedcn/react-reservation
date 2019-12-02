import React from 'react'
import Reservation from '../'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Reservation />).toJSON()
  expect(tree).toMatchSnapshot()
})
