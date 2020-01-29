FROM node:13-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet
# Adicionar --only=production quando for upar para Kubernetes

RUN npm install nodemon -g --quiet

# If you are building your code for production
# RUN npm ci --only=production

COPY . . 

EXPOSE 4000

CMD ["npm", "start"]