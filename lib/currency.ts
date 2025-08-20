export const formatPrice = (priceCents: number, currency: string = 'EUR'): string => {
  const price = priceCents / 100
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(price)
}

export const formatPriceRange = (minCents: number, maxCents: number, currency: string = 'EUR'): string => {
  const min = formatPrice(minCents, currency)
  const max = formatPrice(maxCents, currency)
  return `${min} - ${max}`
}
