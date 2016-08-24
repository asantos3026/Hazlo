DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX email ON users (email);

DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  work BOOLEAN NOT NULL,
  completed BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL
);

