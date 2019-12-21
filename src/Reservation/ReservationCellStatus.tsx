import React from 'react'
import { isNil } from 'lodash'
import { formatRemainingQuota } from './utils'

interface ReservationCellStatusProps {
  isSelectable: boolean
  isSelected: boolean
  isFully: boolean
  remainingQuota?: number | null
}

const MAX_SHOW_QUOTA = 10000

const ReservationCellStatus: React.FC<ReservationCellStatusProps> = (props) => {
  const { isSelectable, isSelected, isFully, remainingQuota } = props

  if (isSelectable) {
    return (
      <span className="reservation-cell__status">
        {isSelected ? (
          <svg viewBox="0 0 1024 1024" version="1.1" p-id="3342" height="100" width="100" fill="#fff">
            <path
              d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z"
              p-id="3343"
            ></path>
          </svg>
        ) : isNil(remainingQuota) || remainingQuota >= MAX_SHOW_QUOTA ? (
          ''
        ) : (
          `余(${formatRemainingQuota(remainingQuota)})`
        )}
      </span>
    )
  }

  if (isFully) {
    return <span className="reservation-cell__status">约满</span>
  }

  return null
}

export default ReservationCellStatus
