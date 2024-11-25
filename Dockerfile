FROM node:lts-alpine
LABEL maintainer "eko.5samuel@gmail.com"

WORKDIR /app

RUN apk add --no-cache make g++ python3

COPY package.json yarn.lock ./

RUN yarn global add rimraf

RUN npm rebuild @sentry/profiling-node

ENV NODE_ENV=${NODE_ENV}

EXPOSE 9009

COPY docker .

RUN touch .env

RUN set -x && yarn --frozen-lockfile

CMD [ "yarn", "start:dev" ]
