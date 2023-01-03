import { ButtonHTMLAttributes } from 'react'
import styles from './button.component.module.css'

export type ButtonVariant =
  | 'main'
  | 'main-regular'
  | 'secondary'
  | 'secondary-regular'
  | 'transparent'

export const styleMap: Record<ButtonVariant, string> = {
  'main': styles.main,
  'main-regular': styles.mainRegular,
  'secondary': styles.secondary,
  'secondary-regular': styles.secondaryRegular,
  'transparent': styles.transparent,
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
}
export default function Button(props: ButtonProps) {
  const { className, children, variant, ...rest } = props

  return (
    <button
      className={`${styles.button} ${styleMap[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
