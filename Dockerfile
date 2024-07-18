# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
FROM node:22 as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Install node modules
COPY --link .npmrc yarn.lock package.json ./
RUN yarn install --frozen-lockfile

# Copy application code
COPY --link . .

# Build application
RUN yarn build

# Final stage for app image
FROM base

# Install packages needed to run node modules
RUN apt-get update -qq && \
    apt-get install -y ca-certificates openssl

# Copy built application
COPY --from=build /app /app

ENV MODE=production
# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "start" ]
