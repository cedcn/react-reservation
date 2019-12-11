import { css } from '@emotion/core'
import bgLine from '../assets/bg_line.png'

const N10 = '#eee'

// mixins
const lineGrayCell = css`
  background-color: ${N10};
  background-image: url(${bgLine});
  background-size: 20px;
  background-repeat: repeat;
`

const invalidCell = css`
  color: #ddd;
`

const notInMonthCell = css`
  opacity: 0.5;
`

const selectedCell = css`
  background-color: #5398ff;
  color: #fff;
`

const selectableCell = css`
  background-color: #7bd473;
  color: #fff;
`

const mixins = {
  lineGrayCell,
  invalidCell,
  selectedCell,
  selectableCell,
  notInMonthCell,
}

export default mixins
