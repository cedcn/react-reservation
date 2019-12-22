import { css } from '@emotion/core'
import { Theme, CellStatus } from '../interface'
import mixins from './mixins'

const reservation = (theme: Theme) => css`
  border: ${theme.borderColor};
  font-size: 14px;

  * {
    box-sizing: border-box;
  }
`

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

const table = css`
  border-spacing: 0;
  margin-bottom: 0;
  width: 100%;
  text-align: center;
`

const tbodyViewer = css`
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
  padding: 0.8%;
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

const cell = (theme: Theme, status: CellStatus) => {
  let cellCss = mixins.lineGrayCell

  if (status.isBeforeStartDay || status.isAfterEndDay) {
    cellCss = mixins.invalidCell
  }

  if (status.isLastMonthDay || status.isNextMonthDay) {
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

    if (status.isMakefull) {
      cellCss = mixins.disabledCell
    }
  }

  return css`
    ${cellCss}
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    padding: 4px;
    transition: all 0.2s;
  `
}

const styles = {
  reservation,
  header,
  headerArrow,
  headerLabel,
  headerPrevArrow,
  headerNextArrow,
  table,
  tbodyViewer,
  tbody,
  tbodyList,
  thead,
  tr,
  td,
  th,
  cell,
}

export default styles
