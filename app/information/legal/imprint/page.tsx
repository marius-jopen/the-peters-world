import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export default function ImprintPage() {
  return (
    <Container size="md" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-headline font-bold text-[#131313] mb-8 text-center">
          Legal Imprint
        </h1>
        
        <Prose className="space-y-8">
          <section>
            <h2>Company Information</h2>
            <div className="space-y-2">
              <p><strong>Business Name:</strong> Peter's World</p>
              <p><strong>Owner:</strong> [Your Name]</p>
              <p><strong>Address:</strong> [Your Address]</p>
              <p><strong>Email:</strong> hello@peters-world.com</p>
            </div>
          </section>
          
          <section>
            <h2>Business Registration</h2>
            <p>
              This business is operated as a sole proprietorship in Germany. 
              All applicable business regulations and tax requirements are followed.
            </p>
          </section>
          
          <section>
            <h2>VAT Information</h2>
            <p>
              VAT ID: [Your VAT ID if applicable]<br />
              All prices shown include applicable German VAT (19%).
            </p>
          </section>
          
          <section>
            <h2>Professional Associations</h2>
            <p>
              [List any professional associations or memberships if applicable]
            </p>
          </section>
          
          <section>
            <h2>Contact for Legal Matters</h2>
            <p>
              For legal inquiries, please contact us at:<br />
              <a href="mailto:legal@peters-world.com" className="text-primary hover:underline">
                legal@peters-world.com
              </a>
            </p>
          </section>
          
          <section>
            <h2>Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only. 
              While we strive to keep the information up to date and correct, we make no 
              representations or warranties of any kind about the completeness, accuracy, 
              reliability, suitability, or availability of the information, products, services, 
              or related graphics contained on the website for any purpose.
            </p>
          </section>
        </Prose>
      </div>
    </Container>
  )
}
