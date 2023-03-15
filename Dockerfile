FROM node:18-alpine

WORKDIR /var/app
COPY ./package.json /var/app/

RUN npm install