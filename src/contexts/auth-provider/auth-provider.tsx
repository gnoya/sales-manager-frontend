import { createContext, ReactNode } from 'react'
import { User } from '../../models/user'
import { useAuthStates } from './use-auth-state'

class AuthContext {
  signedIn = false
  setSignedIn(value: boolean) {}
  user: User | null = null
  setUser(value: User | null) {}
}

export const authContext = createContext(new AuthContext())

interface AuthProviderProps {
  children?: ReactNode
}
export default function AuthProvider(props: AuthProviderProps) {
  const contextValue = useAuthStates()

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  )
}
