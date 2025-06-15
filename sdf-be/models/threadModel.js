const db = require('../config/db');

const Thread = { 
  getAllThreads: async () => {  
    const [rows] = await db.query("SELECT * FROM thread"); 
    return rows; 
  }, 
  getThreadsByBoardId: async (board_id) => { 
    
    const [rows] = await db.query("SELECT * FROM thread WHERE board_id = ?", [board_id]); 
    return rows; 
  } 
}; 

module.exports = Thread;