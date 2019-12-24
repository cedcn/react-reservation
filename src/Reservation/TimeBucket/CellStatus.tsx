/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { isNil } from 'lodash'
import { formatRemainingQuota } from '../utils'
import styles from '../styles/timeBucket'

interface CellStatusProps {
  isSelectable: boolean
  isSelected: boolean
  isMakefull: boolean
  remaining?: number | null
  remainingMaxThreshold: number
}

const TimeBucketCellStatus: React.FC<CellStatusProps> = (props) => {
  const { isSelectable, isSelected, isMakefull, remaining, remainingMaxThreshold } = props

  const selectedIcon = (
    <div css={styles.cellStatusContent}>
      <svg width="20px" height="13px" viewBox="0 0 161 112" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fill="#fff">
            <path
              d="M61.88125,111.539063 C58.71875,111.539063 55.56875,110.326562 53.15625,107.914062 L3.79375,58.3515625 C-1.01875,53.5140625 -1.01875,45.6640625 3.79375,40.8265625 C8.61875,35.9890625 16.43125,35.9890625 21.24375,40.8265625 L61.88125,81.6265625 L139.53125,3.6640625 C144.34375,-1.1859375 152.15625,-1.1859375 156.98125,3.6640625 C161.79375,8.5015625 161.79375,16.3390625 156.98125,21.1765625 L70.60625,107.914062 C68.19375,110.326562 65.03125,111.539063 61.88125,111.539063 Z"
              id="Path"
            ></path>
          </g>
        </g>
      </svg>
    </div>
  )

  const gainContent = () => {
    if (isSelectable && isMakefull) {
      return <div>约满</div>
    }

    if (isSelectable && isSelected) {
      return selectedIcon
    }

    if (isSelectable) {
      return isNil(remaining) || remaining >= remainingMaxThreshold ? '' : `余(${formatRemainingQuota(remaining)})`
    }
  }

  const content = gainContent()

  return (
    <div className="reservation-cell__status" css={styles.cellStatus}>
      {content}
    </div>
  )
}

export default TimeBucketCellStatus
