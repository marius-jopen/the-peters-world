'use client'

import Link from 'next/link'
import { useState } from 'react'
import { LegalModal } from './LegalModal'

export function Footer() {
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false)

  return (
    <footer className="bg-background border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-[#131313] mb-4">
              peter&apos;s world
            </h3>
            <p className="text-gray-600 max-w-md">
              Creative objects for endless imagination. Calendars, postcards, and original drawings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#131313] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#131313] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/world" className="text-gray-600 hover:text-[#131313] transition-colors">
                  World
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#131313] transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-[#131313] mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/information/shipping-and-returns" className="text-gray-600 hover:text-[#131313] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/information/faq" className="text-gray-600 hover:text-[#131313] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/information/contact" className="text-gray-600 hover:text-[#131313] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/information/legal/imprint" className="text-gray-600 hover:text-[#131313] transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2024 Peter&apos;s World. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button 
              onClick={() => setIsLegalModalOpen(true)}
              className="text-gray-600 hover:text-[#131313] text-sm transition-colors"
            >
              Legal Information
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      <LegalModal 
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />
    </footer>
  )
}
