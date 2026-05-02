const db = require('../config/db');

const Post = {

  /**
   * Get all posts in a thread (including OP)
   */
  getPostsByThreadId: async (thread_id, current_user_id) => {
    const [rows] = await db.query(
      `
      SELECT
        p.thread_id,
        b.board_id,
        b.board_name,
        p.post_id,
        p.parent_id,
        p.post_author_id,
        u.username,
        u.account_created_at,
        p.post_title,
        p.post_body,
        p.created_at,

        CASE
          WHEN p.post_author_id = ? THEN TRUE
          ELSE FALSE
        END AS can_edit

      FROM post p
      JOIN thread t ON p.thread_id = t.thread_id
      JOIN board b ON t.board_id = b.board_id
      JOIN board_user u ON p.post_author_id = u.user_id
      WHERE p.thread_id = ?
      ORDER BY p.created_at ASC
      `,
      [current_user_id, thread_id]
    );

    return rows;
  },


  /**
   * Create a post (OP or reply)
   * MUST be passed DB_CONNECTION when used in a transaction
   */
  createPost: async (DB_CONNECTION, {
    thread_id,
    parent_id,
    post_author_id,
    post_title,
    post_body
  }) => {

    const [result] = await DB_CONNECTION.query(
      `
      INSERT INTO post
        (thread_id, parent_id, post_author_id, post_title, post_body)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        thread_id,
        parent_id,
        post_author_id,
        post_title || null,
        post_body
      ]
    );

    return result.insertId;
  },


  /**
   * Edit a post (OP or reply)
   * Ensures user owns the post
   */
  editPost: async (post_id, user_id, post_title, post_body) => {
    const [result] = await db.query(
      `
      UPDATE post
      SET 
        post_title = ?,
        post_body = ?,
        updated_at = NOW()
      WHERE post_id = ? AND post_author_id = ?
      `,
      [post_title || null, post_body, post_id, user_id]
    );

    return result;
  },


  /**
   * Get a single post by ID
   */
  getPostById: async (post_id) => {
    const [rows] = await db.query(
      `
      SELECT *
      FROM post
      WHERE post_id = ?
      `,
      [post_id]
    );

    return rows[0] || null;
  }

};

module.exports = Post;
