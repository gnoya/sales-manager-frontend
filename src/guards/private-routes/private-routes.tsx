import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth.hook'

/*
  This should be used with react-router v6 Route to
  routes that need authorization. If the user is not 
  authorized, we send it to the login page.
*/
export default function PrivateRoutes() {
  const { signedIn } = useAuth()

  return signedIn ? <Outlet /> : <Navigate to="/login" />
}
