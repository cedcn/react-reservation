import { css } from '@emotion/core'

const tabs = css`
  width: 100%;
  overflow: hidden;
`

const weekTabContainer = css`
  display: flex;
  justify-content: space-between;
  padding: 7px;
`

const weekTab = ({
  isDisabled,
  isToday,
  isActive,
}: {
  isDisabled?: boolean
  isToday?: boolean
  isActive?: boolean
}) => css`
  font-size: 14px;
  text-align: center;

  ${isDisabled &&
    css`
      opacity: 0.5;
    `}

  ${isActive &&
    css`
      border-bottom: 1px solid #ff6e6e;
      color: #ff6e6e;
    `}
`

const timeSectionList = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 14px;
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
  margin-top: 3px;
`

const timeSection = css`
  width: 45%;
  text-align: center;

  &:nth-of-type(n + 3) {
    margin-top: 10px;
  }
`

export { tabs, weekTab, weekTabContainer, timeSectionList, timeSection, cellStatus, cellStatusContent }
