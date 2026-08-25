import { Home, LayoutDashboard, ShoppingBag, Store, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'
import { useCart } from '../context/cartContext.js'

export function MobileBottomNav() {
  const { totalItems } = useCart()
  const { role } = useAuth()

  return (
    <nav className="mobile-bottom-nav" aria-label="Điều hướng mobile">
      <NavLink to="/">
        <Home size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/products">
        <Store size={20} />
        <span>Shop</span>
      </NavLink>
      <NavLink to="/cart">
        <ShoppingBag size={20} />
        <span>Giỏ ({totalItems})</span>
      </NavLink>
      {role === 'ADMIN' ? (
        <NavLink to="/admin">
          <LayoutDashboard size={20} />
          <span>Admin</span>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <UserRound size={20} />
          <span>Login</span>
        </NavLink>
      )}
    </nav>
  )
}
