FROM node:14.17.1
WORKDIR /var/www/messenger
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]