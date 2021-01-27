FROM node:14.15.4-alpine3.12

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "run", "start-watch"]