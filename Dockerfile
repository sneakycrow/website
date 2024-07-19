# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
# Issue with 22.5.0, https://github.com/nodejs/docker-node/issues/2119
FROM node:22.4 as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Install node modules
ENV DEBUG='vite:*'
COPY --link .yarnrc yarn.lock package.json ./
RUN yarn install

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

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "start" ]
