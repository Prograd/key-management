FROM keyacr.azurecr.io/keymanagment-base:latest AS builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .
ENV NX_SKIP_NX_CACHE='true'

RUN npx nx build backend --prod --no-cache

FROM keyacr.azurecr.io/keymanagment-base:latest

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

CMD ["node", "./dist/apps/backend/main.js"]
