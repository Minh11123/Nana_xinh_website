import { AdvertisingCarousel } from '../components/AdvertisingCarousel.jsx'
import { CategorySection } from '../components/CategorySection.jsx'
import { Hero } from '../components/Hero.jsx'
import { ProductList } from '../components/ProductList.jsx'
import { useCatalog } from '../context/catalogContext.js'

export function HomePage() {
  const { advertisements, categories, products } = useCatalog()

  return (
    <>
      <Hero />
      <AdvertisingCarousel advertisements={advertisements} />
      <CategorySection categories={categories} />
      <ProductList products={products.filter((product) => product.featured).slice(0, 4)} />
    </>
  )
}
