FROM node:current-slim

WORKDIR /usr/src/app2

COPY package.json .

RUN npm install

RUN npm install express express-session body-parser mysql http axios --save

