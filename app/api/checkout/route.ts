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
    
    // For Stripe to access images, we need a public URL
    // In development, we'll skip images to avoid localhost issues
    const isDevelopment = process.env.NODE_ENV === 'development' || baseUrl.includes('localhost')
    
    console.log('Base URL for images:', baseUrl) // Debug log
    console.log('Is development:', isDevelopment) // Debug log

    // Create line items for Stripe
    const lineItems = items.map(item => {
      let productData: any = {
        name: item.title,
        description: item.title, // Add description for better product info
      }

      // Only add images in production (Stripe can't access localhost)
      if (!isDevelopment) {
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

        productData.images = [imageUrl]
      } else {
        console.log('Development mode: Skipping images for Stripe (localhost not accessible)')
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: productData,
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
      success_url: process.env.STRIPE_SUCCESS_URL || `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL || `${baseUrl}/something-went-wrong`,
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
