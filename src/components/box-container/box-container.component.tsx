import { ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './box-container.component.module.css'

export interface BoxContainerProps {
  className?: string
  children: ReactNode
}

export default function BoxContainer({
  children,
  className,
}: BoxContainerProps) {
  return <div className={clsx(styles.container, className)}>{children}</div>
}
