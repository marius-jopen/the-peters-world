import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <Container size="md" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-[#131313] mb-8 text-center text-4xl md:text-6xl font-light pb-10">
          Contact Us
        </h1>
        
        <Prose className="space-y-8">
          <section>
            <h2>Get in Touch</h2>
            <p>
              We&apos;d love to hear from you! Whether you have a question about our products, 
              need help with an order, or want to discuss a custom commission, please don&apos;t 
              hesitate to reach out.
            </p>
          </section>
          
          <section>
            <h2>Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:hello@peters-world.com" className="text-primary hover:underline">
                    hello@peters-world.com
                  </a>
                </p>
              </div>
              
              <div>
                <h3>Response Time</h3>
                <p>We typically respond within 24-48 hours during business days.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2>What We Can Help With</h2>
            <ul>
              <li>Product questions and recommendations</li>
              <li>Order status and tracking</li>
              <li>Shipping and returns</li>
              <li>Custom commission inquiries</li>
              <li>Wholesale and bulk orders</li>
              <li>Press and collaboration opportunities</li>
            </ul>
          </section>
          
          <section>
            <h2>Studio Location</h2>
            <p>
              Peter&apos;s World is based in Germany, where we create, package, and ship all 
              of our products. While we don&apos;t have a physical store open to the public, 
              we&apos;re happy to arrange local pickup for orders in our area.
            </p>
          </section>
          
          <section>
            <h2>Business Hours</h2>
            <p>
              Our studio is open Monday through Friday, 9:00 AM to 6:00 PM Central European Time. 
              We&apos;re closed on weekends and German public holidays.
            </p>
          </section>
          
          <div className="mt-12 p-6 border border-/60 rounded-2xl text-center">
            <h2 className="text-lg font-semibold text-[#131313] mb-3">
              Ready to Shop?
            </h2>
            <p className="text-gray-600 mb-4">
              Browse our collection of calendars, postcards, and original drawings.
            </p>
            <Link 
              href="/"
              className="btn-primary inline-block"
            >
              Shop Now
            </Link>
          </div>
        </Prose>
      </div>
    </Container>
  )
}
