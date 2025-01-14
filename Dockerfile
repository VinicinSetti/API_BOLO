FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN psql -U your_username -c "CREATE DATABASE apibolinho;"

CMD [ "npm", "run", "start:dev"]