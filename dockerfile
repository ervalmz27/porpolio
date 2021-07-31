FROM keymetrics/pm2:10-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache \
    bash \
    git \
    curl \
    openssh

MAINTAINER ambyx project

RUN mkdir -p /usr/src/ambyx
WORKDIR /usr/src/ambyx

COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
RUN touch storage/cache/homepage_cache.json && echo "[]" > storage/cache/homepage_cache.json

EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json", "--env", "production"]
