export type ProductCategory = 'calendar' | 'postcards' | 'original'

export type Product = {
  id: string
  slug: string
  title: string
  priceCents: number
  currency: 'EUR'
  category: ProductCategory
  image: string
  description: string
  details?: string[]
  specs?: Record<string, string>
  shipping?: string
  stripePriceId?: string
  available: boolean
}

export type PeterItem = {
  id: string
  name: string
  image: string
}

export type CartItem = {
  id: string
  slug: string
  title: string
  priceCents: number
  image: string
  quantity: number
}

export type CartStore = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}
