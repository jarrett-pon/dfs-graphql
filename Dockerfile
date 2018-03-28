FROM node:carbon

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

# Add AWS RDS SSL
COPY rds-combined-ca-bundle.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

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
