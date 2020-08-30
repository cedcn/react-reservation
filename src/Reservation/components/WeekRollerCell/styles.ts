import mixins from '../../styles/mixins'
import { css } from '@emotion/core'

interface Status {
  isSelected?: boolean
  isSelectable?: boolean
  isLineGray?: boolean
  isMakeFull?: boolean
  isInvalid?: boolean
  notInMonth?: boolean
  isALittleRemaining?: boolean
}

const cell = (theme: any, status: Status, height?: number) => {
  let cellCss = mixins.lineGrayCell

  if (status.isInvalid) {
    cellCss = mixins.invalidCell
  }

  if (status.notInMonth) {
    cellCss = mixins.notInMonthCell
  }

  if (status.isSelectable) {
    cellCss = mixins.selectableCell

    if (status.isALittleRemaining) {
      cellCss = mixins.barelyCell
    }

    if (status.isSelected) {
      cellCss = mixins.selectedCell
    }

    if (status.isMakeFull) {
      cellCss = mixins.disabledCell
    }
  }

  return css`
    ${cellCss};
    height: ${height || 45}px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    transition: all 0.2s;
    position: relative;
    flex-direction: column;
  `
}

const wrapper = css`
  padding: 4px;
`

export { cell, wrapper }
