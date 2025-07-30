#!/bin/sh

# Start Tina local content server in background
TINA_PUBLIC_IS_LOCAL=true yarn tinacms dev &
TINA_PID=$!

echo "🔀 Starting socat bridge (IPv4 4001 → IPv6 ::1:4001)..."
socat TCP4-LISTEN:4001,fork TCP6:[::1]:4001 &

# Wait for the Tina server to be ready
echo "⏳ Waiting for Tina local content server..."
sleep 5

# Start Next.js server
echo "🚀 Starting Next.js"
yarn next dev

# (Optional: cleanup)
kill $TINA_PID