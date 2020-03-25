FROM node:13.10-alpine

WORKDIR /usr/app
ENV PORT 3000

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm ci

COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src

EXPOSE $PORT

CMD npm start
