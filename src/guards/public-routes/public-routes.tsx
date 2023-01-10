import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth.hook'

/*
  This should be used with react-router v6 Route to
  routes that don't need authorization. If the user is
  authorized, we send it user to the dashboard page.
*/
export default function PublicRoutes() {
  const { signedIn } = useAuth()

  return signedIn ? <Navigate to="/dashboard" /> : <Outlet />
}
