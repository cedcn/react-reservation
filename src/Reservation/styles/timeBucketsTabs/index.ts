import { css } from '@emotion/core'

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
      cursor: no-drop;
    `}

  ${isActive &&
    css`
      border-bottom: 1px solid blue;
    `}
`

const timeSectionList = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 14px;
`

const timeSection = css`
  width: 45%;
  text-align: center;

  &:nth-of-type(n + 3) {
    margin-top: 10px;
  }
`

const styles = {
  weekTab,
  weekTabContainer,
  timeSectionList,
  timeSection,
}

export default styles
