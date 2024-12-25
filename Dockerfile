# syntax = docker/dockerfile:1
FROM node:22.4 as base
WORKDIR /app

# Create a stage specifically for dependency installation
FROM base as deps

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy only package.json and yarn.lock first
COPY --link package.json yarn.lock .yarnrc ./

# Install dependencies
ENV DEBUG='vite:*'
RUN yarn install --frozen-lockfile

# Build stage
FROM deps as build

# Copy application code
COPY --link . .

# Build application
RUN yarn build

# Production stage
FROM base

# Install production-only packages
RUN apt-get update -qq && \
    apt-get install -y ca-certificates openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy only production dependencies from deps stage
COPY --from=deps /app/node_modules /app/node_modules

# Copy built application
COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/

EXPOSE 3000
CMD [ "yarn", "start" ]
