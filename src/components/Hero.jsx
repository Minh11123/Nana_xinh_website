import { ArrowRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { store } from '../data/store.js'

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-media" aria-hidden="true" />
      <div className="hero-content page-container">
        <p className="eyebrow">Giao hoa trong ngày tại khu vực Hà Nội</p>
        <h1>Tiệm hoa Nana Xinh</h1>
        <p>
          Hoa tươi tone xinh, bó gọn tay, hợp tốt nghiệp, sinh nhật, khai trương
          và những ngày cần gửi một lời thương thật đẹp.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/products">
            Xem mẫu hoa <ArrowRight size={18} />
          </Link>
          <a className="secondary-button" href={store.zaloUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> Zalo {store.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
