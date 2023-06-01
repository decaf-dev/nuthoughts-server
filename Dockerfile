FROM node:alpine

WORKDIR /opt/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 9005

ENTRYPOINT ["node"]

CMD ["build/index.js"]