import { mockPagination, mockUser, mockUsers } from '../mock-data/mock-data'
import { Pagination } from '../models/pagination.model'
import { User, transformUser, transformUserArray } from '../models/user.model'
import { privateHTTP } from './http.service'

export async function createUser(
  fullName: string,
  identification: string,
  phone: string,
  address: string
): Promise<void> {
  return

  await privateHTTP.post('/user.service/users', {
    fullName,
    identification,
    phone,
    address,
  })
}

export async function deleteUser(id: string): Promise<void> {
  console.log(`Deleting user ${id}`)
  return

  await privateHTTP.delete(`/user.service/users/${id}`)
}

export async function getUsers(
  page: number,
  limit: number
): Promise<{ users: User[]; pagination: Pagination }> {
  console.log(`Getting page ${page} and limit ${limit}`)
  // const response = await privateHTTP.get('/user.service/users')
  const response = { data: mockUsers }
  const pagination = mockPagination

  return { users: transformUserArray(response.data), pagination }
}

export async function getUser(id: string): Promise<User> {
  // const response = await privateHTTP.get(`/user.service/users/${id}`)
  const response = { data: mockUser }

  return transformUser(response)
}

export async function getUsersByName(fullName: string): Promise<User[]> {
  console.log(`Getting by name ${fullName}`)
  // const response = await privateHTTP.get('/user.service/users')
  const response = { data: mockUsers }

  return transformUserArray(response.data)
}
