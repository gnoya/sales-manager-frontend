import { Sale, transformSaleArray } from '../models/sale'
import { privateHTTP } from './http.service'

export async function createSale(
  productId: string,
  userId: string,
  quantity: number,
  deliveryDate: string
): Promise<void> {
  await privateHTTP.post('/sale.service/sales', {
    productId,
    userId,
    quantity,
    deliveryDate,
  })
}

export async function deleteSale(id: string): Promise<void> {
  await privateHTTP.delete(`/sale.service/sales/${id}`)
}

export async function getSales(): Promise<Sale[]> {
  const sales = await privateHTTP.get('/sale.service/sales')

  return transformSaleArray(sales)
}
