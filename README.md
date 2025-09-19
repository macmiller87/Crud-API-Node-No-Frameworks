## Crud API Node No Frameworks

### 💻 Project Description

- This project is an API, with CRUD operations, it must be possible to create a `user`, and turn a user to a `ADMIN`, if you want, and create `products`.
- For all the end-points such as `GET`, `PUT` OR `PATCH` and `DELETE`, the user must be an `ADMIN` user to run them.

### 🚀 Technologies

- Nodejs in version v20.18.0 (LTS)
- Node Test Runner
- Postgres 
- Docker
- Prisma
- JsonWebToken
- Github Actions

### 🚀 About .env.example file

- `Important` about this configs ... the application have 2 differents databases connections with the same data structures, for run the app and the tests as well, but using each of them with their respectives database connection.

- When you decide to run this application and record the stuffs on `database`, you need to make sure of what database url the app is using, I mean about this line on `.env` DATABASE_URL_APP="postgresql://POSTGRES_USER_DOCKER:POSTGRES_PASSWORD_DOCKER@POSTGRES_HOST_DOCKER:5432/POSTGRES_DATABASE_DOCKER?schema=public", make sure the enviroment variable `DATABASE_URL_APP` is available to all the stuffs working well.


- When you decide to run this application, for running the `TESTS`, you need to make sure of what database url the app is using, I mean about this line on `.env` DATABASE_URL_TESTS="postgresql://POSTGRES_USER_DOCKER2:POSTGRES_PASSWORD_DOCKER2@POSTGRES_HOST_DOCKER2:5432/POSTGRES_DATABASE_DOCKER2?schema=public", make sure the environment variable `DATABASE_URL_TESTS` is available to all the stuffs working well.


### 🚀 How to running this application in docker container

- For running application in Docker container you should have docker installed on your system.

- Copy the url of this repo in tab `< > CODE`, and running in terminal .... `git clone "link...."`
- Install dependencies .... `npm install` or `yarn install`, depends on the installed package manager.
- You will need to create a `.env` file on `root` of this application, and copy the environment variables that is in `.env.example` of this application.   
- Create the dockers containers by running this command `yarn dc:up`.
- Then start the application with `yarn dev`, good .... now you are able to test the end-points at the app.

- When you finish, you can run `yarn dc:down`, this is going to remove the containers on docker.

### 🚀 How to running the Tests of this application

- Create the dockers containers by running this command `yarn dc:up`.
- Then start the application with `yarn dev`, good .... now you are able to test the end-points at the app.
- Then split your terminal .... make sure of keeping the previous step running ... I mean about `yarn dev`, so at second terminal run `yarn test`, for running the tests of the app.

- When you finish, you can run `yarn dc:down`, this is going to remove the containers on docker.
