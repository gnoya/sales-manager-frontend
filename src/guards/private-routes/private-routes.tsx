import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth.hook'

export default function PrivateRoutes() {
  const { signedIn } = useAuth()

  return signedIn ? <Outlet /> : <Navigate to="/login" />
}
