FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

RUN npm install express dotenv mocha morgan chai mysql --save

