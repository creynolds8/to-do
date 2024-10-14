-- Insert seed data into users table
INSERT INTO users (email, password_digest)
VALUES
  ('user1@test.com', '$2a$10$NdTNoc5vCetgnF6qT8rEE.PrJ8v5Y8fxibTGjAhWyhwWOw8xfzlO2'),
  ('user2@test.com', '$2a$10$rX3aZwBLvgijjeHtSBSBVuajXmi46TVKwdwFoaMNfpczBdbNKUNNm'),
  ('user3@test.com', '$2a$10$Ya4H7AlCFwyg31NcTkx6qORLP56w/7oZ0N5/N7O41EgE9WgBPscu6');

-- Insert seed data into todo_lists table
INSERT INTO todo_lists (list_title, user_id)
VALUES
  -- User 1 Lists
  ('Default', 1),

  -- User 2 Lists
  ('Default', 2),

  -- User 3 Lists
  ('Default', 3);

-- Insert seed data into todos table
INSERT INTO todos (todo_title, message, priority, completed, active, todo_list_id)
VALUES
  ('Task 1', 'First task for list 1', TRUE, FALSE, TRUE, 1),
  ('Task 2', 'Second task for list 1', FALSE, TRUE, TRUE, 1),
  ('Task 3', 'Third task for list 1', TRUE, FALSE, TRUE, 1),
  ('Task 4', 'First task for list 2', FALSE, TRUE, TRUE, 1),
  ('Task 5', 'Second task for list 2', FALSE, FALSE, TRUE, 1),
  ('Task 6', 'Third task for list 2', TRUE, FALSE, TRUE, 2),
  ('Task 7', 'First task for list 3', TRUE, FALSE, TRUE, 2),
  ('Task 8', 'Second task for list 3', FALSE, TRUE, TRUE, 2),
  ('Task 9', 'Third task for list 3', TRUE, FALSE, TRUE, 2),
  ('Task 10', 'First task for list 4', TRUE, FALSE, TRUE, 2),
  ('Task 11', 'Second task for list 4', FALSE, TRUE, TRUE, 3),
  ('Task 12', 'Third task for list 4', TRUE, FALSE, TRUE, 3),
  ('Task 13', 'First task for list 5', TRUE, FALSE, TRUE, 3),
  ('Task 14', 'Second task for list 5', FALSE, TRUE, TRUE, 3),
  ('Task 15', 'Third task for list 5', TRUE, FALSE, TRUE, 3);
