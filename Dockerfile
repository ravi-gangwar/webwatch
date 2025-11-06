FROM node:20-bullseye AS base
WORKDIR /workspace

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy lockfile and root package.json
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy only package.json manifests for better cache reuse
COPY apps/api/package.json ./apps/api/package.json
COPY apps/consumer/package.json ./apps/consumer/package.json
COPY apps/producer/package.json ./apps/producer/package.json
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/cassandra/package.json ./packages/cassandra/package.json

# Install all workspace deps once
RUN pnpm install --frozen-lockfile

# Copy full repo
COPY . .

# Build all TypeScript to dist/
RUN pnpm -w build

ENV NODE_ENV=production
EXPOSE 3001

# This base image can run any app via pnpm filters
# Default: no-op; overriden by compose service commands
CMD ["node", "-e", "console.log('Base image built; specify command via compose service')"]


