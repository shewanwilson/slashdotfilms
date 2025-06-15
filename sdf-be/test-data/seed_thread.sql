#ALTER TABLE sdf_db.thread DROP FOREIGN KEY board_id;

TRUNCATE TABLE sdf_db.thread;

INSERT INTO thread (thread_title, started_by, no_of_posts, time_of_last_post, board_id) VALUES
('Who is Azor Ahai?', 'AryaFan21', 12, '2025-04-10 14:23:00', 4),
('Bran is the Night King?', 'OldNan123', 25, '2025-04-09 18:05:00', 4),
('Best scenes in Season 6', 'DragonQueen', 18, '2025-04-11 09:15:00', 4),
('Best Movie Soundtracks?', 'ScoreSeeker', 8, '2025-04-10 21:50:00', 2),
('Movie remakes better than originals?', 'CinemaSnob', 14, '2025-04-10 13:20:00', 2),
('What to watch this weekend?', 'BingeBro', 6, '2025-04-11 10:10:00', 2),
('The 2025 Elections Thread', 'DebateKing', 47, '2025-04-11 07:00:00', 3),
('Is AI taking our jobs?', 'RealTalker', 33, '2025-04-10 23:45:00', 3),
('Forum Games: Count to 1,000', 'ForumBot', 152, '2025-04-11 11:25:00', 1),
('Introduce Yourself Here!', 'ModJane', 5, '2025-04-10 12:00:00', 1);


SELECT * FROM sdf_db.thread;