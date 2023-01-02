import { useCallback, useEffect, useState } from 'react'
import Pagination from '../../components/pagination/pagination.component'
import ProductItem from '../../components/product-item/product-item.component'
import Title from '../../components/title/title.component'
import { usePagination } from '../../hooks/use-pagination/use-pagination.hook'
import ListLayout from '../../layouts/list/list.layout'
import { Product } from '../../models/product.model'
import { getProducts } from '../../services/product.service'
import styles from './products.page.module.css'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const { page, limit, totalPages, setTotalPages, prevPage, nextPage } =
    usePagination({
      initialLimit: 10,
    })

  const fetchProducts = useCallback(async () => {
    const { products, pagination } = await getProducts(page, limit)
    setProducts(products)
    setTotalPages(pagination.last)
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
      createPath="/products-add"
      onRefresh={fetchProducts}
    >
      {products.map((product: Product, index: number) => (
        <ProductItem key={index} product={product} onDelete={fetchProducts} />
      ))}
    </ListLayout>
  )
}
