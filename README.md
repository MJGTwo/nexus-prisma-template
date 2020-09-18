# Nexus-Prisma Template

A complete example of Nexus framework with a test suite and using the following plugins: prisma, jwt, shield, and auth.

## Dev Setup

### Local Database setup

- run `docker-compose -f docker-compose.dev.yml up -d`
- run `yarn` to download the packages
- edit `./prisma/.env` to contain database access information (see `./prisma/.env.example` for format)
- run `npx prisma migrate up --experimental` to run migration

### Node, Outside of Docker

- run `yarn` to download the packages
- edit `.env` based on `.env.example`
- run `yarn dev` to start dev environment

## Test setup

_note: please verify your setup is correct by following "Dev Setup" first_

- run `yarn test` which will run the test suite inside of `./tests`
<!--

### Node, Inside of Docker

- create `.env.docker` based on `.env.example`
- create `./prisma/.env.docker` based on `./prisma/.env.exmaple` pointing to the `db` service
- run `docker-compose -f docker-compose.dev.yml build` to build the containers
- run `docker-compose

## Prod Setup

### Node, Outside of Docker

- run `yarn` to download the packages
- create `.env` based on `.env.example` with production variables
- run `yarn build` to build the production server
- run `yarn start` to start the server

### Inside of Docker

- create `.env.docker` based on `.env.example` with production variables
- create `./prisma/.env.docker` based on `./prisma/.env.exmaple` pointing to the `db` service
- run `docker-compose -f docker-compose.dev.yml build` to build the containers
- run `docker-compose -f docker-compose.dev.yml -d up` to run the containers -->
