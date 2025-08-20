'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  onSuccess?: () => void
  className?: string
}

export function AddToCartButton({ 
  product, 
  quantity = 1, 
  onSuccess,
  className = ''
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // Simulate a brief delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addItem(product, quantity)
    setIsAdding(false)
    
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding || !product.available}
      className={`btn-primary ${className} ${
        isAdding ? 'opacity-75 cursor-not-allowed' : ''
      } ${!product.available ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isAdding ? 'Adding...' : product.available ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}
