FROM node:14.17.0-stretch-slim

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3100

RUN npm install -g pm2

# 開発環境
# CMD ["npm", "run", "start-watch"]
# 本番環境
CMD ["npm", "run", "deploy"]