import { css } from '@emotion/core'
import { Theme } from '../interface'

const reservation = (theme: Theme) => css`
  border: ${theme.borderColor};
  font-size: 14px;

  * {
    box-sizing: border-box;
  }
`

const styles = {
  reservation,
}

export default styles
