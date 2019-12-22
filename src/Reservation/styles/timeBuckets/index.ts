import { css } from '@emotion/core'

const thInner = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const cellStatus = css`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
`

const cellStatusContent = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
`

const column = css`
  min-width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const styles = {
  column,
  cellStatus,
  cellStatusContent,
  thInner,
}

export default styles
