#!/bin/bash

# Peter's World - Quick Start Script

echo "🚀 Starting Peter's World..."

# Check if .env.local exists, if not copy from template
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.template .env.local
    echo "⚠️  Please edit .env.local with your Stripe keys before continuing!"
    echo "   You can get test keys from: https://dashboard.stripe.com/test/apikeys"
    echo ""
    read -p "Press Enter after you've updated .env.local..."
fi

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🌐 Starting development server..."
npm run dev
