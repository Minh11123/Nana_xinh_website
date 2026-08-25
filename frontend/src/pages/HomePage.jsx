import { useEffect, useState } from 'react'
import { CategorySection } from '../components/CategorySection.jsx'
import { Hero } from '../components/Hero.jsx'
import { ProductList } from '../components/ProductList.jsx'
import { categoryApi, productApi } from '../api/products.js'

export function HomePage() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    Promise.all([categoryApi.list(), productApi.list({ featured: true })]).then(
      ([nextCategories, nextProducts]) => {
        setCategories(nextCategories)
        setProducts(nextProducts.filter((product) => product.featured).slice(0, 4))
      },
    )
  }, [])

  return (
    <>
      <Hero />
      <CategorySection categories={categories} />
      <ProductList products={products} />
    </>
  )
}
