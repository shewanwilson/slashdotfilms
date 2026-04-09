const db = require('../config/db');

const Thread = { 
  getAllThreads: async () => {  
    const [rows] = await db.query("SELECT * FROM thread"); 
    return rows; 
  }, 
  getThreadsByBoardId: async (board_id) => { 
    
    const [rows] = await db.query(
      `
      SELECT 
      t.thread_id,
      t.thread_title,
      t.op_body,
      t.time_of_last_post,
      t.no_of_posts,
      u.username
      FROM thread t
      JOIN board_user u ON t.started_by_user_id = u.user_id  
      WHERE t.board_id = ?
      ORDER BY time_of_last_post DESC`,
      
      [board_id]
      
      
      );
       
    return rows; 
  },
  
  createThread: async (thread_title, op_body, board_id, started_by_user_id) => {
    const [result] = await db.query(
      `INSERT INTO thread
       (thread_title, op_body, board_id, started_by_user_id)
       VALUES (?, ?, ?, ?)`,
      [thread_title, op_body, board_id, started_by_user_id]
    );

    return result.insertId;
  },
  deleteThreadByThreadId: async (thread_id) => {
    const [result] = await db.query(
      "DELETE FROM thread WHERE thread_id = ?", [thread_id]
    );

    return result;
  }
}; 

module.exports = Thread;