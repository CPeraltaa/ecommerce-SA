FROM node:current-slim

WORKDIR /usr/src/app3

COPY package.json .

RUN npm install

RUN npm install express morgan nodemailer dotenv mysql  --save
