import { useState } from 'react'

interface PaginationProps {
  initialLimit: number
}

export function usePagination({ initialLimit }: PaginationProps) {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(initialLimit)
  const [totalPages, setTotalPages] = useState<number>(1)

  function prevPage() {
    setPage((prevState) => (prevState - 1 >= 0 ? prevState - 1 : 0))
  }

  function nextPage() {
    setPage((prevState) =>
      prevState + 1 <= totalPages ? prevState + 1 : prevState
    )
  }

  return {
    page,
    limit,
    totalPages,
    setLimit,
    setTotalPages,
    prevPage,
    nextPage,
  }
}
