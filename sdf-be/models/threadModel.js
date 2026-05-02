const db = require('../config/db');

const Thread = {
  
  createThread: async (DBconnection, board_id, started_by_user_id) => {
    const [result] = await DBconnection.query(
      `INSERT INTO thread
       (board_id, started_by_user_id)
       VALUES (?, ?)`,
      [board_id, started_by_user_id]
    );

    return result.insertId;
  },
  
  getThreadsByBoardId: async (board_id) => { 
    
    const [rows] = await db.query(
      `
      SELECT 
      t.thread_id,
      p.post_title,
      p.post_body,
      t.time_of_last_post,
      t.no_of_posts,
      u.username
      FROM thread t
      JOIN post p ON p.thread_id = t.thread_id AND p.parent_id = 0
      JOIN board_user u ON t.started_by_user_id = u.user_id  
      WHERE t.board_id = ?
      ORDER BY time_of_last_post DESC`,
      
      [board_id]
      
      
      );
       
    return rows; 
  },  
 
  deleteThreadByThreadId: async (thread_id) => {
    const [result] = await db.query(
      "DELETE FROM thread WHERE thread_id = ?", [thread_id]
    );

    return result;
  }
}; 

module.exports = Thread;