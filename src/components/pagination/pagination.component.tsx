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

/*
  This is a component to control pagination

  Params:
  currentPage: what is the page we are currently are
  totalPages: total number of pages
  onPrevPage: callback function to be called when the previous page button is clicked
  onNextPage: callback function to be called when the next page button is clicked
*/
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
