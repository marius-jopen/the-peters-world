import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { QuantitySelector } from '@/components/QuantitySelector'
import { AddToCartButton } from '@/components/AddToCartButton'
import { formatPrice } from '@/lib/currency'
import { Product } from '@/types'
import productsData from '@/data/products.json'

interface ProductPageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const products: Product[] = productsData
  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return (
    <Container size="xl" className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Product Image */}
        <div className="relative aspect-square bg-white rounded-2xl shadow-sm overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right: Product Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-[#131313] mb-4">
              {product.title}
            </h1>
            <p className="text-3xl font-bold text-[#131313]">
              {formatPrice(product.priceCents)}
            </p>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quantity
              </label>
              <QuantitySelector
                quantity={1}
                onQuantityChange={() => {}}
                disabled
              />
            </div>
            
            <AddToCartButton 
              product={product} 
              className="w-full"
            />
          </div>

          {/* Product Details */}
          {product.details && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600 flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specs && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Specifications</h3>
              <dl className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="font-medium text-gray-700">{key}:</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Shipping */}
          {product.shipping && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Shipping</h3>
              <p className="text-gray-600">{product.shipping}</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
