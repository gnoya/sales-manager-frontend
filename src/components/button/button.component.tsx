import clsx from 'clsx'
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

/*
  The button component that contains a set css styles controlled by "variant" prop
*/
export default function Button({
  className,
  children,
  variant,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styleMap[variant], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
