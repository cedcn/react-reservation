import { css } from '@emotion/core'

const weekTabContainer = css`
  display: flex;
  justify-content: space-between;
`

const weekTab = ({ isDisabled, isToday }: { isDisabled?: boolean; isToday?: boolean }) => css`
  font-size: 14px;

  ${isDisabled &&
    css`
      opacity: 0.5;
      cursor: no-drop;
    `}
`

const styles = {
  weekTab,
  weekTabContainer,
}

export default styles
