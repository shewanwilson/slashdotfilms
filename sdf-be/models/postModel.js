const db = require('../config/db');

const Post = { 
  getPostsByThreadId: async (thread_id) => {
    const [rows] = await db.query(
      `
      SELECT
        t.thread_id,
        NULL AS post_id,
        NULL AS parent_id,
        t.started_by_user_id AS post_author_id,
        t.thread_title AS post_title,
        t.op_body AS post_body,
        t.created_at
      FROM thread t
      WHERE t.thread_id = ?

      UNION ALL

      SELECT
        p.thread_id,
        p.post_id,
        p.parent_id,
        p.post_author_id,
        p.post_title,
        p.post_body,
        p.created_at
      FROM post p
      WHERE p.thread_id = ?

      ORDER BY created_at ASC
      `,
      [thread_id, thread_id]
    );

    return rows;
  }
}; 

module.exports = Post;
