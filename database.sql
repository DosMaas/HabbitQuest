
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    name character varying(200) NOT NULL,
    complete boolean,
    user_id integer,
    category_id integer,
    frequency_id integer,
    created_date date DEFAULT CURRENT_DATE
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    name character varying(500),
    distance integer,
    image_url text
);

CREATE TABLE habit_destination (
    id SERIAL PRIMARY KEY,
    user_id integer,
    destination_id integer,
    start_date date,
    end_date date,
    active boolean
);


CREATE TABLE habit_log (
    id SERIAL PRIMARY KEY,
    habit_id integer,
    created_date date,
    destination_id integer
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name character varying(200)
);

CREATE TABLE frequency (
    id SERIAL PRIMARY KEY,
    type character varying(200)
);

CREATE TABLE "challenges" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (500),
    "user_id" INTEGER
);

1	The Shire	50	shire.webp
2	Rivendell	100	Rivendell.webp
3	Rohan	150	Rohan.webp
4	Gondor	200	gondor.webp
5	Lothlorien	250	Lorien.webp
6	The Misty Mountains	400	Misty-Mountains.webp
7	Mordor	550	mordor.webp