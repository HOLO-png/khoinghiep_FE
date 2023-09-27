# 1. Install dependencies only when needed
FROM node:16-alpine AS deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN \
    if [ -f yarn.lock ]; then yarn; \
    elif [ -f package-lock.json ]; then npm ci; \
    else echo "Lockfile not found." && exit 1; \
    fi


# 2. Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
# COPY .env.production.sample .env.production
RUN yarn build

# 3. Install dependencies production only
FROM node:16-alpine AS prod_deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN \
    if [ -f yarn.lock ]; then yarn --prod; \
    elif [ -f package-lock.json ]; then npm install -omit=dev; \
    else echo "Lockfile not found." && exit 1; \
    fi

# 3. Production image, copy all the files and run next
FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json ./

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=prod_deps /app/node_modules ./node_modules
COPY next.config.js ./next.config.js
COPY .env .env

EXPOSE 5175

ENV PORT 5175

CMD ["yarn", "start"]
