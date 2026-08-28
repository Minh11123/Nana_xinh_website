import { MessageCircle, ShoppingBag } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/cartContext.js'
import { store } from '../data/store.js'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/products', label: 'Sản phẩm' },
  { to: '/cart', label: 'Giỏ hoa' },
]

export function Header() {
  const { totalItems } = useCart()

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Nana Xinh">
        <span className="brand-mark">N</span>
        <span>
          <strong>Nana Xinh</strong>
          <small>Tiệm hoa tươi</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Điều hướng chính">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <a className="icon-button" href={store.zaloUrl} target="_blank" rel="noreferrer" aria-label="Liên hệ Zalo">
          <MessageCircle size={19} />
        </a>
        <Link className="cart-button" to="/cart" aria-label="Giỏ hàng">
          <ShoppingBag size={19} />
          <span>{totalItems}</span>
        </Link>
      </div>
    </header>
  )
}
