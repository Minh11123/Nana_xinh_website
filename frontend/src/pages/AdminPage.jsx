import {
  ClipboardList,
  Flower2,
  LogOut,
  Package,
  ShieldCheck,
  Tags,
  TrendingUp,
} from 'lucide-react'
import { categories, orders, products } from '../data/mockData.js'
import { useAuth } from '../context/authContext.js'
import { formatCurrency } from '../utils/currency.js'

export function AdminPage() {
  const { logout, user } = useAuth()
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)
  const lowStockProducts = products.filter((product) => product.stockQuantity <= 10)

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="brand-mark">N</span>
          <div>
            <strong>Nana Xinh</strong>
            <small>Admin Console</small>
          </div>
        </div>
        <nav aria-label="Admin">
          <a className="active" href="#overview">Tổng quan</a>
          <a href="#orders">Đơn hàng</a>
          <a href="#products">Sản phẩm</a>
          <a href="#categories">Danh mục</a>
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="eyebrow">Dashboard quản trị</p>
            <h1>Điều hành Tiệm hoa Nana Xinh</h1>
          </div>
          <div className="admin-user">
            <span><ShieldCheck size={16} /> {user?.role}</span>
            <strong>{user?.name}</strong>
            <button type="button" onClick={logout} aria-label="Đăng xuất">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <section className="admin-stat-grid" id="overview">
          <article>
            <Package size={22} />
            <span>Sản phẩm</span>
            <strong>{products.length}</strong>
          </article>
          <article>
            <Tags size={22} />
            <span>Danh mục</span>
            <strong>{categories.length}</strong>
          </article>
          <article>
            <ClipboardList size={22} />
            <span>Đơn hàng</span>
            <strong>{orders.length}</strong>
          </article>
          <article>
            <TrendingUp size={22} />
            <span>Doanh thu mẫu</span>
            <strong>{formatCurrency(revenue)}</strong>
          </article>
        </section>

        <section className="admin-content-grid">
          <article className="admin-panel" id="orders">
            <div className="admin-panel-heading">
              <div>
                <p className="eyebrow">Đơn hàng</p>
                <h2>Đơn gần đây</h2>
              </div>
              <button className="primary-button compact" type="button">Xuất file</button>
            </div>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Khách hàng</th>
                    <th>Điện thoại</th>
                    <th>Tổng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.phone}</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td><span className="status-pill">{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="admin-panel compact-panel">
            <div className="admin-panel-heading">
              <div>
                <p className="eyebrow">Tồn kho</p>
                <h2>Cần chú ý</h2>
              </div>
              <Flower2 size={22} />
            </div>
            <div className="stock-list">
              {lowStockProducts.map((product) => (
                <div key={product.id}>
                  <span>{product.name}</span>
                  <strong>{product.stockQuantity} mẫu</strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="admin-panel" id="products">
          <div className="admin-panel-heading">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2>Sản phẩm mock</h2>
            </div>
            <button className="primary-button compact" type="button">Thêm sản phẩm</button>
          </div>
          <div className="responsive-table">
            <table>
              <thead>
                <tr>
                  <th>Mã</th>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Tồn</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>{formatCurrency(product.salePrice || product.price)}</td>
                    <td>{product.stockQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  )
}
