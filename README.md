

### Install Dependencies

This project needs some dependencies. Let's go install it.

```bash
yarn install
```


### Database Migration and Seed


```bash
yarn migrate:schema
```

After migrate the schema, also we need to run data seed

```bash
yarn seed
```

### Template Migration

> Optional

The template migration will automatically upload `/templates` through AWS SES.

For migrate

```bash
yarn migrate:template
```

### Run Project

Finally, Cheers 🍻🍻 !!! you passed all steps.

Now you can run the project.

```bash
yarn start:dev
```

## Installation with Docker


```bash
docker-compose up -d
```

## Run docker in production ready


```bash
docker-compose -f docker-compose-production.yml up --build -d

```

## To turn of production Docker ready

```bash
docker-compose -f docker-compose-production.yml dowun
```

## Test

The project only provide `unit testing`.

```bash
yarn test
```

## Swagger

You can check The Swagger after running this project. Url `localhost:3000/docs`

## API Key

api key: `v8VB0yY887lMpTA2VJMV`
api key secret: `zeZbtGTugBTn3Qd5UXtSZBwt7gn3bg`

## User

1. Super Admin
    - email: `superadmin@mail.com`
    - password: `aaAA@123`
2. Admin
    - email: `admin@mail.com`
    - password: `aaAA@123`
3. Member
    - email: `member@mail.com`
    - password: `aaAA@123`
4. User
    - email: `user@mail.com`
    - password: `aaAA@123`

## BullMQ Board

> This available with docker installation

You can check and monitor your queue.
Url `localhost:3010`

### User

-   email: `admin`
-   password: `admin123`
