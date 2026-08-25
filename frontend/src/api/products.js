import { request } from './client.js'
import { categories, products } from '../data/mockData.js'

export const productApi = {
  async list(params = {}) {
    try {
      const search = new URLSearchParams(params).toString()
      return await request(`/products${search ? `?${search}` : ''}`)
    } catch {
      return products
    }
  },

  async getBySlug(slug) {
    try {
      return await request(`/products/${slug}`)
    } catch {
      return products.find((product) => product.slug === slug)
    }
  },
}

export const categoryApi = {
  async list() {
    try {
      return await request('/categories')
    } catch {
      return categories
    }
  },
}
