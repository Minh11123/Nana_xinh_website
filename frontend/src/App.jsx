import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { MobileBottomNav } from './components/MobileBottomNav.jsx'
import { RequireAdmin } from './components/RequireAdmin.jsx'
import { AdminPage } from './pages/AdminPage.jsx'
import { CartPage } from './pages/CartPage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { ProductDetailPage } from './pages/ProductDetailPage.jsx'
import { ProductsPage } from './pages/ProductsPage.jsx'
import './App.css'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="app-shell">
      {isAdminRoute ? null : <Header />}
      <main>
        <div className="route-transition" key={`${location.pathname}${location.search}`}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminPage />
                </RequireAdmin>
              }
            />
          </Routes>
        </div>
      </main>
      {isAdminRoute ? null : <Footer />}
      {isAdminRoute ? null : <MobileBottomNav />}
    </div>
  )
}

export default App
