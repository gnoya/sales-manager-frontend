import { useAuth } from '../use-auth/use-auth.hook'
import { signOut } from '../../services/auth.service'

export function useLogout() {
  const { setUser, setSignedIn } = useAuth()

  function logout() {
    signOut()
    setUser(null)
    setSignedIn(false)
  }

  return logout
}
