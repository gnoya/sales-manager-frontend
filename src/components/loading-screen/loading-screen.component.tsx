import clsx from 'clsx'
import styles from './loading-screen.component.module.css'

interface LoadingScreenProps {
  fullViewport?: boolean
  transparentBG?: boolean
}

/*
  This is a loading screen component

  Params:
  fullViewport will have 100% of the screen
  transparentBG will remove the css background so it can become transparent
*/
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
