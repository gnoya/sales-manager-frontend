import { mockSale, mockSales } from '../mock-data/mock-data'
import { Sale, transformSale, transformSaleArray } from '../models/sale'
import { privateHTTP } from './http.service'

export async function createSale(
  productId: string,
  userId: string,
  quantity: number,
  deliveryDate: string
): Promise<void> {
  return

  await privateHTTP.post('/sale.service/sales', {
    productId,
    userId,
    quantity,
    deliveryDate,
  })
}

export async function deleteSale(id: string): Promise<void> {
  return

  await privateHTTP.delete(`/sale.service/sales/${id}`)
}

export async function getSales(): Promise<Sale[]> {
  // const response = await privateHTTP.get('/sale.service/sales')
  const response = { data: mockSales }

  return transformSaleArray(response)
}

export async function getSale(id: string): Promise<Sale> {
  // const response = await privateHTTP.get(`/sale.service/sales/${id}`)
  const response = { data: mockSale }

  return transformSale(response)
}
