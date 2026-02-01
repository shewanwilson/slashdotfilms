INSERT INTO sdf_db.board (board_name) VALUES
	 ('General'),
	 ('Film General'),
	 ('Sopabox'),
	 ('Game of Thrones');
INSERT INTO sdf_db.board_user (username,email,password_hash,created_at) VALUES
	 ('barry','barry@example.com','$2b$10$N9qo8uLOickgx2ZMRZo5i.ej4Fz3mK2KxW1zPZp6Jr4lYpJ5yA8Wy','2025-12-25 01:11:06'),
	 ('admin','admin@example.com','$2b$10$9w6mJtY4m8kJqkZrR3h3b.f5C6P5x8xM0mZK0pZ9Z9bQ1W6Yz','2025-12-25 01:11:06'),
	 ('Hepocles','hep@example.com','$2b$10$opXFvJGxGCJAw6VhNLNNPOPjFgMyP9JLBT9OCU5sSk.t4272OZUVq','2025-12-26 20:10:23'),
	 ('AryaFan21','af21@example.com','$2b$10$NZGeHC7/1sDIPS9Af6B6r.FvqgsbHVOv8FhYCoRRosnVMaTVpsi4q','2026-01-24 18:44:56'),
	 ('OldNan123','on123@example.com','$2b$10$Y4CGk/fI6lC5/BFHJbKkceeS5X6E/otrBUG.Q3BFhHJSmUh3Cbovi','2026-01-24 18:45:51'),
	 ('DragonQueen','dq@example.com','$2b$10$avl8Z6Upa88lDkO7faWLSuAY53X2WHhat8ANhJtVNNpPlSrz/tieq','2026-01-24 18:46:10'),
	 ('ScoreSeeker','ss@example.com','$2b$10$P9xwabVUmj2yZZ56UCpbiuvqDFShlXo7wgCIgDU8ax0g0cRP4Xvai','2026-01-24 18:46:46'),
	 ('CinemaSnob','cs@example.com','$2b$10$9sJszC2REjiw47MGyEnhbe2GNEH5y2d8TAPs/WyfGDCo3iB0cK0y6','2026-01-24 18:47:09'),
	 ('BingeBro','bb@example.com','$2b$10$zH80rUN5iHccuqCEHla6beSFf3B69iYDVAIhDkG7m7718H2akubl2','2026-01-24 18:47:41'),
	 ('DebateKing','dk@example.com','$2b$10$bRecG/9Fmie6i8yU23LJ8ucsovjWWOOx7Cpdg98TbNFEH85//UPI2','2026-01-24 18:48:02');
INSERT INTO sdf_db.board_user (username,email,password_hash,created_at) VALUES
	 ('RealTalker','rt@example.com','$2b$10$arojFTUGz5ocWbPQTH2xyOYZv682WhE6/KJvUNbytjvn2Lk4ZfZO6','2026-01-24 18:48:22'),
	 ('ForumBot','fb@example.com','$2b$10$KcPxhog5E9urPLFpFBz98OZd.15WL3twQOy8f3bGP4UQqtBx8EwuG','2026-01-24 18:48:42'),
	 ('ModJane','mj@example.com','$2b$10$EFRmESOzSssHVzQsPZvBqudyjKR5krSqIPZXlFzB6KKgHWVLwlcly','2026-01-24 18:49:00'),
	 ('fdfd','dfdf@example.com','$2b$10$IoVBTr2zXmTIqyqo0n.qp.cr66jLt4RhnijsSxgoDAtLaz63Q1pXC','2026-01-24 18:53:44'),
	 ('ggfd','ggdfdf@example.com','$2b$10$wrBNFYq2K71qxcICG0CvXeg9400w1kUFvuPMBDVjwz9.jmPPb1Omq','2026-01-24 19:00:27'),
	 ('sdsd','sdfdf@example.com','$2b$10$ceV5mS/87BO8.itDmp/rreKVGT/SeWdx4aWf85/A.Bp/iwoc1pC0e','2026-01-25 15:53:52');
