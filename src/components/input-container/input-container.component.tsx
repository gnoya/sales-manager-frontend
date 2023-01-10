import { ReactNode } from 'react'
import styles from './input-container.component.module.css'

interface InputContainerProps {
  children?: ReactNode
}

/* 
  This component is designed to wrap our custom Input container
*/
export default function InputContainer({ children }: InputContainerProps) {
  return <div className={styles.container}>{children}</div>
}
