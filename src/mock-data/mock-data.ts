import { Product } from '../models/product'
import { Sale } from '../models/sale'
import { User } from '../models/user'

const userIdOne = '9735a8ed-7584-4ace-859b-80eb9612890b'
const userIdTwo = '2524ecb5-9405-4da6-9b28-b9efdabf083c'

const productIdOne = 'b9032df9-eec5-45df-bcbd-fba879ca17b4'
const productIdTwo = 'e721ecdf-5d67-45f1-bc78-6b5af8e687ff'

const saleIdOne = '460e7611-d14b-410c-a9cb-72442a029800'
const saleIdTwo = 'bd159f61-e322-4466-916e-9221741cc648'
const saleIdThree = '70400f74-1629-4b54-83c1-c6a09d5a5a32'

export const mockSales: Sale[] = [
  {
    id: saleIdOne,
    productId: productIdOne,
    userId: userIdOne,
    quantity: 1,
    deliveryDate: '2023-01-01 18:00:00',
  },
  {
    id: saleIdTwo,
    productId: productIdOne,
    userId: userIdOne,
    quantity: 3,
    deliveryDate: '2023-01-01 20:00:00',
  },
  {
    id: saleIdThree,
    productId: productIdTwo,
    userId: userIdTwo,
    quantity: 2,
    deliveryDate: '2023-01-01 20:00:00',
  },
]

export const mockProducts: Product[] = [
  {
    id: productIdOne,
    name: 'iPhone 14',
    quantity: 5,
  },
  {
    id: productIdTwo,
    name: 'Google Pixel 5',
    quantity: 3,
  },
]

export const mockUser: User = {
  id: userIdOne,
  fullName: 'Gabriel Noya',
  identification: '123456789',
  phone: '+58 00000000',
  email: 'gabrielnoya95@gmail.com',
  address: 'Venezuela, Caracas, XXXX, YYYY',
  token: 'DemoTokenFake',
}

export const mockSale: Sale = {
  ...mockSales[0],
  user: mockUser,
  product: mockProducts[0],
}