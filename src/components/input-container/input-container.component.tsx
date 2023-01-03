import { ReactNode } from 'react'
import styles from './input-container.component.module.css'

interface InputContainerProps {
  label?: string
  children?: ReactNode
}
export default function InputContainer({
  label,
  children,
}: InputContainerProps) {
  return (
    <div className={styles.container}>
      {label && <span>{label}</span>}
      {children}
    </div>
  )
}
