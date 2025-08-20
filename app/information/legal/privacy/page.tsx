import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export default function PrivacyPage() {
  return (
    <Container size="md" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-headline font-bold text-[#131313] mb-8 text-center">
          Privacy Policy
        </h1>
        
        <Prose className="space-y-8">
          <section>
            <h2>Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support. This may include:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>Order history and preferences</li>
              <li>Communications with us</li>
            </ul>
          </section>
          
          <section>
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send you updates and marketing communications (with your consent)</li>
            </ul>
          </section>
          
          <section>
            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties, 
              except as described in this policy or with your consent. We may share information with:
            </p>
            <ul>
              <li>Payment processors (Stripe) to complete transactions</li>
              <li>Shipping partners to deliver your orders</li>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>
          
          <section>
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience, 
              analyze site traffic, and understand where our visitors are coming from. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>
          
          <section>
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>
          </section>
          
          <section>
            <h2>Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services, 
              comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>
          
          <section>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any 
              material changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>
          
          <section>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, 
              please contact us at:<br />
              <a href="mailto:privacy@peters-world.com" className="text-primary hover:underline">
                privacy@peters-world.com
              </a>
            </p>
          </section>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p><strong>Last Updated:</strong> December 2024</p>
          </div>
        </Prose>
      </div>
    </Container>
  )
}
