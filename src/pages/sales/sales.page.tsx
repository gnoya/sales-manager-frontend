import { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/pagination/pagination.component'
import SaleItem from '../../components/sale-item/sale-item.component'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { Sale } from '../../models/sale.model'
import { getSales } from '../../services/sale.service'
import styles from './sales.page.module.css'

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const { page, limit, totalPages, setTotalPages, prevPage, nextPage } =
    usePagination({
      initialLimit: 10,
    })

  const fetchSales = useCallback(async () => {
    const { sales, pagination } = await getSales(page, limit)
    setSales(sales)
    setTotalPages(pagination.last)
  }, [page, limit, setSales, setTotalPages])

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
      createPath="/sales-add"
      onRefresh={fetchSales}
    >
      {sales.map((sale: Sale, index: number) => (
        <SaleItem key={index} sale={sale} onDelete={fetchSales} />
      ))}
    </ListLayout>
  )
}
