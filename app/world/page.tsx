import { Container } from '@/components/Container'
import { PetersGrid } from '@/components/PetersGrid'
import { PeterItem } from '@/types'
import petersData from '@/data/peters.json'

export default function WorldPage() {
  const peters: PeterItem[] = petersData

  return (
    <Container size="xl" className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-light text-[#131313] mb-4 tracking-wide w-2/3 mx-auto">
          Meet the World of Peter
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto font-light pt-4">
          A collection of whimsical characters from Peter's imagination.
        </p>
      </div>

      {/* Peters Grid */}
      <PetersGrid peters={peters} />
    </Container>
  )
}
