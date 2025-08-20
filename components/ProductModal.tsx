'use client'

import { useEffect, useRef, useState } from 'react'
import { X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice } from '@/lib/currency'
import { QuantitySelector } from './QuantitySelector'
import { useCartStore } from '@/store/cart'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['details']))
  const [isClosing, setIsClosing] = useState(false)
  const addItem = useCartStore(state => state.addItem)
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  // Get all images for the product
  const getProductImages = () => {
    if (!product) return []

    const images = [product.image]
    
    // Add slideshow images for calendar
    if (product.category === 'calendar' && product.slug === 'peters-world-calendar-2026') {
      images.push('/products/calendar-2026-slide-1.jpg')
      images.push('/products/calendar-2026-slide-1.jpg')
      images.push('/products/calendar-2026-slide-3.jpg')
    }
    
    return images
  }

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

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      setIsClosing(false)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  // Reset image index when product changes
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0)
    }
  }, [product])

  const toggleSection = (section: string) => {
    const newOpenSections = new Set<string>()
    if (!openSections.has(section)) {
      newOpenSections.add(section)
    }
    setOpenSections(newOpenSections)
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      handleClose()
    }
  }

  if (!isOpen || !product) return null

  // Get images for this specific product
  const images = getProductImages()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-all duration-500 ease-out ${
          isClosing ? 'bg-opacity-0 opacity-0' : 'bg-opacity-50 opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden transition-all duration-500 ease-out ${
          isClosing 
            ? 'translate-y-8 opacity-0 scale-95' 
            : 'translate-y-0 opacity-100 scale-100'
        }`}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full border border-gray-200 hover:bg-black hover:border-black transition-all duration-200 group"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-700 group-hover:text-white transition-colors duration-200" />
        </button>

        <div 
          ref={contentRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 pb-10 pt-2 transition-all duration-700 ${
            contentVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-100'
          }`}
        >
          {/* Left: Image Slideshow */}
          <div className="space-y-4">
            <div className="relative aspect-square group">
              <Image
                src={images[currentImageIndex] || product.image}
                alt={`${product.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover rounded-2xl"
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

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-[#131313] mb-2 tracking-wide">
                {product.title}
              </h1>
              <p className="text-2xl text-gray-600 font-light">
                {formatPrice(product.priceCents)}
              </p>
            </div>

            <p className="text-gray-600 text-base leading-relaxed font-light">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          transform: openSections.has('shipping') ? 'translateX(0)' : 'translateX(-10px)',
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
      </div>
    </div>
  )
}
