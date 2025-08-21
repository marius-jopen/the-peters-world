'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { ShoppingCart, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [itemCount, setItemCount] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Use useEffect to avoid hydration mismatch
  useEffect(() => {
    const count = useCartStore.getState().getItemCount()
    setItemCount(count)
    
    // Subscribe to cart changes
    const unsubscribe = useCartStore.subscribe((state) => {
      setItemCount(state.getItemCount())
    })
    
    // Mark as hydrated after component mounts
    setIsHydrated(true)
    
    return unsubscribe
  }, [])

  const navLinks = [
    { href: '/', label: 'Shop' },
    { href: '/world', label: 'World' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FAF7F2]/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Desktop Navigation - Left */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#131313]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo - Centered on desktop, left on mobile */}
          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Link href="/" className="flex items-center font-gt-mono animate-in slide-in-from-top-4 duration-500">
              <img src="/logo.png" alt="Peter's World" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Right side - Cart and Mobile Menu */}
          <div className="flex items-center space-x-2 ml-auto">
            {/* Cart - Hidden on mobile (now handled by floating cart button) */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  // This will be handled by the CartDrawer component
                  const event = new CustomEvent('openCart')
                  window.dispatchEvent(event)
                }}
                className="relative p-2 text-[#131313] hover:text-gray-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {isHydrated && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button - Right side */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#131313] hover:text-gray-600 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-8">
            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#131313] hover:text-gray-600 transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
