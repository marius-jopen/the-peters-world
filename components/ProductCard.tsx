'use client'

import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice } from '@/lib/currency'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label={`View ${product.title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-light text-[#131313] text-lg mb-1 group-hover:text-amber-500 transition-colors">
          {product.title}
        </h3>
        <p className="text-lg text-gray-600 font-light">
          {formatPrice(product.priceCents)}
        </p>
      </div>
    </button>
  )
}
