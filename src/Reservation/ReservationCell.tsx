/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { CellStatus } from './interface'
import styles from './styles'

interface ReservationCellProps {
  className?: string
  status: CellStatus
  remaining?: number
}

const ReservationCell: React.FC<ReservationCellProps> = (props) => {
  const { children, className, status } = props

  return (
    <div className={className} css={(theme) => styles.cell(theme, status)}>
      {children}
    </div>
  )
}

export default ReservationCell
