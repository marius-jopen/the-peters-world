import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartStore, CartItem, Product } from '@/types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                slug: product.slug,
                title: product.title,
                priceCents: product.priceCents,
                image: product.image,
                quantity,
              },
            ],
          })
        }
      },
      
      removeItem: (id: string) => {
        const { items } = get()
        set({ items: items.filter(item => item.id !== id) })
      },
      
      updateQuantity: (id: string, quantity: number) => {
        const { items } = get()
        if (quantity <= 0) {
          set({ items: items.filter(item => item.id !== id) })
        } else {
          set({
            items: items.map(item =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        }
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.priceCents * item.quantity), 0)
      },
      
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'peters-world-cart',
    }
  )
)
