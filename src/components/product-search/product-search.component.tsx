import { Product } from '../../models/product.model'
import { useErrorHandler } from '../../hooks/use-error-handler/use-error-handler.hook'
import styles from './product-search.component.module.css'
import SearchListLayout from '../../layouts/search-list/search-list.layout'
import InputContainer from '../input-container/input-container.component'
import Input from '../input/input.component'
import { useCallback, useEffect, useState } from 'react'
import { useLoading } from '../../hooks/use-loading/use-loading.hook'
import { getProductsByName } from '../../services/product.service'
import ProductItem from '../product-item/product-item.component'

interface ProductSearchProps {
  onSelect: (product: Product) => void
}

export default function ProductSearch({ onSelect }: ProductSearchProps) {
  const handleError = useErrorHandler()
  const { startLoading, stopLoading } = useLoading()
  const [products, setProducts] = useState<Product[]>([])
  const [input, setInput] = useState<string>('')

  const fetchProducts = useCallback(async () => {
    startLoading()

    try {
      const products = await getProductsByName(input)
      setProducts(products)
    } catch (err) {
      handleError(err)
    }

    stopLoading()
  }, [input, handleError, startLoading, stopLoading])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <SearchListLayout
          title="Select a product"
          searchBar={
            <div className={styles.searchBar}>
              <InputContainer>
                <Input
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search by name"
                />
              </InputContainer>
            </div>
          }
        >
          {products.map((product: Product, index: number) => (
            <ProductItem
              key={index}
              product={product}
              grayBackground={index % 2 === 0}
              hideActionButtons={true}
              onClick={() => onSelect(product)}
            />
          ))}
        </SearchListLayout>
      </div>
    </div>
  )
}
