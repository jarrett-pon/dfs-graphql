FROM node:carbon

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# Create app directory
WORKDIR /usr/src/dfs-graphql

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

COPY ./src ./src

EXPOSE 4001

CMD [ "yarn", "dev" ]
