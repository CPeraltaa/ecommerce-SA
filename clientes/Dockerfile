FROM node:current-slim

WORKDIR /usr/src/app4

COPY package.json .

RUN npm install

RUN npm install express morgan nodemailer dotenv ejs request xmlhttprequest --save
