const db = require('../config/db');

const Thread = { 
  getAllThreads: async () => {  
    const [rows] = await db.query("SELECT * FROM thread"); 
    return rows; 
  }, 
  getThreadsByBoardId: async (board_id) => { 
    
    const [rows] = await db.query("SELECT * FROM thread WHERE board_id = ?", [board_id]); 
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
  }
}; 

module.exports = Thread;