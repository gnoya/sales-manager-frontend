import { useContext } from 'react'
import { authContext } from '../../contexts/auth-provider/auth-provider'

export function useAuth() {
  return useContext(authContext)
}
