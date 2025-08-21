import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'

export default function ThankYouPage() {
  return (
    <Container size="lg" className="py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Peter Image */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          <Image
            src="/checkout/thank-you.png"
            alt="Peter saying thank you"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Thank You Message */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-[#131313] tracking-wide animate-in slide-in-from-top-8 duration-700">
            Thank You!
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xl text-gray-600 leading-relaxed">
              Your order has been placed successfully. Peter is waving hello to say thanks!
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              You'll receive a confirmation email shortly with your order details. 
              We'll ship your Peter's World items as soon as possible.
            </p>
            
            <div className="pt-8">
              <Link 
                href="/"
                className="inline-block bg-[#131313] text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
