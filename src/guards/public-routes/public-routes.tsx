import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth'

export default function PublicRoutes() {
  // const { signedIn } = useAuth()
  const signedIn = true

  return signedIn ? <Navigate to="/dashboard" /> : <Outlet />
}
