FROM node:8

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install --save sequelize  
RUN npm install -g sequelize-cli   
RUN npm install -g nodemon
RUN npm install mysql2

EXPOSE 3000
CMD [ "npm", "start" ]