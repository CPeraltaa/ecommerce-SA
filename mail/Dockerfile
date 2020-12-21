FROM node:current-slim

WORKDIR /usr/src/app2

COPY package.json .

RUN npm install

RUN npm install express morgan nodemailer dotenv  --save
