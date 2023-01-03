import { ReactNode } from 'react'
import ButtonLink from '../../components/button-link/button-link.component'
import Button from '../../components/button/button.component'
import Title from '../../components/title/title.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import styles from './list.layout.module.css'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import LoadingScreen from '../../components/loading-screen/loading-screen.component'

interface ListLayoutProps {
  title: string
  createPath: string
  pagination: ReactNode
  children?: ReactNode
  onRefresh?: () => void
}

export default function ListLayout({
  title,
  createPath,
  pagination,
  onRefresh,
  children,
}: ListLayoutProps) {
  const { isLoading } = useLoading()

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <>
          <Title>{title}</Title>
          <div className={styles.rowContainer}>
            {pagination}
            <div className={styles.actionButtonsContainer}>
              <Button
                variant="secondary"
                onClick={onRefresh}
                className={styles.refreshButton}
              >
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  className={styles.refreshIcon}
                />
              </Button>
              <ButtonLink
                variant="secondary"
                to={createPath}
                className={styles.createButton}
              >
                <FontAwesomeIcon icon={faPlus} className={styles.createIcon} />
              </ButtonLink>
            </div>
          </div>
          <div className={styles.listContainer}>{children}</div>
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  )
}
