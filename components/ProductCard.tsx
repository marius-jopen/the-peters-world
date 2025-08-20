'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatPrice } from '@/lib/currency'
import { useCartStore } from '@/store/cart'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addItem)
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 })
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }
  
  return (
    <div 
      ref={ref}
      className={`text-left group transition-all duration-700 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-100'
      }`}
    >
      {/* Image Container with Hover CTA */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4">
        {/* Clickable Image */}
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full"
          aria-label={`View ${product.title}`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* CTA Button - Appears on Hover */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white font-medium px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm scale-95 group-hover:scale-100"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="text-center animate-in fade-in duration-500 delay-200">
        <Link 
          href={`/product/${product.slug}`}
          className="hover:text-gray-600 transition-colors duration-200"
        >
          <h3 className="font-light text-[#131313] text-lg">
            {product.title}
          </h3>
        </Link>
        <p className="text-lg text-gray-600 font-light">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </div>
  )
}
