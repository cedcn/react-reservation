import { css } from '@emotion/core'
import bgLine from '../assets/bg_line.png'

// mixins
const lineGrayCell = css`
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
  background-color: #ccf2da;
  color: #05510e;
`

const mixins = {
  lineGrayCell,
  invalidCell,
  selectedCell,
  selectableCell,
  notInMonthCell,
}

export default mixins
