SELECT * FROM sdf_db.thread;

ALTER TABLE thread
ADD COLUMN op_body TEXT NOT NULL
AFTER thread_title;

ALTER TABLE thread
MODIFY COLUMN no_of_posts INT NOT NULL DEFAULT 0;