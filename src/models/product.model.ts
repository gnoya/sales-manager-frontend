import * as Yup from 'yup'

export interface Product {
  id: string
  name: string
  quantity: number
}

export function transformProduct(data: any): Product {
  const { id, name, quantity } = data

  return { id, name, quantity }
}

export function transformProductArray(data: any): Product[] {
  return data.map((item: any) => transformProduct(item))
}

export const productFormValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  quantity: Yup.number().min(0).required('Quantity is required'),
})
