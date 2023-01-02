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
