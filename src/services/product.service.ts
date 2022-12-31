import { Product, transformProductArray } from '../models/product'
import { privateHTTP } from './http.service'

export async function createProduct(
  name: string,
  quantity: number
): Promise<void> {
  await privateHTTP.post('/product.service/products', { name, quantity })
}

export async function updateProduct(
  id: string,
  name?: string,
  quantity?: number
): Promise<void> {
  await privateHTTP.put(`/product.service/products/${id}`, { name, quantity })
}

export async function getProducts(): Promise<Product[]> {
  const products = await privateHTTP.get('/product.service/products')

  return transformProductArray(products)
}
