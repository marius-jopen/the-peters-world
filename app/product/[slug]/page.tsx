import { notFound } from 'next/navigation'
import productsData from '@/data/products.json'
import { ProductPageClient } from './ProductPageClient'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  
  // Find the product
  const product = productsData.find((p: any) => p.slug === slug)
  
  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}
