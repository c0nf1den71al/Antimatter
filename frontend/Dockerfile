FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm i

COPY . .

# Note: Don't expose ports here, Compose will handle that for us
ARG NEXT_PUBLIC_ANTIMATTER_API_URL=$ANTIMATTER_API_URL
RUN npm run build
CMD npm run start