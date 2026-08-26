import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductList } from '../components/ProductList.jsx'
import { useCatalog } from '../context/catalogContext.js'

export function ProductsPage() {
  const { categories, products } = useCatalog()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilterRef = useRef(null)
  const currentCategory = searchParams.get('category') || 'all'

  const filteredProducts = (() => {
    if (currentCategory === 'all') {
      return products
    }

    const category = categories.find((item) => item.slug === currentCategory)
    return products.filter((product) => product.categoryId === category?.id)
  })()

  useEffect(() => {
    activeFilterRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'center',
    })
  }, [currentCategory])

  return (
    <div className="page-container page-stack products-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Nana Xinh shop</p>
          <h1>Tất cả sản phẩm</h1>
        </div>
      </div>

      <div className="filter-pills" aria-label="Lọc theo danh mục">
        <button
          className={currentCategory === 'all' ? 'active' : ''}
          ref={currentCategory === 'all' ? activeFilterRef : null}
          type="button"
          onClick={() => setSearchParams({})}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            className={currentCategory === category.slug ? 'active' : ''}
            key={category.id}
            ref={currentCategory === category.slug ? activeFilterRef : null}
            type="button"
            onClick={() => setSearchParams({ category: category.slug })}
          >
            {category.name}
          </button>
        ))}
      </div>

      <ProductList
        eyebrow="Danh sách hoa"
        title={`${filteredProducts.length} mẫu đang có`}
        products={filteredProducts}
      />
    </div>
  )
}
