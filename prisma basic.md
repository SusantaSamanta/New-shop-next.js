# prisma-mysql-backend
RESTful backend built with Express.js, Prisma ORM, and MySQL featuring CRUD operations and database management.


# Steps for setup prisma with mysql 

    npm init
    npm express
    create index.js
    create one server 
    create some routes 
    
    install : prisma : npm i prisma
    install : prisma/client : npm i @prisma/client

    install prisma 6 :  npm install prisma@6.16.2 @prisma/client@6.16.2

    then> npx prisma init 
    this will  : 
    Initialized Prisma in your project
    prisma/
      schema.prisma
    prisma.config.ts
    .env
    .gitignore


## Setup mysql DB connection :
    go to .env
    DATABASE_URL="mysql://root:password@localhost:3306/dbName"

## Edit prisma/schema.prisma:
    generator client {
      provider = "prisma-client"
    }

    datasource db {
      provider = "mysql"
      url= env("DATABASE_URL")        ///some time in this line vsCode show error 
    }

## Models are create inside this schema.prisma file 

### To giving  the table name always give prurel name. This is very help full.
    generator client {}
      .......
      ......{
      url= env("DATABASE_URL")        
    }

    model users{ //add s at end 
      id     Int      @id @default(autoincrement())
      name   String
      email  String   @unique
    }

    model subject{
      ....
      ...
    }
### We have to create all model in this file

## For checking is all ok :
    npx prisma validate

## For create migration model for sql :
    npx prisma migrate dev --name (give_name_here)

    * This command help to sync changes to the actual mySql DB with prisma

    For every change in model schema we have to run this command. Add a meaningful name depending on change like: --name phone_add
### Also remind that 
    For every time we run this command if no error.
    Inside Migration folder new file create like : 20260627100131_phone_add/migration.sql

## After migration also do prisma generate :
    npx prisma generate

    this not so impotent like migration. But with out this command vs code show some error for this reason i not get prisma suggestions so do it for every changes in schema.prisma

    When run this commend stop running server which use this data base.


# JOIN in sql

    In PostgreSQL, JOIN is the closest equivalent to MongoDB's populate().
    But there is an important difference:
    - MongoDB + Mongoose → populate()
    - PostgreSQL → JOIN
    - Prisma → usually include / select, which Prisma converts into the required SQL queries/joins.
    1. MongoDB populate()
    Suppose you have:
    const addresses = await Address.find({ userId })
        .populate("userId");

    You might get:
    {
      "house": "12A",
      "city": "Durgapur",
      "userId": {
        "_id": "user123",
        "name": "Susanta",
        "email": "susanta@example.com"
      }
    }

    populate() takes the referenced ID and gives you the related document.
    2. PostgreSQL JOIN
    Suppose your tables are:
    users
    ----------------
    id
    name
    email


    Address
    ----------------
    id
    userId
    house
    city
    pincode

    You can join them:
    SELECT
        a.id,
        a.house,
        a.city,
        a.pincode,
        u.id AS user_id,
        u.name AS user_name,
        u.email
    FROM "Address" a
    JOIN users u
        ON a.userId = u.id
    WHERE a.userId = 'user123';

    The important part is:
    JOIN users u
    ON a.userId = u.id

    That's essentially the relationship matching that populate() performs.
    3. With Prisma — this is what you'll mostly use
    Since you're using Prisma, you generally don't manually write the JOIN.
    For example:
    const addresses = await prisma.address.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
        },
    });

    This gives you something conceptually like:
    [
        {
            "id": "address123",
            "house": "12A",
            "city": "Durgapur",
            "pincode": "713213",
            "user": {
                "id": "user123",
                "name": "Susanta",
                "email": "susanta@example.com"
            }
        }
    ]

    So:
    MongoDB                    Prisma
    ────────────────────────────────────────
    populate("user")      →    include: { user: true }

    4. You can also select specific fields
    You usually don't want the entire user object.
    const addresses = await prisma.address.findMany({
        where: {
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    Or use select at the top level:
    const addresses = await prisma.address.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            house: true,
            street: true,
            city: true,
            pincode: true,

            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    5. Your FreshNext example
    Suppose you want:
    Address
      ↓
    User
      ↓
    Dealer

    With Prisma you can do something like:
    const address = await prisma.address.findUnique({
        where: {
            id: addressId,
        },
        include: {
            user: true,
        },
    });

    If your relations are properly defined, you can also include nested relations:
    const address = await prisma.address.findUnique({
        where: {
            id: addressId,
        },
        include: {
            user: {
                include: {
                    dealer: true,
                },
            },
        },
    });

    That's similar to doing multiple populate() calls in MongoDB.
    Easy comparison
    MongoDB + Mongoose

    Address.find()
          ↓
    .populate("user")
          ↓
    User data included

    PostgreSQL + SQL

    SELECT ...
    FROM Address
    JOIN users
    ON Address.userId = users.id

    PostgreSQL + Prisma

    prisma.address.findMany({
        include: {
            user: true
        }
    })


