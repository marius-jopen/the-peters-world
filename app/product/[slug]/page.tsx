'use client'

import { useState, useEffect, use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/Container'
import { QuantitySelector } from '@/components/QuantitySelector'
import { formatPrice } from '@/lib/currency'
import { Product } from '@/types'
import productsData from '@/data/products.json'
import { useCartStore } from '@/store/cart'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { ProductCard } from '@/components/ProductCard'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params)
  const products: Product[] = productsData
  const product = products.find(p => p.slug === slug)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['details']))
  const addItem = useCartStore(state => state.addItem)
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  if (!product) {
    notFound()
  }

  // Get all images for the product
  const getProductImages = () => {
    const images = [product.image]
    
    // Add slideshow images for calendar
    if (product.category === 'calendar' && product.slug === 'peters-world-calendar-2026') {
      images.push('/products/calendar-2026-slide-1.jpg')
      images.push('/products/calendar-2026-slide-2.jpg')
      images.push('/products/calendar-2026-slide-3.jpg')
    }
    
    return images
  }

  const images = getProductImages()

  const nextImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    if (images.length <= 1) return
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index)
    }
  }

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [product])

  const toggleSection = (section: string) => {
    const newOpenSections = new Set<string>()
    if (!openSections.has(section)) {
      newOpenSections.add(section)
    }
    setOpenSections(newOpenSections)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  // Get 3 related products (deterministic based on product slug to avoid hydration mismatch)
  const getRelatedProducts = () => {
    const otherProducts = products.filter(p => p.slug !== product.slug)
    // Use a deterministic sorting based on product slug to ensure server/client consistency
    const sorted = otherProducts.sort((a, b) => a.slug.localeCompare(b.slug))
    return sorted.slice(0, 3)
  }

  const relatedProducts = getRelatedProducts()

  return (
    <Container size="xl" className="py-12">
      <div 
        ref={contentRef}
        className={`transition-all duration-700 ${
          contentVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-100'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl shadow-sm overflow-hidden group">
              <Image
                src={images[currentImageIndex] || product.image}
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      index === currentImageIndex 
                        ? 'border-gray-800 scale-105' 
                        : 'border-gray-200'
                    }`}
                    title={`View image ${index + 1} of ${images.length}`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1} - ${product.title}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                      priority={index === 0}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-[#131313] mb-4 tracking-wide">
                {product.title}
              </h1>
              <p className="text-3xl text-gray-600 font-light">
                {formatPrice(product.priceCents)}
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
              {/* Details */}
              {product.details && (
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('details')}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">Details</span>
                    <div className="transition-transform duration-300 ease-out">
                      {openSections.has('details') ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      openSections.has('details') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <ul className="space-y-2">
                        {product.details.map((detail, index) => (
                          <li 
                            key={index} 
                            className="text-gray-600 transition-all duration-300"
                            style={{ 
                              animationDelay: `${index * 50}ms`,
                              transform: openSections.has('details') ? 'translateX(0)' : 'translateX(-10px)',
                              opacity: openSections.has('details') ? 1 : 0
                            }}
                          >
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Specs */}
              {product.specs && (
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('specs')}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">Specifications</span>
                    <div className="transition-transform duration-300 ease-out">
                      {openSections.has('specs') ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      openSections.has('specs') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <dl className="space-y-2">
                        {Object.entries(product.specs).map(([key, value], index) => (
                          <div 
                            key={key} 
                            className="flex justify-between transition-all duration-300"
                            style={{ 
                              animationDelay: `${index * 50}ms`,
                              transform: openSections.has('specs') ? 'translateX(0)' : 'translateX(-10px)',
                              opacity: openSections.has('specs') ? 1 : 0
                            }}
                          >
                            <dt className="font-medium text-gray-700">{key}:</dt>
                            <dd className="text-gray-600">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              )}

              {/* Shipping */}
              {product.shipping && (
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleSection('shipping')}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-medium">Shipping</span>
                    <div className="transition-transform duration-300 ease-out">
                      {openSections.has('shipping') ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      openSections.has('shipping') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p 
                        className="text-gray-600 transition-all duration-300"
                        style={{ 
                          transform: openSections.has('shipping') ? 'translateY(0)' : 'translateY(-10px)',
                          opacity: openSections.has('shipping') ? 1 : 0
                        }}
                      >
                        {product.shipping}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl font-light text-[#131313] mb-8 text-center">
            You might also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
