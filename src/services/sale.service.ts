import { Pagination } from '../models/pagination.model'
import { Sale, transformSale, transformSaleArray } from '../models/sale.model'
import { privateHTTP } from './http.service'

export async function createSale(
  productId: string,
  userId: string,
  quantity: number,
  deliveryDate: string
): Promise<void> {
  await privateHTTP.post('/sales', {
    productId,
    userId,
    quantity,
    deliveryDate,
  })
}

export async function deleteSale(id: string): Promise<void> {
  await privateHTTP.delete(`/sales/${id}`)
}

export async function getSales(
  page: number,
  limit: number
): Promise<{ sales: Sale[]; pagination: Pagination }> {
  const response = await privateHTTP.get('/sales', { params: { page, limit } })
  const pagination: Pagination = response.data.links

  return { sales: transformSaleArray(response.data.data), pagination }
}

export async function getSale(id: string): Promise<Sale> {
  const response = await privateHTTP.get(`/sales/${id}`)

  return transformSale(response.data.data)
}
