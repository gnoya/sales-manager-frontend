import clsx from 'clsx'
import { Link, LinkProps } from 'react-router-dom'
import { ButtonVariant, styleMap } from '../button/button.component'
import styles from './button-link.component.module.css'

interface ButtonLinkProps extends LinkProps {
  variant: ButtonVariant
}

/*
  The button component that acts as a Link (router) 
  that contains a set css styles controlled by "variant" prop
*/
export default function ButtonLink({
  className,
  children,
  variant,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(styles.buttonLink, styleMap[variant], className)}
      {...rest}
    >
      {children}
    </Link>
  )
}
