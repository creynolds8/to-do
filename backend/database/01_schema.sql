\c todo_app;

DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  message VARCHAR(100),
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO todos (title) VALUES ('test1');
INSERT INTO todos (title, message) VALUES ('test2', 'message test');
INSERT INTO todos (title, completed) VALUES ('test3', TRUE);
