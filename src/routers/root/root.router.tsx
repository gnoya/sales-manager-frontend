import { Routes, Route } from 'react-router'
import PrivateRoutes from '../../guards/private-routes/private-routes'
import PublicRoutes from '../../guards/public-routes/public-routes'
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
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products-add" element={<ProductsAddPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/sales-add" element={<SalesAddPage />} />
      </Route>

      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
      </Route>
    </Routes>
  )
}
