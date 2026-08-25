import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductList } from '../components/ProductList.jsx'
import { categoryApi, productApi } from '../api/products.js'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const activeFilterRef = useRef(null)
  const currentCategory = searchParams.get('category') || 'all'

  useEffect(() => {
    Promise.all([categoryApi.list(), productApi.list()]).then(([nextCategories, nextProducts]) => {
      setCategories(nextCategories)
      setProducts(nextProducts)
    })
  }, [])

  const filteredProducts = useMemo(() => {
    if (currentCategory === 'all') {
      return products
    }

    const category = categories.find((item) => item.slug === currentCategory)
    return products.filter((product) => product.categoryId === category?.id)
  }, [categories, currentCategory, products])

  useEffect(() => {
    activeFilterRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'center',
    })
  }, [categories, currentCategory])

  return (
    <div className="page-container page-stack products-page">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Nana Xinh shop</p>
          <h1>Tất cả sản phẩm</h1>
        </div>
        <button className="secondary-button compact" type="button">
          <SlidersHorizontal size={18} /> Bộ lọc
        </button>
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
