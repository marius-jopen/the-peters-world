'use client'

import Image from 'next/image'
import { PeterItem } from '@/types'
import { useEffect, useState } from 'react'

interface PetersGridProps {
  peters: PeterItem[]
}

export function PetersGrid({ peters }: PetersGridProps) {
  const [shuffledPeters, setShuffledPeters] = useState<PeterItem[]>([])

  // Shuffle peters on client side only to prevent hydration mismatch
  useEffect(() => {
    const shuffled = [...peters].sort(() => Math.random() - 0.5)
    setShuffledPeters(shuffled)
  }, [peters])

  // Don't render until we have shuffled peters
  if (shuffledPeters.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {peters.map((peter, index) => (
          <div key={peter.id} className="text-center group">
            <div className="relative aspect-square mb-4">
              <Image
                src={peter.image}
                alt={peter.name}
                fill
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-wiggle"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
              />
            </div>
            <h3 className="font-medium text-foreground text-sm">
              {peter.name}
            </h3>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {shuffledPeters.map((peter, index) => (
        <div 
          key={peter.id} 
          className="text-center group animate-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${Math.min(index * 50, 1000)}ms` }}
        >
          <div className="relative aspect-square mb-4">
            <Image
              src={peter.image}
              alt={peter.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-wiggle"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
            />
          </div>
          <h3 className="font-medium text-foreground text-sm">
            {peter.name}
          </h3>
        </div>
      ))}
    </div>
  )
}
