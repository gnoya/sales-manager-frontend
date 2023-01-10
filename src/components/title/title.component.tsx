import { ReactNode } from 'react'
import styles from './title.component.module.css'

interface TitleProps {
  children: ReactNode
}

/*
  Title component so the whole application has the same title style
*/
export default function Title({ children }: TitleProps) {
  return <h1 className={styles.title}>{children}</h1>
}
