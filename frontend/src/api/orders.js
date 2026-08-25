import { request } from './client.js'

export const orderApi = {
  async create(payload) {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
