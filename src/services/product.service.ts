import { Pagination } from '../models/pagination.model'
import {
  Product,
  transformProduct,
  transformProductArray,
} from '../models/product.model'
import { privateHTTP } from './http.service'

export async function createProduct(
  name: string,
  quantity: number,
  price?: number,
  profit?: number
): Promise<void> {
  await privateHTTP.post('/products', { name, quantity, price, profit })
}

export async function deleteProduct(id: string): Promise<void> {
  await privateHTTP.delete(`/products/${id}`)
}

export async function updateProduct(
  id: string,
  name?: string,
  quantity?: number
): Promise<void> {
  await privateHTTP.put(`/products/${id}`, { name, quantity })
}

export async function getProducts(
  page: number,
  limit: number
): Promise<{
  products: Product[]
  pagination: Pagination
}> {
  const response = await privateHTTP.get('/products', {
    params: { page, limit },
  })
  const pagination: Pagination = response.data.links

  return { products: transformProductArray(response.data.data), pagination }
}

export async function batchProducts(ids: string[]): Promise<Product[]> {
  const response = await privateHTTP.get('/products/batch', { params: { ids } })

  return transformProductArray(response.data.data)
}

export async function getProductsByName(name: string): Promise<Product[]> {
  const response = await privateHTTP.get('/products', {
    params: { page: 1, limit: 100, name },
  })

  return transformProductArray(response.data.data)
}

export async function getProduct(id: string): Promise<Product> {
  const response = await privateHTTP.get(`/products/${id}`)

  return transformProduct(response.data.data)
}
