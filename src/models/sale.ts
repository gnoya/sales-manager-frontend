import { Product } from './product'
import { User } from './user'

export interface Sale {
  id: string
  productId: string
  userId: string
  quantity: number
  deliveryDate: string
  user?: User
  product?: Product
}

export function transformSale(data: any): Sale {
  return {} as Sale
}

export function transformSaleArray(data: any): Sale[] {
  return data.map((item: any) => transformSale(item))
}
