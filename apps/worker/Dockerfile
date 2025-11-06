FROM node:20-bullseye AS base
WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

COPY pnpm-lock.yaml ./
COPY package.json ./

COPY apps/api/package.json ./apps/api/package.json
COPY apps/consumer/package.json ./apps/consumer/package.json
COPY apps/producer/package.json ./apps/producer/package.json
COPY apps/worker/package.json ./apps/worker/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/cassandra/package.json ./packages/cassandra/package.json

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm -w --filter worker build

ENV NODE_ENV=production

CMD ["pnpm", "-w", "--filter", "worker", "start"]