INSERT INTO sdf_db.post (post_title,post_body,post_author_id,thread_id,created_at) VALUES
	 ('Who is Azor Ahai?','The Targaryens are one of the most well-known families in Westeros, originally from the Valyrian Freehold. They ruled the Seven Kingdoms for nearly three centuries, with their dragons providing a distinct advantage over their enemies.',1,1,'2026-01-24 22:16:01'),
	 ('Who is Azor Ahai?','Jon Snow, raised as Eddard Stark''s bastard, is later revealed to have a hidden parentage tied to the Targaryen line. This revelation changes the course of the War of the Five Kings and has significant implications for the Iron Throne.',14,1,'2026-01-24 22:16:01'),
	 ('Who is Azor Ahai?','The Red Wedding was a tragic event in Westeros history where many key characters were murdered in a brutal betrayal at the hands of House Frey. This event marked a turning point in the War of the Five Kings.',14,1,'2026-01-24 22:16:01'),
	 ('The Wall and the Night''s Watch','The Wall is an immense structure built to protect the realm from dangers beyond. The Night''s Watch, tasked with guarding it, has been a symbol of honor and sacrifice, though it is often undermanned and disregarded by the political powers of Westeros.',1,2,'2026-01-24 22:16:01'),
	 ('The Dothraki and Their Culture','The Dothraki are a fierce nomadic people known for their cavalry and horse-riding skills. They follow the Great Stallion and have a unique culture, centered around strength, honor, and the belief that a man’s worth is tied to the horses he owns.',14,2,'2026-01-24 22:16:01'),
	 ('Brienne of Tarth and Her Honor','Brienne of Tarth is known as the Maid of Tarth and is one of the few women in Westeros who takes up the sword as a knight. Her dedication to her oath and her sense of honor make her a standout character in the series.',1,2,'2026-01-24 22:16:01'),
	 ('The War of the Five Kings','The War of the Five Kings was a civil war in Westeros following the death of King Robert Baratheon. The main claimants were King Stannis Baratheon, King Renly Baratheon, Robb Stark, Joffrey Baratheon, and Balon Greyjoy.',1,2,'2026-01-24 22:16:01'),
	 ('Varys and His Spies','Varys, the spymaster of Westeros, has a vast network of informants, which he uses to manipulate the political landscape. His enigmatic nature and loyalty to the realm make him both a fascinating and mysterious character.',14,2,'2026-01-24 22:16:01'),
	 ('Daenerys Targaryen''s Rise to Power','Daenerys Targaryen, the last surviving Targaryen after the fall of her house, begins her journey in Essos with nothing but a few followers. Over time, she gains an army, dragons, and the loyalty of many, setting her sights on the Iron Throne.',1,2,'2026-01-24 22:16:01'),
	 ('The Battle of the Bastards','The Battle of the Bastards was a pivotal conflict in the North, where Jon Snow and Sansa Stark led their forces against Ramsay Bolton in an attempt to reclaim Winterfell. The battle is known for its brutal tactics and its impact on the Stark family’s future.',1,2,'2026-01-24 22:16:01');
INSERT INTO sdf_db.post (post_title,post_body,post_author_id,thread_id,created_at) VALUES
	 ('Test','Trigger check',1,1,'2026-01-25 13:31:45'),
	 ('Test 2','Trigger check',1,1,'2026-01-25 13:36:44');
INSERT INTO sdf_db.thread (thread_title,time_of_last_post,no_of_posts,board_id,started_by_user_id) VALUES
	 ('Who is Azor Ahai?','2026-01-25 13:36:44',4,4,4),
	 ('Bran is the Night King?','2025-04-09 18:05:00',25,4,5),
	 ('Best scenes in Season 6','2025-04-11 09:15:00',18,4,6),
	 ('Best Movie Soundtracks?','2025-04-10 21:50:00',8,2,7),
	 ('Movie remakes better than originals?','2025-04-10 13:20:00',14,2,8),
	 ('What to watch this weekend?','2025-04-11 10:10:00',6,2,9),
	 ('The 2025 Elections Thread','2025-04-11 07:00:00',47,3,10),
	 ('Is AI taking our jobs?','2025-04-10 23:45:00',33,3,11),
	 ('Forum Games: Count to 1,000','2025-04-11 11:25:00',152,1,12),
	 ('Introduce Yourself Here!','2025-04-10 12:00:00',5,1,13);
INSERT INTO sdf_db.thread (thread_title,time_of_last_post,no_of_posts,board_id,started_by_user_id) VALUES
	 ('Test timestamp','2026-01-24 18:28:10',0,1,7),
	 ('Test timestamp 2','2026-01-24 18:32:05',0,1,7),
	 (NULL,'2026-01-25 16:48:52',0,1,1),
	 (NULL,'2026-01-25 20:35:32',0,1,1),
	 (NULL,'2026-01-25 20:35:38',0,1,1),
	 ('api test thread 1','2026-01-25 20:36:26',0,1,1),
	 ('api test thread 2','2026-01-25 20:40:57',1,1,1);
