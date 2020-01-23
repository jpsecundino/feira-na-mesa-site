FROM node:13-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 4000

CMD ["npm", "start"]