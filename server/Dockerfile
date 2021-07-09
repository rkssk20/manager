FROM node:14.17.0-stretch-slim

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "run", "start-watch"]