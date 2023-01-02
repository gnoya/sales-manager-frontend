import { Routes, Route, Navigate, useLocation } from 'react-router'
import { lazy } from 'react'

import PrivateRoutes from '../../guards/private-routes/private-routes'
import DashboardLayout from '../../layouts/dashboard/dashboard.layout'
import UsersPage from '../../pages/users/users.page'
import UsersAddPage from '../../pages/users-add/users-add.page'
import ProductsEditPage from '../../pages/products-edit/products-edit.page'

const ProductsAddPage = lazy(
  () => import('../../pages/products-add/products-add.page')
)
const ProductsPage = lazy(() => import('../../pages/products/products.page'))
const SalePage = lazy(() => import('../../pages/sale/sale.page'))
const SalesAddPage = lazy(() => import('../../pages/sales-add/sales-add.page'))
const SalesPage = lazy(() => import('../../pages/sales/sales.page'))
const NotFoundPage = lazy(() => import('../../pages/not-found/not-found.page'))

export default function DashboardRouter() {
  const { pathname } = useLocation()

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<DashboardLayout pageTitle="Dashboard" />}>
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/products-add/" element={<ProductsAddPage />} />
          <Route path="/products-edit/" element={<ProductsEditPage />} />
          <Route path="/sale/:id/" element={<SalePage />} />
          <Route path="/sales-add/" element={<SalesAddPage />} />
          <Route path="/sales/" element={<SalesPage />} />
          <Route path="/users/" element={<UsersPage />} />
          <Route path="/users-add/" element={<UsersAddPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to={`${pathname}/sales/`} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
