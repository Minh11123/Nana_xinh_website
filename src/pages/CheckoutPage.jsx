import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext.js'
import { store } from '../data/store.js'
import { formatCurrency } from '../utils/currency.js'

const initialForm = {
  fullName: '',
  phone: '',
  address: '',
  deliveryDate: '',
  deliveryTimeSlot: '09:00 - 11:00',
  note: '',
}

const FREE_CARD_WORDS = 30
const LONG_CARD_FEE = 10000

function countWords(value) {
  const trimmedValue = value.trim()
  return trimmedValue ? trimmedValue.split(/\s+/u).length : 0
}

export function CheckoutPage() {
  const cart = useCart()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const cardWordCount = countWords(form.note)
  const hasLongCardFee = cardWordCount > FREE_CARD_WORDS
  const cardFee = hasLongCardFee ? LONG_CARD_FEE : 0
  const orderTotal = cart.total + cardFee

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function buildOrderMessage() {
    const productLines = cart.items.map((item) => {
      const price = item.product.salePrice || item.product.price
      return `- ${item.product.name} x${item.quantity}: ${formatCurrency(price * item.quantity)}`
    })

    return [
      `ĐƠN HOA - ${store.name}`,
      ...productLines,
      `Phí giao dự kiến: ${cart.shippingFee ? formatCurrency(cart.shippingFee) : 'Miễn phí'}`,
      `Phí nội dung thiệp: ${cardFee ? formatCurrency(cardFee) : 'Miễn phí'}`,
      `Tổng dự kiến: ${formatCurrency(orderTotal)}`,
      '',
      `Khách hàng: ${form.fullName}`,
      `Số điện thoại: ${form.phone}`,
      `Địa chỉ: ${form.address}`,
      `Thời gian giao: ${form.deliveryDate}, ${form.deliveryTimeSlot}`,
      `Lời nhắn: ${form.note || 'Không có'}`,
    ].join('\n')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const message = buildOrderMessage()
    window.open(store.zaloUrl, '_blank', 'noopener,noreferrer')

    try {
      await navigator.clipboard.writeText(message)
      setStatus('copied')
    } catch {
      setStatus('copy-failed')
    }
  }

  if (cart.items.length === 0) {
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

      {status === 'copied' && (
        <div className="notice">
          Đã sao chép nội dung đơn. Hãy dán vào Zalo để tiệm xác nhận mẫu và phí giao.
        </div>
      )}
      {status === 'copy-failed' && (
        <div className="notice warning">
          Zalo đã được mở. Trình duyệt không cho tự sao chép, bạn hãy chụp màn hình đơn này để gửi tiệm.
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
          <label className={`full-span card-message-field${hasLongCardFee ? ' is-over-limit' : ''}`}>
            <span className="card-message-heading">
              <span>Nội dung thiệp (Nếu có)</span>
              <strong>{cardWordCount}/{FREE_CARD_WORDS} chữ</strong>
            </span>
            <textarea name="note" rows="4" value={form.note} onChange={updateField} />
            <small>
              {hasLongCardFee
                ? `Nội dung trên ${FREE_CARD_WORDS} chữ — phụ thu ${formatCurrency(LONG_CARD_FEE)}`
                : `Miễn phí tối đa ${FREE_CARD_WORDS} chữ.`}
            </small>
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
          {hasLongCardFee && (
            <p className="card-fee-row">
              <span>Phụ thu thiệp trên {FREE_CARD_WORDS} chữ</span>
              <strong>{formatCurrency(cardFee)}</strong>
            </p>
          )}
          <p className="summary-total"><span>Tổng</span><strong>{formatCurrency(orderTotal)}</strong></p>
          <button className="primary-button" type="submit">
            Sao chép đơn & mở Zalo
          </button>
          <small className="checkout-note">Website không lưu thông tin của bạn. Đơn chỉ được xác nhận sau khi tiệm phản hồi qua Zalo.</small>
        </aside>
      </form>
    </div>
  )
}
