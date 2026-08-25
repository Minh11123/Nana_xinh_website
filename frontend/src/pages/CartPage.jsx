import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext.js'
import { formatCurrency } from '../utils/currency.js'

export function CartPage() {
  const { items, subtotal, shippingFee, total, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="page-container page-stack empty-state">
        <h1>Giỏ hàng đang trống</h1>
        <p>Chọn một bó hoa xinh rồi quay lại đây để đặt giao nhé.</p>
        <Link className="primary-button" to="/products">Xem sản phẩm</Link>
      </div>
    )
  }

  return (
    <div className="page-container page-stack">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Giỏ hàng</p>
          <h1>Hoa đã chọn</h1>
        </div>
      </div>

      <section className="cart-layout">
        <div className="cart-items">
          {items.map(({ product, quantity }) => {
            const price = product.salePrice || product.price
            return (
              <article className="cart-item" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <div>
                  <h3>{product.name}</h3>
                  <p>{formatCurrency(price)}</p>
                  <div className="cart-quantity">
                    <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)}><Minus size={16} /></button>
                    <input
                      min="1"
                      type="number"
                      value={quantity}
                      onChange={(event) => updateQuantity(product.id, event.target.value)}
                    />
                    <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus size={16} /></button>
                    <button type="button" onClick={() => removeItem(product.id)} aria-label="Xóa sản phẩm"><Trash2 size={16} /></button>
                  </div>
                </div>
                <strong>{formatCurrency(price * quantity)}</strong>
              </article>
            )
          })}
        </div>

        <aside className="order-summary">
          <h2>Tạm tính</h2>
          <p><span>Sản phẩm</span><strong>{formatCurrency(subtotal)}</strong></p>
          <p><span>Phí giao</span><strong>{shippingFee ? formatCurrency(shippingFee) : 'Miễn phí'}</strong></p>
          <p className="summary-total"><span>Tổng</span><strong>{formatCurrency(total)}</strong></p>
          <Link className="primary-button" to="/checkout">Đặt hàng</Link>
        </aside>
      </section>
    </div>
  )
}
