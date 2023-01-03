import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth.hook'

export default function PublicRoutes() {
  const { signedIn } = useAuth()

  return signedIn ? <Navigate to="/dashboard" /> : <Outlet />
}
