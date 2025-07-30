# ---- Base stage ----
FROM node:24-alpine as base

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  bash \
  curl

WORKDIR /app

COPY package.json yarn.lock* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install --frozen-lockfile; \
  else echo "No lockfile found" && exit 1; \
  fi

COPY . .

ENV TINA_PUBLIC_IS_LOCAL=true
ENV TINA_PUBLIC_CONTENT_API_URL=http://localhost:4001/graphql
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=4096

# RUN yarn build-local
COPY scripts/build-with-tina.sh ./
RUN ./build-with-tina.sh

# ---- Runtime stage ----
FROM node:24-alpine as runner

WORKDIR /app

RUN apk add --no-cache socat

# COPY --from=base /app/.next ./.next
# COPY --from=base /app/public ./public
# COPY --from=base /app/node_modules ./node_modules
# COPY --from=base /app/package.json ./package.json
# COPY --from=base /app/next.config.ts ./next.config.ts
# COPY --from=base /app/tina ./tina
# COPY --from=base /app/app ./app
# COPY --from=base /app/content ./content
# COPY --from=base /app/components ./components
# COPY --from=base /app/lib ./lib
# COPY --from=base /app/pages ./pages
COPY --from=base /app/ ./

ENV NODE_ENV=production
ENV TINA_PUBLIC_IS_LOCAL=true
ENV TINA_PUBLIC_CONTENT_API_URL=http://localhost:4001/graphql

EXPOSE 3000
EXPOSE 4001

COPY scripts/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]