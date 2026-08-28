import { useMemo, useState } from 'react'
import { categories, products as defaultProducts } from '../data/catalog.js'
import { toDisplayImageUrl, toDisplayImageUrls } from '../utils/driveImage.js'
import { CatalogContext } from './catalogContext.js'

const PRODUCT_STORAGE_KEY = 'nana-xinh-custom-products'
const AD_STORAGE_KEY = 'nana-xinh-ad-banners'

function readStoredItems(storageKey) {
  try {
    const storedItems = JSON.parse(localStorage.getItem(storageKey))
    return Array.isArray(storedItems) ? storedItems : []
  } catch {
    return []
  }
}

function createSlug(name, products) {
  const baseSlug = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'mau-hoa'

  let slug = baseSlug
  let suffix = 2

  while (products.some((product) => product.slug === slug)) {
    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }

  return slug
}

export function CatalogProvider({ children }) {
  const [customProducts, setCustomProducts] = useState(() => readStoredItems(PRODUCT_STORAGE_KEY))
  const [advertisements, setAdvertisements] = useState(() => readStoredItems(AD_STORAGE_KEY))
  const products = useMemo(
    () => [...defaultProducts, ...customProducts],
    [customProducts],
  )

  function saveCustomProducts(nextProducts) {
    setCustomProducts(nextProducts)
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(nextProducts))
  }

  function saveAdvertisements(nextAdvertisements) {
    setAdvertisements(nextAdvertisements)
    localStorage.setItem(AD_STORAGE_KEY, JSON.stringify(nextAdvertisements))
  }

  function addProduct(input) {
    const createdAt = Date.now()
    const product = {
      id: createdAt,
      categoryId: Number(input.categoryId),
      name: input.name.trim(),
      slug: createSlug(input.name, products),
      sku: `NX-FE-${String(createdAt).slice(-6)}`,
      price: Number(input.price),
      salePrice: input.salePrice ? Number(input.salePrice) : null,
      imageUrl: toDisplayImageUrl(input.imageUrl.trim()),
      description: input.description.trim(),
      featured: Boolean(input.featured),
      custom: true,
    }

    saveCustomProducts([...customProducts, product])
    return product
  }

  function removeProduct(productId) {
    saveCustomProducts(customProducts.filter((product) => product.id !== productId))
  }

  function addAdvertisement(input) {
    const createdAt = Date.now()
    const imageUrls = toDisplayImageUrls(input.imageUrl)
    if (imageUrls.length === 0) {
      return []
    }

    const nextAdvertisements = imageUrls.map((imageUrl, index) => ({
      id: `${createdAt}-${index}`,
      title: input.title.trim(),
      imageUrl,
      linkUrl: input.linkUrl.trim(),
    }))

    saveAdvertisements([...advertisements, ...nextAdvertisements])
    return nextAdvertisements
  }

  function removeAdvertisement(advertisementId) {
    saveAdvertisements(advertisements.filter((advertisement) => advertisement.id !== advertisementId))
  }

  const value = {
    addAdvertisement,
    addProduct,
    advertisements,
    categories,
    customProducts,
    products,
    removeAdvertisement,
    removeProduct,
  }

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}
