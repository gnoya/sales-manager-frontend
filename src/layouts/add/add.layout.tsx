import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { useNavigate } from 'react-router'
import LoadingScreen from '../../components/loading-screen/loading-screen.component'
import styles from './add.layout.module.css'

interface AddLayoutProps {
  children?: ReactNode
}

export default function AddLayout({ children }: AddLayoutProps) {
  const { isLoading } = useLoading()
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <>
          <div className={styles.rowContainer}>
            <div className={styles.backButton} onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
              <span>Go back</span>
            </div>
          </div>
          <div className={styles.childrenContainer}>{children}</div>
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  )
}
