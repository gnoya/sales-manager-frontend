import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './input.component.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...rest }, ref) => {
    return (
      <div className={styles.container}>
        <input
          ref={ref}
          className={clsx(className, styles.input)}
          {...rest}
          placeholder={' '}
        />
        <label htmlFor="" className={styles.label}>
          {label}
        </label>
      </div>
    )
  }
)

export default Input
