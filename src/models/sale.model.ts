import { Product, transformProduct } from './product.model'
import { transformUser, User } from './user.model'
import * as Yup from 'yup'

export interface Sale {
  id: string
  productId: string
  userId: string
  quantity: number
  deliveryDate: string
  user?: User
  product?: Product
}

export interface SalesPaginated {
  sales: Sale[]
}

export function transformSale(data: any): Sale {
  const { id, productId, userId, quantity, deliveryDate, user, product } = data

  const transformedUser = user && transformUser(user)
  const transformedProduct = product && transformProduct(product)

  return {
    id,
    productId,
    userId,
    quantity,
    deliveryDate: new Date(deliveryDate).toLocaleString(),
    user: transformedUser,
    product: transformedProduct,
  }
}

export function transformSaleArray(data: any): Sale[] {
  return data.map((item: any) => transformSale(item))
}

export const saleFormValidation = Yup.object({
  quantity: Yup.number().min(0).required('Quantity is required'),
})
