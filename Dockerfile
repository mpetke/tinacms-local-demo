# ---- Base stage ----
FROM node:24-alpine AS base

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  bash \
  curl

WORKDIR /app

COPY package.json yarn.lock* pnpm-lock.yaml* ./

RUN yarn install --frozen-lockfile

COPY . .

ENV TINA_PUBLIC_IS_LOCAL=true
ENV TINA_PUBLIC_CONTENT_API_URL=http://localhost:4001/graphql
ENV FORCE_DEV=true
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY scripts/build-with-tina.sh ./
RUN ./build-with-tina.sh

# ---- Runtime stage ----
FROM node:24-alpine AS runner

WORKDIR /app

RUN apk add --no-cache socat

COPY --from=base /app/ ./

ENV FORCE_DEV=true
ENV TINA_PUBLIC_IS_LOCAL=true
ENV TINA_PUBLIC_CONTENT_API_URL=http://localhost:4001/graphql

EXPOSE 3000
EXPOSE 4001

COPY scripts/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]