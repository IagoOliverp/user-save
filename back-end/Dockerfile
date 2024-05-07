FROM node:18.18.0

WORKDIR /back-end

COPY . .

RUN rm -rf node_modules
RUN npm install

CMD ["npm", "start"]

EXPOSE 8080