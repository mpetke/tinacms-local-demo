#!/bin/sh
set -e

set -a; source /app/.env; set +a
export MONGODB_URI=${BUILD_MONGODB_URI}
export NODE_OPTIONS=--max-old-space-size=4096

echo "🏗 Install node_modules"
yarn install --frozen-lockfile

echo "🏗 Building Tina to save admin/index.html..."
rm -rf /app/.next
yarn build-tina

echo "🚀 Starting Tina dev server..."
yarn tina-dev-for-build &
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

echo "🏗 Building Next.js app..."
yarn build-next

echo "🧹 Stopping Tina dev server..."
kill $TINA_PID
wait $TINA_PID || true

echo "✅ Build complete."