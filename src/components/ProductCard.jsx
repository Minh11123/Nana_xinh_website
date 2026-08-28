import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext.js'
import { formatCurrency } from '../utils/currency.js'

export function ProductCard({ product }) {
  const { addItem } = useCart()
  const finalPrice = product.salePrice || product.price

  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${product.slug}`}>
        <img src={product.imageUrl} alt={product.name} />
        {product.salePrice ? <span>Sale</span> : null}
      </Link>
      <div className="product-content">
        <Link to={`/products/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.description}</p>
        <div className="price-row">
          <div>
            <strong>{formatCurrency(finalPrice)}</strong>
            {product.salePrice ? <del>{formatCurrency(product.price)}</del> : null}
          </div>
        </div>
      </div>
      <button
        className="add-cart-button"
        type="button"
        onClick={() => addItem(product)}
        aria-label={`Thêm ${product.name} vào giỏ`}
      >
        <ShoppingBag size={18} />
      </button>
    </article>
  )
}
