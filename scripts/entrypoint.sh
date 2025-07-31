#!/bin/sh

echo "🏗 Building Tina admin dashboard..."
yarn tinacms build --local

echo "🚀 Starting Next.js"
yarn next dev
