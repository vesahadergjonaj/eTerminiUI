# syntax=docker/dockerfile:1
#
# eTerminiUI — SPA React/Vite e servuar nga nginx.
# Build context: rrënja e repo-s eTerminiUI
#
# KUJDES: Vite i "pjek" variablat VITE_* në build-time, jo në runtime.
# Prandaj URL-të e API-së jepen si build args, jo si environment te compose.
#
#   docker build --build-arg VITE_API_URL=https://eterminiapi.troni.dev/api -t etermini-ui .

# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=/api
ARG VITE_HUB_URL=
ENV VITE_API_URL=$VITE_API_URL \
    VITE_HUB_URL=$VITE_HUB_URL

RUN npm run build

# ---------- runtime ----------
FROM nginx:1.27-alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
