import { Flower2, MapPin, Phone, Share2 } from 'lucide-react'
import { store } from '../data/store.js'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-grid">
        <div>
          <p className="footer-brand">Nana Xinh</p>
          <p>Hoa tươi được bó theo ngày, tư vấn tone màu và ngân sách trước khi giao.</p>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <p><Phone size={16} /> {store.phoneDisplay}</p>
          <p><MapPin size={16} /> {store.location}</p>
        </div>
        <div>
          <h3>Theo dõi</h3>
          <p><Share2 size={16} /> Tiệm hoa Nana Xinh</p>
          <p><Flower2 size={16} /> {store.socialHandle}</p>
        </div>
      </div>
    </footer>
  )
}
