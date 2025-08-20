'use client'

import Image from 'next/image'
import { PeterItem } from '@/types'

interface PetersGridProps {
  peters: PeterItem[]
}

export function PetersGrid({ peters }: PetersGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
      {peters.map(peter => (
        <div key={peter.id} className="text-center group">
          <div className="relative aspect-square mb-4 bg-white rounded-2xl shadow-sm overflow-hidden group-hover:shadow-md transition-shadow">
            <Image
              src={peter.image}
              alt={peter.name}
              fill
              className="object-contain p-4"
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
