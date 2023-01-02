import { Routes, Route, Navigate } from 'react-router'
import { lazy } from 'react'

import PublicRoutes from '../../guards/public-routes/public-routes'

const DashboardRouter = lazy(() => import('../dashboard/dashboard.router'))
const LoginPage = lazy(() => import('../../pages/login/login.page'))
const NotFoundPage = lazy(() => import('../../pages/not-found/not-found.page'))

export default function RootRouter() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login/" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard/*" element={<DashboardRouter />} />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
