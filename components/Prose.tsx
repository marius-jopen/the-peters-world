import { ReactNode } from 'react'
import clsx from 'clsx'

interface ProseProps {
  children: ReactNode
  className?: string
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={clsx(
        'prose prose-lg max-w-none',
        'prose-headings:text-[#131313] prose-headings:font-bold',
        'prose-p:text-gray-600 prose-p:leading-relaxed',
        'prose-a:text-[#131313] prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-[#131313] prose-strong:font-semibold',
        'prose-ul:text-gray-600 prose-li:marker:text-gray-400',
        className
      )}
    >
      {children}
    </div>
  )
}
