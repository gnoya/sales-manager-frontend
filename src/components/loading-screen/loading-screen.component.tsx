import styles from './loading-screen.component.module.css'

interface LoadingScreenProps {
  fullViewport?: boolean
  transparentBG?: boolean
}
export default function LoadingScreen({
  fullViewport = false,
  transparentBG = false,
}: LoadingScreenProps) {
  return (
    <div
      className={`${styles.container} ${
        fullViewport ? styles.fullViewport : ''
      } ${transparentBG ? styles.transparentBG : ''}`}
    >
      <div className={styles.spinner}></div>
    </div>
  )
}
