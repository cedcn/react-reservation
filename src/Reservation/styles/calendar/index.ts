import { css } from '@emotion/core'

const cellStatus = css`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
`

const cellStatusLabel = css`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`
const cellStatusContent = css`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  width: 100%;
`

const styles = {
  cellStatus,
  cellStatusLabel,
  cellStatusContent,
}

export default styles
