FROM node:20-bullseye AS base
WORKDIR /workspace

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Copy only lockfiles first for better layer caching
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy workspace manifests
COPY apps/api/package.json ./apps/api/package.json
COPY apps/consumer/package.json ./apps/consumer/package.json
COPY apps/producer/package.json ./apps/producer/package.json
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/cassandra/package.json ./packages/cassandra/package.json

# Install deps for the whole workspace (uses lockfile)
RUN pnpm install --frozen-lockfile

# Now copy the full repo
COPY . .

# Build only the api app (and its deps as needed)
RUN pnpm -w --filter api build

ENV NODE_ENV=production
EXPOSE 3001

CMD ["pnpm", "-w", "--filter", "api", "start"]


