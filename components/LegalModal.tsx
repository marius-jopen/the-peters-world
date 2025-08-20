'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver({ threshold: 0.1 })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-all duration-500 ease-out ${
          isOpen ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden transition-all duration-500 ease-out ${
          isOpen 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
        }`}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full border border-gray-200 hover:bg-black hover:border-black transition-colors duration-200 group"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-700 group-hover:text-white transition-colors duration-200" />
        </button>

        {/* Content */}
        <div 
          ref={contentRef}
          className={`p-8 pt-16 transition-all duration-700 ${
            contentVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-100'
          }`}
        >
          <h2 className="text-3xl font-light text-[#131313] mb-8">
            Legal Information
          </h2>
          
          <div className="space-y-8 text-sm text-gray-600">
            {/* Terms of Service */}
            <section>
              <h3 className="text-lg font-medium text-[#131313] mb-3">
                Terms of Service
              </h3>
              <p className="mb-3">
                By using Peter's World, you agree to these terms. All products are sold as-is. 
                We reserve the right to modify these terms at any time.
              </p>
              <p>
                Orders are processed within 2-3 business days. Returns accepted within 14 days 
                of delivery for unused items in original packaging.
              </p>
            </section>

            {/* Privacy Policy */}
            <section>
              <h3 className="text-lg font-medium text-[#131313] mb-3">
                Privacy Policy
              </h3>
              <p className="mb-3">
                We collect only necessary information to process your order and provide customer service. 
                Your data is never sold to third parties.
              </p>
              <p>
                Payment information is processed securely through Stripe. We do not store your 
                credit card details on our servers.
              </p>
            </section>

            {/* Shipping & Returns */}
            <section>
              <h3 className="text-lg font-medium text-[#131313] mb-3">
                Shipping & Returns
              </h3>
              <p className="mb-3">
                Shipping costs are calculated at checkout. International shipping available to most countries. 
                Delivery typically takes 5-10 business days.
              </p>
              <p>
                Damaged items will be replaced at no cost. Contact us within 48 hours of delivery 
                with photos for damaged item claims.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-lg font-medium text-[#131313] mb-3">
                Contact Information
              </h3>
              <p>
                For questions about orders, returns, or legal matters, please contact us at{' '}
                <a href="mailto:hello@petersworld.com" className="text-[#131313] underline">
                  hello@petersworld.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
