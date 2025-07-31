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
ENV TINA_PUBLIC_CONTENT_API_URL=http://localhost:4001/graphql
ENV FORCE_DEV=true
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

COPY . .

COPY scripts/build-with-tina.sh ./
RUN chmod +x ./build-with-tina.sh
RUN ./build-with-tina.sh

EXPOSE 3000
EXPOSE 4001

COPY scripts/entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]