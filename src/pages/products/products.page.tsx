import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Pagination from '../../components/pagination/pagination.component'
import ProductItem from '../../components/product-item/product-item.component'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { Product } from '../../models/product.model'
import { getProducts } from '../../services/product.service'

export default function ProductsPage() {
  const { pathname } = useLocation()
  const { startLoading, stopLoading } = useLoading()
  const handleError = useErrorHandler()
  const [products, setProducts] = useState<Product[]>([])
  const { page, limit, totalPages, setTotalPages, prevPage, nextPage } =
    usePagination({
      initialLimit: 10,
    })

  const fetchProducts = useCallback(async () => {
    startLoading()

    try {
      const { products, pagination } = await getProducts(page, limit)
      setProducts(products)
      setTotalPages(pagination.last)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [page, limit, setProducts, setTotalPages])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

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
      title="Products"
      createPath={`${pathname}../products-add`}
      onRefresh={fetchProducts}
    >
      {products.map((product: Product, index: number) => (
        <ProductItem key={index} product={product} onDelete={fetchProducts} />
      ))}
    </ListLayout>
  )
}
