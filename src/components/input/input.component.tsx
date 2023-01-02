import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './input.component.module.css'

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <input ref={ref} className={`${styles.input} ${className}`} {...rest} />
  )
})

export default Input
