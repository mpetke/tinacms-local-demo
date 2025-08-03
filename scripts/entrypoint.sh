#!/bin/sh

echo "🚀 Starting Tina dev server..."
yarn start-tina-prod &
TINA_PID=$!

# Wait for port 4001 to be ready
echo "⏳ Waiting for Tina GraphQL server on port 4001..."
for i in $(seq 1 60); do
  if curl -s http://localhost:4001/graphql > /dev/null; then
    echo "✅ Tina GraphQL server is ready."
    break
  fi
  sleep 1
done

if ! kill -0 $TINA_PID > /dev/null 2>&1; then
  echo "❌ Tina server failed to start."
  exit 1
fi

echo "🚀 Starting Next.js"
yarn start-next-prod
