# Quick Feedback

Quick Feedback is a web application responsible for reviewing student projects and giving feedback on them.

This project is build on fullstack web.

[WIP]

## Run locally

### Prerequisites
- Node.js ([nvm](https://github.com/nvm-sh/nvm) is recommended)
- Docker (`curl https://get.docker.com | sh`)
- [docker-compose](https://docs.docker.com/compose/install/)

### Steps
1. `yarn`
2. `yarn start`

The `start` script will create all the local services needed to run it in 
development mode. The application will be available in http://localhost:8080 by 
default.

The automated tests can be run with `yarn test`, this will also wind up some
needed local services first.
