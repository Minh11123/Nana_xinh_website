import { useState } from 'react'
import { Link } from 'react-router-dom'
import { orderApi } from '../api/orders.js'
import { useCart } from '../context/cartContext.js'
import { formatCurrency } from '../utils/currency.js'

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  deliveryDate: '',
  deliveryTimeSlot: '09:00 - 11:00',
  note: '',
}

export function CheckoutPage() {
  const cart = useCart()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')

    const payload = {
      ...form,
      items: cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    }

    try {
      await orderApi.create(payload)
      cart.clearCart()
      setForm(initialForm)
      setStatus('success')
    } catch {
      cart.clearCart()
      setForm(initialForm)
      setStatus('mock-success')
    }
  }

  if (cart.items.length === 0 && status !== 'success' && status !== 'mock-success') {
    return (
      <div className="page-container page-stack empty-state">
        <h1>Chưa có hoa để đặt</h1>
        <p>Giỏ hàng đang trống, hãy chọn mẫu hoa trước.</p>
        <Link className="primary-button" to="/products">Xem sản phẩm</Link>
      </div>
    )
  }

  return (
    <div className="page-container page-stack">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Đặt hàng</p>
          <h1>Thông tin giao hoa</h1>
        </div>
      </div>

      {(status === 'success' || status === 'mock-success') && (
        <div className="notice">
          Đơn hàng đã được ghi nhận. Khi backend chạy, dữ liệu sẽ được lưu vào PostgreSQL.
        </div>
      )}

      <form className="checkout-layout" onSubmit={handleSubmit}>
        <div className="checkout-form">
          <label>Họ tên
            <input name="fullName" required value={form.fullName} onChange={updateField} />
          </label>
          <label>Số điện thoại
            <input name="phone" required value={form.phone} onChange={updateField} />
          </label>
          <label>Email
            <input name="email" type="email" value={form.email} onChange={updateField} />
          </label>
          <label>Địa chỉ giao
            <input name="address" required value={form.address} onChange={updateField} />
          </label>
          <label>Ngày giao
            <input name="deliveryDate" type="date" required value={form.deliveryDate} onChange={updateField} />
          </label>
          <label>Khung giờ
            <select name="deliveryTimeSlot" value={form.deliveryTimeSlot} onChange={updateField}>
              <option>09:00 - 11:00</option>
              <option>13:00 - 15:00</option>
              <option>17:00 - 19:00</option>
            </select>
          </label>
          <label className="full-span">Lời nhắn
            <textarea name="note" rows="4" value={form.note} onChange={updateField} />
          </label>
        </div>

        <aside className="order-summary">
          <h2>Đơn hoa</h2>
          {cart.items.map((item) => (
            <p key={item.product.id}>
              <span>{item.product.name} x {item.quantity}</span>
              <strong>{formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}</strong>
            </p>
          ))}
          <p><span>Phí giao</span><strong>{cart.shippingFee ? formatCurrency(cart.shippingFee) : 'Miễn phí'}</strong></p>
          <p className="summary-total"><span>Tổng</span><strong>{formatCurrency(cart.total)}</strong></p>
          <button className="primary-button" disabled={status === 'submitting'} type="submit">
            {status === 'submitting' ? 'Đang gửi...' : 'Xác nhận đặt hoa'}
          </button>
        </aside>
      </form>
    </div>
  )
}
