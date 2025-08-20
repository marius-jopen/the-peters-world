import Link from 'next/link'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export default function InformationPage() {
  const infoSections = [
    {
      title: 'Shipping & Returns',
      description: 'Information about shipping times, costs, and return policies.',
      href: '/information/shipping-and-returns',
      icon: '📦',
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions about our products and services.',
      href: '/information/faq',
      icon: '❓',
    },
    {
      title: 'Contact',
      description: 'Get in touch with us for questions, support, or custom orders.',
      href: '/information/contact',
      icon: '📧',
    },
    {
      title: 'Legal',
      description: 'Legal information including imprint and privacy policy.',
      href: '/information/legal/imprint',
      icon: '⚖️',
    },
  ]

  return (
    <Container size="lg" className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-headline font-bold text-[#131313] mb-8 text-center">
          Information
        </h1>
        
        <Prose className="text-center mb-16">
          <p>
            Everything you need to know about Peter&apos;s World, from shipping information 
            to frequently asked questions.
          </p>
        </Prose>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infoSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group block p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h2 className="text-xl font-semibold text-[#131313] mb-3 group-hover:text-amber-500 transition-colors">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}
