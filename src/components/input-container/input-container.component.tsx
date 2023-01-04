import { ReactNode } from 'react'
import styles from './input-container.component.module.css'

interface InputContainerProps {
  children?: ReactNode
}
export default function InputContainer({ children }: InputContainerProps) {
  return <div className={styles.container}>{children}</div>
}
