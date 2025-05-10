# 1. Build bosqichi
FROM node:18-alpine AS builder

WORKDIR /app

# dependencies va project fayllarni nusxalash
COPY package*.json ./
RUN npm install

COPY . .

# Vite orqali build
RUN npm run build

# 2. Serve orqali static fayllarni run qilish
FROM node:18-alpine AS runner

WORKDIR /app

# serve ni global o'rnatamiz
RUN npm install -g serve

# builddan chiqqan fayllarni nusxalaymiz
COPY --from=builder /app/dist ./dist

# port
EXPOSE 3000

# start
CMD ["serve", "-s", "dist", "-l", "3000"]