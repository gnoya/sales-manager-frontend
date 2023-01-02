import { mockUser } from '../mock-data/mock-data'
import { transformUser, User } from '../models/user.model'
import { publicHTTP } from './http.service'

export interface SignInParams {
  email: string
  password: string
}

export async function signIn(params: SignInParams) {
  // const response = await publicHTTP.post('/auth/login', params)
  const response = { data: mockUser }

  const user = transformUser(response.data)
  saveUser(user)
  saveToken(response.data.token ?? '')

  return user
}

export const signOut = () => localStorage.clear()

export const getToken = () => localStorage.getItem('token')

export function getUserFromStorage(): User | null {
  const user = localStorage.getItem('userData')

  return user ? JSON.parse(user) : null
}

export function saveUser(data: User) {
  const stringifiedUser = JSON.stringify(data)
  localStorage.setItem('userData', stringifiedUser)
}

const saveToken = (token: string) => localStorage.setItem('token', token)
