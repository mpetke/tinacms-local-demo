# Since we can only run the project in dev mode, we create a massive container.
# TODO: prod ready container with the minimal packages.
FROM node:24-alpine

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  bash \
  curl

WORKDIR /app

COPY . .

RUN scripts/build.sh

EXPOSE 3000

COPY scripts/entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
CMD ["./entrypoint.sh"]