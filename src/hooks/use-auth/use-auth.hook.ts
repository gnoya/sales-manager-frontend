import { useContext } from 'react'
import { authContext } from '../../contexts/auth-provider/auth.provider'

/*
  Hook that uses the context given by the AuthProvider
*/
export function useAuth() {
  return useContext(authContext)
}
