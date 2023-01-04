import clsx from 'clsx'
import styles from './loading-screen.component.module.css'

interface LoadingScreenProps {
  fullViewport?: boolean
  transparentBG?: boolean
}
export default function LoadingScreen({
  fullViewport = false,
  transparentBG = true,
}: LoadingScreenProps) {
  return (
    <div
      className={clsx(
        styles.container,
        fullViewport && styles.fullViewport,
        transparentBG && styles.transparentBG
      )}
    >
      <div className={styles.spinner}></div>
    </div>
  )
}
