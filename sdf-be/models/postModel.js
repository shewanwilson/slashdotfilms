const db = require('../config/db');
const { postPostReply } = require('../controllers/postController');

const Post = { 
  getPostsByThreadId: async (thread_id) => {
    const [rows] = await db.query(
      `
      SELECT
        t.thread_id,
        b.board_id,
        b.board_name,
        NULL AS post_id,
        NULL AS parent_id,
        t.started_by_user_id AS post_author_id,
        t.thread_title AS post_title,
        t.op_body AS post_body,
        t.created_at
      FROM thread t
      JOIN board b ON t.board_id = b.board_id
      WHERE t.thread_id = ?

      UNION ALL

      SELECT
        p.thread_id,
        b.board_id,
        b.board_name,
        p.post_id,
        p.parent_id,
        p.post_author_id,
        p.post_title,
        p.post_body,
        p.created_at
      FROM post p      
      JOIN thread t ON p.thread_id = t.thread_id
      JOIN board b ON t.board_id = b.board_id
      WHERE p.thread_id = ?

      ORDER BY created_at ASC
      `,
      [thread_id, thread_id]
    );

    return rows;
  },

  createPostReply: async (thread_id, parent_id, post_author_id, post_title, post_body) =>{
    const [result] = await db.query(
      `INSERT INTO post
       (thread_id, parent_id, post_author_id, post_title, post_body)
      VALUES (?, ?, ?, ?, ?)`,
      [thread_id, parent_id, post_author_id, post_title, post_body]
    );

    return result.insertId;
  }

}; 

module.exports = Post;
