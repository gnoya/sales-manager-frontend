import { mockPagination, mockSale, mockSales } from '../mock-data/mock-data'
import { Pagination } from '../models/pagination.model'
import { Sale, transformSale, transformSaleArray } from '../models/sale.model'
import { privateHTTP } from './http.service'

export async function createSale(
  productId: string,
  userId: string,
  quantity: number,
  deliveryDate: string
): Promise<void> {
  console.log(productId, userId, quantity, deliveryDate)
  return

  await privateHTTP.post('/sale.service/sales', {
    productId,
    userId,
    quantity,
    deliveryDate,
  })
}

export async function deleteSale(id: string): Promise<void> {
  console.log(`Deleting sale ${id}`)
  return

  await privateHTTP.delete(`/sale.service/sales/${id}`)
}

export async function getSales(
  page: number,
  limit: number
): Promise<{ sales: Sale[]; pagination: Pagination }> {
  console.log(`Getting page ${page} and limit ${limit}`)
  // const response = await privateHTTP.get('/sale.service/sales')
  const response = { data: mockSales }
  const pagination = mockPagination

  return { sales: transformSaleArray(response.data), pagination }
}

export async function getSale(id: string): Promise<Sale> {
  // const response = await privateHTTP.get(`/sale.service/sales/${id}`)
  const response = { data: mockSale }

  return transformSale(response)
}
