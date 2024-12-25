# syntax = docker/dockerfile:1
FROM node:22.4 AS base
WORKDIR /app

# Create a stage specifically for dependency installation
FROM base AS deps

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
FROM deps AS build

# Copy application code
COPY --link _posts/ /app/_posts/
COPY --link src/ /app/src/
COPY --link prisma/ /app/prisma/
COPY --link static/ /app/static/
COPY --link .eslintignore /app/
COPY --link .eslintrc.cjs /app/
COPY --link .nvmrc /app/
COPY --link .prettierignore /app/
COPY --link .prettierrc /app/
COPY --link .yarnrc /app/
COPY --link package.json /app/
COPY --link postcss.config.js /app/
COPY --link svelte.config.js /app/
COPY --link vite.config.ts /app/
COPY --link tsconfig.json /app/
COPY --link theme.ts /app/
COPY --link tailwind.config.ts /app/
COPY --link yarn.lock /app/

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
