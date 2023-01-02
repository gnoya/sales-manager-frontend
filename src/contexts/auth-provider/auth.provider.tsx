import { createContext, ReactNode } from 'react'
import { User } from '../../models/user.model'
import { useAuthState } from './use-auth-state.hook'

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
  const contextValue = useAuthState()

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  )
}
