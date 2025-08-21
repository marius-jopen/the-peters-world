import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'

export default function SomethingWentWrongPage() {
  return (
    <Container size="lg" className="py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Wrong Image */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          <Image
            src="/checkout/wrong.png"
            alt="Peter looking confused"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Error Message */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-[#131313] tracking-wide animate-in slide-in-from-top-8 duration-700">
            Oops! Something went wrong
          </h1>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xl text-gray-600 leading-relaxed">
              It looks like there was an issue with your checkout. Don&apos;t worry, your payment hasn&apos;t been processed.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              You can try again, or if you continue to have issues, please contact us for assistance.
            </p>
            
            <div className="pt-8 space-y-4">
              <Link 
                href="/"
                className="inline-block bg-[#131313] text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 mr-4"
              >
                Try Again
              </Link>
              
              <Link 
                href="/information/contact"
                className="inline-block border-2 border-[#131313] text-[#131313] px-8 py-4 rounded-full font-medium hover:bg-[#131313] hover:text-white transition-colors duration-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
