# syntax=docker/dockerfile:1
ARG NODE_VERSION=20

# FROM node:${NODE_VERSION}-alpine AS builder
FROM node
WORKDIR /app

# optional build dependencies for native modules
# RUN apk add --no-cache python3 make g++

# install deps (use package-lock.json if present)
# COPY package*.json ./
COPY package.json .

RUN ls -al
RUN npm install

# RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# copy source and run build if present
COPY . ./
# RUN npm run build --if-present

# FROM node:${NODE_VERSION}-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=dev

# copy built app and deps
# COPY --from=builder /app ./

# make sure non-root user owns files and run as that user
# RUN chown -R node:node /app
# USER node

# EXPOSE 3000
EXPOSE 8082
CMD ["npm","start"]