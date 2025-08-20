'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container } from '@/components/Container'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductModal } from '@/components/ProductModal'
import { Product } from '@/types'
import productsData from '@/data/products.json'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function HomePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { ref: heroRef, isVisible: heroVisible } = useIntersectionObserver({ threshold: 0.3 })

  // Get products from data
  const products = productsData as any

  // Handle URL query parameter for product modal
  useEffect(() => {
    const productSlug = searchParams.get('product')
    if (productSlug) {
      const product = products.find(p => p.slug === productSlug)
      if (product) {
        setSelectedProduct(product)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, products])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    // Update URL with product query parameter
    router.push(`/?product=${product.slug}`, { scroll: false })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
    // Remove product query parameter from URL
    router.push('/', { scroll: false })
  }

  return (
    <Container size="xl" className="py-12">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`text-center mb-16 transition-all duration-1000 ${
          heroVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-6 opacity-100'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-light text-[#131313] mb-4 tracking-wide w-2/3 mx-auto pt-12">
          Creative objects from Peter's World.
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto font-light pt-4 pb-12">
          Calendars, postcards, and original drawings.
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid 
        products={products} 
        onProductClick={handleProductClick} 
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  )
}
