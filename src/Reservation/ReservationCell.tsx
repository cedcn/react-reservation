/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { CellStatus } from './interface'
import styles from './styles'

interface ReservationCellProps {
  className?: string
  status: CellStatus
  remaining?: number
  height?: number
}

const ReservationCell: React.FC<ReservationCellProps> = (props) => {
  const { children, className, status, height } = props

  return (
    <div className={className} css={(theme) => styles.cell(theme, status, height)}>
      {children}
    </div>
  )
}

export default ReservationCell
