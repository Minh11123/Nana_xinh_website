import { Link } from 'react-router-dom'

export function CategorySection({ categories }) {
  return (
    <section className="section page-container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Danh mục nổi bật</p>
          <h2>Chọn hoa theo dịp</h2>
        </div>
        <Link to="/products">Xem tất cả</Link>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <Link className="category-tile" key={category.id} to={`/products?category=${category.slug}`}>
            <img src={category.imageUrl} alt={category.name} />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
