FROM node:14.17.0-stretch-slim
# appの中にfrontを作りそこで作業する
WORKDIR /app/front
# 設定ファイルを先にCOPY
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]