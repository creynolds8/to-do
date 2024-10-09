DROP TABLE IF EXISTS todo_lists;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS todos;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(250) NOT NULL,
  password_digest VARCHAR(250) NOT NULL
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  message VARCHAR(100),
  priority BOOLEAN DEFAULT FALSE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todo_lists (
  id SERIAL PRIMARY KEY,
  title VARCHAR(20),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  todo_id INTEGER REFERENCES todos(id) ON DELETE CASCADE
);