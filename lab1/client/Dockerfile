FROM node:12.18.1-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start", "$IP", "$SERVER_PORT" ]
