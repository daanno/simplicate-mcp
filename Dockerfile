FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
RUN npm ci --production
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node","dist/health-server.js"]
