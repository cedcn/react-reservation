import { css } from '@emotion/core'

const panel = css`
  border-spacing: 0;
  margin-bottom: 0;
  width: 100%;
  text-align: center;
`

const viewer = css`
  width: 100%;
  overflow: hidden;
`

const tbody = css`
  padding: 6px;
`

const tr = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const td = css`
  width: ${100 / 7}%;
  flex-basis: ${100 / 7}%;
`
const th = css`
  ${td}
  line-height: 18px;
  padding: 7px 0;
`

const tbodyList = css`
  display: flex;
  position: relative;
  top: 0;
  left: 0;
`

const thead = css`
  padding: 0 6px;
`

export { panel, viewer, tbodyList, tbody, thead, tr, td, th }
