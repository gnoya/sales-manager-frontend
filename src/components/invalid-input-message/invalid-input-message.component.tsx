import { ReactNode } from 'react'
import styles from './invalid-input-message.component.module.css'

interface InvalidInputMessageProps {
  children?: ReactNode
}
export default function InvalidInputMessage(props: InvalidInputMessageProps) {
  return <span className={styles.invalidInputMessage}>{props.children}</span>
}
