# Node.js asosidagi image dan foydalanamiz
FROM node:22.13.1-alpine

# Ilova katalogini yaratamiz
WORKDIR /app

# package.json va package-lock.json ni nusxa olamiz
COPY package*.json ./

# Loyihaga kerakli paketlarni o'rnatamiz
RUN npm install

# Loyihaning qolgan barcha fayllarini nusxalash
COPY . .

# Loyihani production uchun build qilish
RUN npm run build

# serve ni o'rnatamiz
RUN npm install -g serve

# Portni ochib beramiz
EXPOSE 5173

# Production serverini ishga tushirish
CMD ["serve", "-s", "dist", "-l", "5173"]
