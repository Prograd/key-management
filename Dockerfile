FROM node:lts-alpine as builder
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
RUN apk add --no-cache python3 make g++
COPY . .
RUN npm i
