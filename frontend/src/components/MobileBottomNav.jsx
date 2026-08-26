import { Home, MessageCircle, ShoppingBag, Store } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/cartContext.js'
import { store } from '../data/store.js'

export function MobileBottomNav() {
  const { totalItems } = useCart()
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
      <a href={store.zaloUrl} target="_blank" rel="noreferrer">
        <MessageCircle size={20} />
        <span>Zalo</span>
      </a>
    </nav>
  )
}
