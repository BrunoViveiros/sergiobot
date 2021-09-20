FROM node

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]