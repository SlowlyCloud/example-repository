FROM node:18-alpine as builder

ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV:-production}

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn install && yarn global add pm2

EXPOSE 3000

CMD ["sh", "-c", "./start.sh"]