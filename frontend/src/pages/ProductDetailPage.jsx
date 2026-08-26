import { ArrowLeft, Check, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cartContext.js'
import { useCatalog } from '../context/catalogContext.js'
import { formatCurrency } from '../utils/currency.js'

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { products } = useCatalog()
  const product = products.find((item) => item.slug === slug)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return <div className="page-container page-stack">Không tìm thấy sản phẩm.</div>
  }

  const finalPrice = product.salePrice || product.price

  function handleAddToCart() {
    addItem(product, quantity)
    navigate('/cart')
  }

  return (
    <div className="page-container page-stack">
      <Link className="back-link" to="/products">
        <ArrowLeft size={18} /> Quay lại sản phẩm
      </Link>

      <section className="product-detail">
        <div className="detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="detail-info">
          <p className="eyebrow">{product.sku}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="detail-price">
            <strong>{formatCurrency(finalPrice)}</strong>
            {product.salePrice ? <del>{formatCurrency(product.price)}</del> : null}
          </div>
          <div className="detail-checks">
            <span><Check size={17} /> Duyệt ảnh mẫu trước khi giao</span>
            <span><Check size={17} /> Freeship đơn từ 500.000đ</span>
            <span><Check size={17} /> Có thiệp nhắn miễn phí</span>
          </div>
          <label className="quantity-control">
            Số lượng
            <input
              min="1"
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>
          <button className="primary-button" type="button" onClick={handleAddToCart}>
            <ShoppingBag size={18} /> Thêm vào giỏ
          </button>
        </div>
      </section>
    </div>
  )
}
