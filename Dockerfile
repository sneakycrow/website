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
COPY --link _drafts/ _drafts/
COPY --link _posts/ _posts/
COPY --link prisma/ prisma/
COPY --link src/ src/
COPY --link static/ static/
COPY --link postcss.config.js postcss.config.js
COPY --link svelte.config.js svelte.config.js
COPY --link tailwind.config.ts tailwind.config.ts
COPY --link theme.ts theme.ts
COPY --link tsconfig.json tsconfig.json
COPY --link vite.config.ts vite.config.ts

# Build application
RUN yarn build

# Final stage for app image
FROM base

# Install packages needed to run node modules
RUN apt-get update -qq && \
    apt-get install -y ca-certificates openssl

# Start the website
EXPOSE 3000
COPY entrypoint.sh entrypoint.sh
CMD ["./entrypoint.sh"]
