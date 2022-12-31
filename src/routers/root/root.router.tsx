import { Routes, Route } from 'react-router'
import PrivateRoutes from '../../guards/private-routes/private-routes'
import PublicRoutes from '../../guards/public-routes/public-routes'
import DashboardLayout from '../../layouts/dashboard/dashboard.layout'
import LoginPage from '../../pages/login/login.page'
import NotFoundPage from '../../pages/not-found/not-found.page'
import ProductsAddPage from '../../pages/products-add/products-add.page'
import ProductsPage from '../../pages/products/products.page'
import SalePage from '../../pages/sale/sale.page'
import SalesAddPage from '../../pages/sales-add/sales-add.page'
import SalesPage from '../../pages/sales/sales.page'

/*
  Normally I would split these routes in multiple files,
  but since there are so few routes, it's simpler in one file.
*/
export default function RootRouter() {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route element={<PrivateRoutes />}>
        <Route
          path="/products"
          element={
            <DashboardLayout pageTitle="Products">
              <ProductsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/products-add"
          element={
            <DashboardLayout pageTitle="Add Product">
              <ProductsAddPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/sale"
          element={
            <DashboardLayout pageTitle="Sale Details">
              <SalePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/sales"
          element={
            <DashboardLayout pageTitle="Sales">
              <SalesPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/sales-add"
          element={
            <DashboardLayout pageTitle="Add Sale">
              <SalesAddPage />
            </DashboardLayout>
          }
        />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}
