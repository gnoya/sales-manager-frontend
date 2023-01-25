import { Pagination } from '../models/pagination.model'
import { User, transformUser, transformUserArray } from '../models/user.model'
import { privateHTTP } from './http.service'

export async function createUser(
  fullName: string,
  identification: string,
  phone: string,
  address: string
): Promise<void> {
  await privateHTTP.post('/users', {
    fullName,
    identification,
    phone,
    address,
  })
}

export async function deleteUser(id: string): Promise<void> {
  await privateHTTP.delete(`/users/${id}`)
}

export async function getUsers(
  page: number,
  limit: number
): Promise<{ users: User[]; pagination: Pagination }> {
  const response = await privateHTTP.get('/users', { params: { page, limit } })
  const pagination: Pagination = response.data.links

  return { users: transformUserArray(response.data.data), pagination }
}

export async function batchUsers(ids: string[]): Promise<User[]> {
  const response = await privateHTTP.get('/users/batch', { params: { ids } })

  return transformUserArray(response.data.data)
}

export async function getUser(id: string): Promise<User> {
  const response = await privateHTTP.get(`/users/${id}`)

  return transformUser(response.data.data)
}

export async function getUsersByName(fullName: string): Promise<User[]> {
  const response = await privateHTTP.get('/users', {
    params: { page: 1, limit: 100, fullName },
  })
  return transformUserArray(response.data.data)
}
