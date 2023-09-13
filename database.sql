
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "profile_pic_url" TEXT
);

CREATE TABLE "dream" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "dream_description" TEXT NOT NULL,
  "dream_interpretation" TEXT,
  "dream_title" VARCHAR,
  "date" DATE,
  "dream_image_url" TEXT,
  FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);
