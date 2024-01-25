FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm i

COPY . .

# Note: Don't expose ports here, Compose will handle that for us

CMD node --watch server.js