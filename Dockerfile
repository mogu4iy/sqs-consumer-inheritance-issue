FROM node:20.9.0-alpine
ARG CASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY cases/$CASE.js ./cases/case.js

EXPOSE 3000

ENTRYPOINT node ./cases/case.js