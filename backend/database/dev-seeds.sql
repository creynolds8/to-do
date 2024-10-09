-- Insert seed data into 'users'
INSERT INTO users (email, password_digest) VALUES
('user1@example.com', 'password1_digest'),
('user2@example.com', 'password2_digest'),
('user3@example.com', 'password3_digest');

-- Insert seed data into 'todos' (15 todos, 5 per list)
INSERT INTO todos (title, message, priority, completed, active) VALUES
('Todo 1.1', 'Message 1 for List 1', true, false, true),
('Todo 1.2', 'Message 2 for List 1', false, false, true),
('Todo 1.3', 'Message 3 for List 1', false, true, true),
('Todo 1.4', 'Message 4 for List 1', true, true, false),
('Todo 1.5', 'Message 5 for List 1', false, false, true),

('Todo 2.1', 'Message 1 for List 2', false, true, true),
('Todo 2.2', 'Message 2 for List 2', true, false, true),
('Todo 2.3', 'Message 3 for List 2', false, true, true),
('Todo 2.4', 'Message 4 for List 2', false, false, true),
('Todo 2.5', 'Message 5 for List 2', false, false, true),

('Todo 3.1', 'Message 1 for List 3', false, true, true),
('Todo 3.2', 'Message 2 for List 3', false, true, false),
('Todo 3.3', 'Message 3 for List 3', true, false, true),
('Todo 3.4', 'Message 4 for List 3', false, false, true),
('Todo 3.5', 'Message 5 for List 3', true, true, true);

-- Insert seed data into 'todo_lists' (associate lists and todos with users)
INSERT INTO todo_lists (title, user_id, todo_id) VALUES
('List 1', 1, 1),
('List 1', 1, 2),
('List 1', 1, 3),
('List 1', 1, 4),
('List 1', 1, 5),

('List 2', 2, 6),
('List 2', 2, 7),
('List 2', 2, 8),
('List 2', 2, 9),
('List 2', 2, 10),

('List 3', 3, 11),
('List 3', 3, 12),
('List 3', 3, 13),
('List 3', 3, 14),
('List 3', 3, 15);