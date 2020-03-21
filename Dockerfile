FROM node:current-alpine

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENV PORT 3000
EXPOSE 3000

ENTRYPOINT [ "./entrypoint.sh" ]
