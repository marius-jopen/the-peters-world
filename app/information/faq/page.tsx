import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Peter's World?",
      answer: "Peter's World is a collection of creative objects featuring Peter, a small, hairy, oddly lovable character who wanders through tiny everyday dramas. We offer calendars, postcards, and original drawings."
    },
    {
      question: "Are the products handmade?",
      answer: "The original drawings are hand-drawn originals, while calendars and postcards are high-quality prints of these original artworks. Each piece is carefully produced to maintain the charm and quality of the original drawings."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship worldwide from our studio in Germany. Shipping times vary by location, typically 5-7 days within the EU and 10-14 days internationally."
    },
    {
      question: "Can I request a custom drawing?",
      answer: "We occasionally take custom commissions. Please contact us through our contact page to discuss your request and availability."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards through our secure Stripe checkout system. All payments are processed securely and we never store your payment information."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also contact us directly for order status updates."
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "We offer a 14-day return policy for all items in original condition. If you're not completely satisfied, please contact us to arrange a return."
    },
    {
      question: "Are the calendars for specific years?",
      answer: "Yes, our calendars are produced for specific years and feature 12 unique Peter drawings, one for each month. We typically release new calendars in the fall for the following year."
    }
  ]

  return (
    <Container size="md" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-headline font-bold text-[#131313] mb-8 text-center">
          Frequently Asked Questions
        </h1>
        
        <Prose className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h2 className="text-xl font-semibold text-[#131313] mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
          
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl text-center">
            <h2 className="text-lg font-semibold text-[#131313] mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer you're looking for, please don't hesitate to contact us.
            </p>
            <a 
              href="/information/contact"
              className="btn-primary inline-block"
            >
              Contact Us
            </a>
          </div>
        </Prose>
      </div>
    </Container>
  )
}
