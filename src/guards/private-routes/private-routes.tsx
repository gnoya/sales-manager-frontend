import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth/use-auth.hook'

export default function PrivateRoutes() {
  // const { signedIn } = useAuth()
  const signedIn = true

  return signedIn ? <Outlet /> : <Navigate to="/login" />
}
