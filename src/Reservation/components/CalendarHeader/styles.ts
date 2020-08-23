import { css } from '@emotion/core'

const header = () => css`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 14px;
  font-size: 14px;
`

const headerArrow = () => css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
`

const headerPrevArrow = () => css`
  left: 14px;
`

const headerNextArrow = () => css`
  right: 14px;
`

const headerLabel = css`
  font-size: 16px;
`

export { header, headerArrow, headerPrevArrow, headerNextArrow, headerLabel }
