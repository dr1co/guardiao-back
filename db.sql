--- arquivo desnecessário 
CREATE DATABASE "guardiao_dev";

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "email" VARCHAR(60) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
); 

CREATE TABLE "child" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(20) NOT NULL,
  "age" INTEGER NOT NULL,
  "profileStatus" BOOLEAN,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "connection" (
  "id" SERIAL PRIMARY KEY,
  "childId" INTEGER NOT NULL REFERENCES "child"("id"),
  "userId" INTEGER NOT NULL REFERENCES "user"("id"),
  "connectionStatus" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TYPE alert_type AS ENUM (
    'TIME_LIMIT',
    'APP_USAGE',
    'LOCATION',
    'SOCIAL_MEDIA',
    'KEYWORD',
    'DEVICE_CHANGE'
);

CREATE TABLE "alert" (
  "id" SERIAL PRIMARY KEY,
  "childId" INTEGER NOT NULL REFERENCES "child"("id"),
  "type" alert_type NOT NULL,
  "message" VARCHAR(255),
  "content" BYTEA, -- Armazena dados binários, como prints de tela
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TYPE activity_type AS ENUM (
    'PAGE_VISIT',
    'PAGE_EXIT',
    'LINK_CLICK',
    'SEARCH_QUERY',
    'FORM_SUBMISSION',
    'DOWNLOAD',
    'VIDEO_PLAY',
    'AD_CLICK',
    'SITE_BLOCKED'
);

CREATE TABLE "activity" (
  "id" SERIAL PRIMARY KEY,
  "childId" INTEGER NOT NULL REFERENCES "child"("id"),
  "type" activity_type NOT NULL,
  "message" VARCHAR(255),
  "content" BYTEA,
  "time" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TYPE os_type AS ENUM (
    'Android', 
    'iOS', 
    'Windows Phone', 
    'KaiOS'
);

CREATE TABLE "device" (
  "id" SERIAL PRIMARY KEY,
  "childId" INTEGER NOT NULL REFERENCES "child"("id"),
  "os" os_type NOT NULL,
  "status" BOOLEAN
);