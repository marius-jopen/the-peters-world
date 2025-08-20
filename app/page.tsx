'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container } from '@/components/Container'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductModal } from '@/components/ProductModal'
import { Product } from '@/types'
import productsData from '@/data/products.json'

export default function HomePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Get products from data
  const products: Product[] = productsData

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
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-light text-[#131313] mb-4 tracking-wide w-2/3 mx-auto">
          Creative objects from Peter's World.
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto font-light pt-4">
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
