import * as Yup from 'yup'

export interface User {
  id: string
  fullName: string
  identification: string
  phone: string
  address: string
  email?: string
  token?: string
}

export function transformUser(data: any): User {
  const { id, fullName, identification, phone, address, email, token } = data

  return { id, fullName, identification, phone, address, email, token }
}

export function transformUserArray(data: any): User[] {
  return data.map((item: any) => transformUser(item))
}

export const userFormValidation = Yup.object({
  fullName: Yup.string().required(),
  identification: Yup.string().required(),
  phone: Yup.string().required(),
  address: Yup.string().required(),
})
