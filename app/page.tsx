'use client'

import { Container } from '@/components/Container'
import { ProductGrid } from '@/components/ProductGrid'
import productsData from '@/data/products.json'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function HomePage() {
  const { ref: heroRef, isVisible: heroVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 })

  // Get products from data
  const products = productsData as any

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
          Creative objects from Peter&apos;s World.
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto font-light pt-4 pb-12">
          Calendars, postcards, and original drawings.
        </p>
      </div>

      {/* Product Grid */}
      <ProductGrid 
        products={products} 
      />
    </Container>
  )
}
