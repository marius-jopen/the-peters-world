import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Get the base URL for converting relative image paths to absolute URLs
    let baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : process.env.NEXTAUTH_URL || 'http://localhost:3000'
    
    // Fallback for development
    if (!baseUrl || baseUrl === 'http://localhost:3000') {
      baseUrl = 'http://localhost:3000'
    }
    
    console.log('Base URL for images:', baseUrl) // Debug log

    // Create line items for Stripe
    const lineItems = items.map(item => {
      // Convert relative image path to absolute URL
      let imageUrl = item.image
      
      if (!imageUrl.startsWith('http')) {
        // Ensure the image path starts with a slash
        const imagePath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`
        imageUrl = `${baseUrl}${imagePath}`
      }

      console.log('Product:', item.title, 'Image URL:', imageUrl) // Debug log

      // Validate image URL
      if (!imageUrl || imageUrl === '') {
        console.warn('Warning: Empty image URL for product:', item.title)
        imageUrl = `${baseUrl}/logo.png` // Fallback to logo
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title,
            images: [imageUrl],
            description: item.title, // Add description for better product info
          },
          unit_amount: item.priceCents,
        },
        quantity: item.quantity,
      }
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL || 'http://localhost:3000',
      metadata: {
        items: JSON.stringify(items.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
        }))),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
