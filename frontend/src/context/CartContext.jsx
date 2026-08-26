import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cartContext.js'

const STORAGE_KEY = 'nana-xinh-cart'

function readStoredCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product, quantity = 1) {
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.product.id === product.id)

      if (!existing) {
        return [...currentItems, { product, quantity }]
      }

      return currentItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    })
  }

  function updateQuantity(productId, quantity) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function removeItem(productId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }

  function clearCart() {
    setItems([])
  }

  const value = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.product.salePrice || item.product.price
      return sum + price * item.quantity
    }, 0)
    const shippingFee = subtotal >= 500000 || subtotal === 0 ? 0 : 30000

    return {
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
