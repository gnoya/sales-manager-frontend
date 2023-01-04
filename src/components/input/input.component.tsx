import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './input.component.module.css'

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input ref={ref} className={`${styles.input} ${className}`} {...rest} />
  )
})

export default Input
