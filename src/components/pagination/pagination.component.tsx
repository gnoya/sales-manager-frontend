import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import styles from './pagination.component.module.css'
import Button from '../button/button.component'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
}
export default function Pagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: PaginationProps) {
  return (
    <div className={styles.container}>
      <Button
        variant="main"
        className={styles.prevPageButton}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.prevPageButtonIcon}
        />
      </Button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <Button
        variant="main"
        className={styles.nextPageButton}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className={styles.nextPageButtonIcon}
        />
      </Button>
    </div>
  )
}
