FROM node:8

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm install --save sequelize
RUN npm install -g nodemon
RUN npm install mysql2

EXPOSE 8086
CMD [ "npm", "start" ]