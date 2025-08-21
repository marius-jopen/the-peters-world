import Image from 'next/image'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'

export default function AboutPage() {
  return (
    <Container size="lg" className="py-12">
      {/* Hero Image */}
      <div className="relative aspect-[20/10] mb-12 rounded-3xl overflow-hidden">
        <Image
          src="/about/eyes.gif"
                      alt="Peter&apos;s World"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light text-[#131313] mb-8 text-center text-4xl md:text-6xl font-light pb-10 tracking-wide animate-in slide-in-from-top-8 duration-700">
          About Peter&apos;s World
        </h1>
        
        <Prose>
          <p>
            Peter is a small, hairy, oddly lovable character who wanders through tiny everyday dramas. 
            Peter&apos;s World collects these drawings as calendars, postcards, and sometimes original pieces.
          </p>
          
          <p>
            Each drawing captures a moment of whimsy, a slice of life that might otherwise go unnoticed. 
            From sleepy mornings to quiet afternoons, Peter navigates the world with curiosity and gentle humor.
          </p>
          
          <p>
            The collection began as simple sketches and has grown into a celebration of the ordinary moments 
            that make life special.             Whether you&apos;re looking for a calendar to brighten your year, postcards 
            to send to friends, or an original piece to treasure, Peter&apos;s World offers creative objects 
            for endless imagination.
          </p>
        </Prose>
      </div>
    </Container>
  )
}
