import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Pagination from '../../components/pagination/pagination.component'
import SaleItem from '../../components/sale-item/sale-item.component'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { Sale } from '../../models/sale.model'
import { batchProducts } from '../../services/product.service'
import { getSales } from '../../services/sale.service'
import { batchUsers } from '../../services/user.service'

export default function SalesPage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
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

      const users = await batchUsers(
        sales
          .map((sale) => sale.userId)
          .filter((item, i, ar) => ar.indexOf(item) === i)
      )
      const products = await batchProducts(
        sales
          .map((sale) => sale.productId)
          .filter((item, i, ar) => ar.indexOf(item) === i)
      )

      const salesWithRelationships = sales.map((sale) => {
        sale.product = products.find((product) => product.id === sale.productId)
        sale.user = users.find((user) => user.id === sale.userId)

        return sale
      })

      setSales(salesWithRelationships)
      setTotalPages(pagination.pages)
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
      createPath={`${pathname}../sales/add`}
      onRefresh={fetchSales}
    >
      {sales.map((sale: Sale, index: number) => (
        <SaleItem
          key={index}
          sale={sale}
          grayBackground={index % 2 === 0}
          onDelete={fetchSales}
          onClick={() => navigate(`${pathname}${sale.id}`)}
        />
      ))}
    </ListLayout>
  )
}
