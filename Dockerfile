#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN yarn install --frozen-lockfile --silent && yarn build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:12-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package.json yarn.lock ./
# Yarn will only install dependencies and not dev-deps when NODE_ENV is production
RUN yarn install --frozen-lockfile --silent

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build