'use client'

import { ProductCategory } from '@/types'
import clsx from 'clsx'

interface FiltersBarProps {
  activeFilter: ProductCategory | 'all'
  onFilterChange: (filter: ProductCategory | 'all') => void
}

const filters = [
  { id: 'all', label: 'All' },
  { id: 'calendar', label: 'Calendars' },
  { id: 'postcards', label: 'Postcards' },
  { id: 'original', label: 'Originals' },
] as const

export function FiltersBar({ activeFilter, onFilterChange }: FiltersBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id as ProductCategory | 'all')}
          className={clsx(
            'filter-pill',
            activeFilter === filter.id ? 'filter-pill-active' : 'filter-pill-inactive'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
