FROM node:alpine As development
LABEL maintainer "eko.5samuel@gmail.com"

WORKDIR /app

# Install dependencies for native module compilation
RUN apk add --no-cache make g++ python3

COPY package*.json yarn.lock ./

RUN yarn global add rimraf

RUN yarn install --only=development

# Rebuild native modules using npm
RUN npm rebuild @sentry/profiling-node

COPY . .

RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Install dependencies for native module compilation
RUN apk add --no-cache make g++ python3

EXPOSE 9229
EXPOSE 6379

COPY package*.json ./

RUN yarn install --production=true

# Rebuild native modules using npm
RUN npm rebuild @sentry/profiling-node

RUN yarn global add @nestjs/cli
RUN yarn global add pm2

COPY --from=development /app/dist ./dist

CMD ["pm2-runtime", "dist/main.js"]
