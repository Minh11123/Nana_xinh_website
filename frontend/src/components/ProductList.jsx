import { ProductCard } from './ProductCard.jsx'

export function ProductList({ products, title = 'Mẫu hoa đang được yêu thích', eyebrow = 'Sản phẩm' }) {
  return (
    <section className="section page-container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
