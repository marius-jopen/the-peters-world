import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export default function ShippingAndReturnsPage() {
  return (
    <Container size="md" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-headline font-bold text-[#131313] mb-8 text-center">
          Shipping & Returns
        </h1>
        
        <Prose className="space-y-8">
          <section>
            <h2>Shipping Information</h2>
            <p>
              We ship worldwide from our studio in Germany. All orders are carefully packaged 
              to ensure your items arrive in perfect condition.
            </p>
            
            <h3>Shipping Times</h3>
            <ul>
              <li><strong>Germany:</strong> 2-3 business days</li>
              <li><strong>EU:</strong> 5-7 business days</li>
              <li><strong>International:</strong> 10-14 business days</li>
            </ul>
            
            <h3>Shipping Costs</h3>
            <ul>
              <li><strong>Germany:</strong> €3.50</li>
              <li><strong>EU:</strong> €7.50</li>
              <li><strong>International:</strong> €12.50</li>
            </ul>
          </section>
          
          <section>
            <h2>Returns Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy 
              with your item, you can return it within 14 days of receipt.
            </p>
            
            <h3>Return Conditions</h3>
            <ul>
              <li>Item must be in original condition</li>
              <li>Original packaging must be intact</li>
              <li>Return shipping is the responsibility of the customer</li>
            </ul>
            
            <h3>Refund Process</h3>
            <p>
              Once we receive your return, we'll inspect the item and process your refund 
              within 5 business days. Refunds will be issued to your original payment method.
            </p>
          </section>
          
          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about shipping or returns, please don't hesitate 
              to <a href="/information/contact">contact us</a>. We're here to help!
            </p>
          </section>
        </Prose>
      </div>
    </Container>
  )
}
