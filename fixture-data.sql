INSERT INTO
  users (id, email, password, avatar_url, created_at)
VALUES
  (1, 'jared@example.org', 'cheese', '', now()),
  (2, 'ana@example.org', 'hats', '', now()),
  (3, 'thomas@example.org', 'dancing', '', now())
;

INSERT INTO
  todos (user_id, title, work, created_at)
VALUES
  (1, 'eat some ice cream', true, now()),
  (1, 'drop some knowledge', true, now()),
  (1, 'eat some cake', false, now()),
  (1, 'sleep zzZZzz', false, now()),
  (2, 'pat jared on the head', true, now()),
  (2, 'read 1000 lines of code', true, now()),
  (2, 'feed cat', false, now()),
  (2, 'sleep 8 hours', false, now())
;
