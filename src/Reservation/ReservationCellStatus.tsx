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
        {isSelected
          ? '已选'
          : isNil(remainingQuota) || remainingQuota >= MAX_SHOW_QUOTA
          ? '充足'
          : `余(${formatRemainingQuota(remainingQuota)})`}
      </span>
    )
  }

  if (isFully) {
    return <span className="reservation-cell__status">约满</span>
  }

  return null
}

export default ReservationCellStatus
