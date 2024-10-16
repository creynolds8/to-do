DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS todo_lists;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(250) NOT NULL,
  password_digest VARCHAR(250) NOT NULL
);

CREATE TABLE todo_lists (
  list_id SERIAL PRIMARY KEY,
  list_title VARCHAR(20),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  todo_title VARCHAR(20) NOT NULL,
  message VARCHAR(100),
  priority BOOLEAN DEFAULT FALSE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  todo_list_id INTEGER REFERENCES todo_lists(list_id) ON DELETE CASCADE
);
