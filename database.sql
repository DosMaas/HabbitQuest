
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "habits" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200) NOT NULL,
    "complete" BOOLEAN,
    "user_id" INTEGER,
    "category_id" INTEGER,
    "frequency_id" INTEGER
);

CREATE TABLE "destinations" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (500)
);

CREATE TABLE "habit_destination" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER,
    "destination_id" INTEGER,
    "start_date" DATE,
    "end_date" DATE,
    "active" BOOLEAN
);

CREATE TABLE "habit_log" (
    "id" SERIAL PRIMARY KEY,
    "habit_id" INTEGER,
    "date" DATE,
    "destination_id" INTEGER
);

CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (200)
);

CREATE TABLE "frequency" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR (200)
);

CREATE TABLE "challenges" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (500),
    "user_id" INTEGER
);

