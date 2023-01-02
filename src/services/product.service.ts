import { mockProducts } from '../mock-data/mock-data'
import { Product, transformProductArray } from '../models/product.model'
import { privateHTTP } from './http.service'

export async function createProduct(
  name: string,
  quantity: number
): Promise<void> {
  return

  await privateHTTP.post('/product.service/products', { name, quantity })
}

export async function updateProduct(
  id: string,
  name?: string,
  quantity?: number
): Promise<void> {
  return

  await privateHTTP.put(`/product.service/products/${id}`, { name, quantity })
}

export async function getProducts(): Promise<Product[]> {
  // const response = await privateHTTP.get('/product.service/products')
  const response = { data: mockProducts }

  return transformProductArray(response.data)
}
