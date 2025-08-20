'use client'

import { useEffect, useState } from 'react'
import { X, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/currency'
import { QuantitySelector } from './QuantitySelector'
import { CheckoutButton } from './CheckoutButton'

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  useEffect(() => {
    const handleOpenCart = () => setIsOpen(true)
    window.addEventListener('openCart', handleOpenCart)
    
    return () => window.removeEventListener('openCart', handleOpenCart)
  }, [])

  const handleClose = () => setIsOpen(false)

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#131313]">Shopping Cart</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                    {/* Item Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#131313] truncate">
                        {item.title}
                      </h3>
                                              <p className="text-lg font-bold text-[#131313]">
                        {formatPrice(item.priceCents)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                        />
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 rounded-full"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              
              <CheckoutButton onSuccess={handleClose} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
