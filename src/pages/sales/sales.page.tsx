import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Pagination from '../../components/pagination/pagination.component'
import SaleItem from '../../components/sale-item/sale-item.component'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { Sale } from '../../models/sale.model'
import { getSales } from '../../services/sale.service'

export default function SalesPage() {
  const { pathname } = useLocation()
  const { startLoading, stopLoading } = useLoading()
  const handleError = useErrorHandler()
  const [sales, setSales] = useState<Sale[]>([])
  const { page, limit, totalPages, setTotalPages, prevPage, nextPage } =
    usePagination({
      initialLimit: 10,
    })

  const fetchSales = useCallback(async () => {
    startLoading()

    try {
      const { sales, pagination } = await getSales(page, limit)
      setSales(sales)
      setTotalPages(pagination.last)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [
    page,
    limit,
    setSales,
    setTotalPages,
    handleError,
    startLoading,
    stopLoading,
  ])

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  return (
    <ListLayout
      pagination={
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
      }
      title="Sales"
      createPath={`${pathname}../sales-add`}
      onRefresh={fetchSales}
    >
      {sales.map((sale: Sale, index: number) => (
        <SaleItem key={index} sale={sale} onDelete={fetchSales} />
      ))}
    </ListLayout>
  )
}
