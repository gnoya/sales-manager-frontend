import { ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './box-container.component.module.css'

export interface BoxContainerProps {
  className?: string
  children: ReactNode
}

/*
  This components wrap its children with a container that has box shadow
  and fixed padding.
*/
export default function BoxContainer({
  children,
  className,
}: BoxContainerProps) {
  return <div className={clsx(styles.container, className)}>{children}</div>
}
