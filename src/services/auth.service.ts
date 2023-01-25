import { transformUser, User } from '../models/user.model'
import { publicHTTP } from './http.service'

export interface SignInParams {
  email: string
  password: string
}

/*
  Requests the server with en email and passwords to sign in.
  The request should return the User and a JWT token that
  we will store in localStorage
*/
export async function signIn(params: SignInParams) {
  const response = await publicHTTP.post('/auth/login', params)

  const user = transformUser(response.data.data)
  saveUser(user)
  saveToken(response.data.data.token ?? '')

  return user
}

/*
  Clears the localStorage when signing out
*/
export const signOut = () => localStorage.clear()

/*
  Returns the tokens stored in the localStorage
*/
export const getToken = () => localStorage.getItem('token')

/*
  Returns the User store in the localStorage
*/
export function getUserFromStorage(): User | null {
  const user = localStorage.getItem('userData')

  return user ? JSON.parse(user) : null
}

/*
  Stores the User in the localStorage
*/
export function saveUser(data: User) {
  const stringifiedUser = JSON.stringify(data)
  localStorage.setItem('userData', stringifiedUser)
}

/*
  Stores the JWT token in the localStorage
*/
const saveToken = (token: string) => localStorage.setItem('token', token)
