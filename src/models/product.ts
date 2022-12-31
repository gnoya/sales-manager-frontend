export interface Product {
  id: string
  name: string
  quantity: number
}

export function transformProduct(data: any): Product {
  return {} as Product
}

export function transformProductArray(data: any): Product[] {
  return data.map((item: any) => transformProduct(item))
}
