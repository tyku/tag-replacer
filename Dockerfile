#
# ---- Base Node ----
FROM node:14.17.3-alpine AS base
WORKDIR /app

#
# ---- Dependencies ----
FROM base AS build

COPY . .
RUN npm ci && \
    npm run rimraf && \
    npm run build
# RUN npm run test

#
# ---- Release ----
FROM base AS release
# copy work dirs
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src ./src

# copy work files
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/nest-cli.json ./nest-cli.json
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY --from=build /app/tsconfig.build.json ./tsconfig.build.json

EXPOSE 9000
