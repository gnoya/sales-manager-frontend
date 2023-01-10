import { useAuth } from '../use-auth/use-auth.hook'
import { signOut } from '../../services/auth.service'

/*
  This hook is used to logout the user from the website
*/
export function useLogout() {
  const { setUser, setSignedIn } = useAuth()

  function logout() {
    signOut()
    setUser(null)
    setSignedIn(false)
  }

  return logout
}
