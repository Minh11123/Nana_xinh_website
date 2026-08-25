import { LogOut, Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'
import { useCart } from '../context/cartContext.js'

const navItems = [
  { to: '/', label: 'Trang chủ' },
  { to: '/products', label: 'Sản phẩm' },
  { to: '/checkout', label: 'Đặt hoa' },
]

export function Header() {
  const { totalItems } = useCart()
  const { isAuthenticated, logout, role } = useAuth()

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
        {role === 'ADMIN' ? <NavLink to="/admin">Admin</NavLink> : null}
      </nav>

      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Tìm kiếm">
          <Search size={19} />
        </button>
        <Link className="cart-button" to="/cart" aria-label="Giỏ hàng">
          <ShoppingBag size={19} />
          <span>{totalItems}</span>
        </Link>
        {isAuthenticated ? (
          <button className="icon-button" type="button" aria-label="Đăng xuất" onClick={logout}>
            <LogOut size={19} />
          </button>
        ) : (
          <Link className="icon-button" to="/login" aria-label="Đăng nhập">
            <UserRound size={19} />
          </Link>
        )}
        <button className="icon-button mobile-menu-button" type="button" aria-label="Mở menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  )
}
