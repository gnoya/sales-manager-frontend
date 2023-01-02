import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import styles from './pagination.component.module.css'

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
      <button
        className={styles.prevPageButton}
        onClick={onPrevPage}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.prevPageButtonIcon}
        />
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        className={styles.nextPageButton}
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon
          icon={faArrowRight}
          className={styles.nextPageButtonIcon}
        />
      </button>
    </div>
  )
}
