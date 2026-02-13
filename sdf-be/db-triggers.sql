USE sdf_db;

DROP TRIGGER IF EXISTS trg_post_after_insert;

DELIMITER $$

CREATE TRIGGER `trg_post_after_insert`
AFTER INSERT ON `post`
FOR EACH ROW
BEGIN
  UPDATE thread
  SET
    no_of_posts = no_of_posts + 1,
    time_of_last_post = CURRENT_TIMESTAMP
  WHERE thread_id = NEW.thread_id;
END$$

DELIMITER ;
