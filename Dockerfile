# Since we can only run the project in dev mode, we create a massive container.
# TODO: prod ready container with the minimal packages.
FROM node:24-alpine

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  bash \
  curl \
  socat

ENV TINA_PUBLIC_IS_LOCAL=true
ENV TINA_PUBLIC_CONTENT_API_URL=http://localhost:3000/api/tina/gql
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3000

COPY scripts/entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]