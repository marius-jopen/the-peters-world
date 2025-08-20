'use client'

import Image from 'next/image'
import { PeterItem } from '@/types'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface PetersGridProps {
  peters: PeterItem[]
}

export function PetersGrid({ peters }: PetersGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {peters.map((peter, index) => {
        const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 })
        return (
          <div 
            key={peter.id} 
            ref={ref}
            className={`text-center group transition-all duration-700 ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-100'
            }`}
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
        )
      })}
    </div>
  )
}
