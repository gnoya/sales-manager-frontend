export interface User {
  id: string
  fullName: string
  identification: string
  phone: string
  email?: string
  address?: string
  token?: string
}

export function transformUser(data: any): User {
  const { id, fullName, identification, phone, email, address, token } =
    data.data

  return { id, fullName, identification, phone, email, address, token }
}

export function transformUserArray(data: any): User[] {
  return data.map((item: any) => transformUser(item))
}
