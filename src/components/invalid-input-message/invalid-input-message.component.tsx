import { ReactNode } from 'react'
import styles from './invalid-input-message.component.module.css'

interface InvalidInputMessageProps {
  children?: ReactNode
}

/*
  This is a message that will appear whenever a field in a form is invalid
*/
export default function InvalidInputMessage({
  children,
}: InvalidInputMessageProps) {
  return <span className={styles.invalidInputMessage}>{children}</span>
}
