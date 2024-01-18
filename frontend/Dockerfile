FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Note: Don't expose ports here, Compose will handle that for us

RUN npm run build
CMD npm run start