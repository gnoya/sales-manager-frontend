import { mockPagination, mockProducts } from '../mock-data/mock-data'
import { Pagination } from '../models/pagination.model'
import { Product, transformProductArray } from '../models/product.model'
import { privateHTTP } from './http.service'

export async function createProduct(
  name: string,
  quantity: number
): Promise<void> {
  return

  await privateHTTP.post('/product.service/products', { name, quantity })
}

export async function deleteProduct(id: string): Promise<void> {
  console.log(`Deleting product ${id}`)
  return

  await privateHTTP.delete(`/product.service/products/${id}`)
}

export async function updateProduct(
  id: string,
  name?: string,
  quantity?: number
): Promise<void> {
  return

  await privateHTTP.put(`/product.service/products/${id}`, { name, quantity })
}

export async function getProducts(
  page: number,
  limit: number
): Promise<{
  products: Product[]
  pagination: Pagination
}> {
  console.log(`Getting page ${page} and limit ${limit}`)
  // const response = await privateHTTP.get('/product.service/products')
  const response = { data: mockProducts }
  const pagination = mockPagination

  return { products: transformProductArray(response.data), pagination }
}
