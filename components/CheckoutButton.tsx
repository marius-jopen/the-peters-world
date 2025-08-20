'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'

interface CheckoutButtonProps {
  onSuccess?: () => void
}

export function CheckoutButton({ onSuccess }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { items, clearCart } = useCartStore()

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const { sessionId } = await response.json()
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          console.error('Stripe error:', error)
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : 'Checkout'}
    </button>
  )
}
