INSERT INTO
  users (id, email, password, avatar_url, created_at)
VALUES
  (1, 'jared@example.org', 'cheese', '', now()),
  (2, 'ana@example.org', 'hats', '', now()),
  (3, 'thomas@example.org', 'dancing', '', now())
;

INSERT INTO
  todos (user_id, title, work, completed, created_at)
VALUES
  (1, 'eat some ice cream', true, true, now()),
  (1, 'drop some knowledge', true, false, now()),
  (1, 'eat some cake', false, true, now()),
  (1, 'sleep zzZZzz', false, false, now()),
  (2, 'pat jared on the head', true, false, now()),
  (2, 'read 1000 lines of code', true, true, now()),
  (2, 'feed cat', false, true, now()),
  (2, 'sleep 8 hours', false, false, now())
;
