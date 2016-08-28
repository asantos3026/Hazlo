-- INSERT INTO
--   users (email, password, avatar_url, created_at)
-- VALUES
--   (1, 'jared@example.org', 'cheese', '', now()),
--   (2, 'ana@example.org', 'hats', '', now()),
--   (3, 'thomas@example.org', 'dancing', '', now())
-- ;

INSERT INTO
  todos (user_id, title, work, completed, created_at)
VALUES
  (1, 'study routes express', true, false, now()),
  (1, 'write act 3 of screenplay', true, false, now()),
  (1, 'write a route to create a new todo', true, false, now()),
  (1, 'get some rest', false, false, now()),
  (1, 'study routes express', true, false, now()),
  (1, 'write act 3 of screenplay', true, false, now()),
  (1, 'write a route to create a new todo', true, false, now()),
  (1, 'study routes express', true, false, now()),
  (1, 'write act 3 of screenplay', true, false, now()),
  (1, 'write a route to create a new todo', true, false, now()),
  (2, 'go grocery shopping', true, false, now()),
  (2, 'read 1000 lines of code', true, true, now()),
  (2, 'buy incense for altar', false, true, now()),
  (2, 'return book to Berkeley public library', false, false, now())
;
