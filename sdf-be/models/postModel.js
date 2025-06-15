const db = require('../config/db');

const Post = { 
  getAllPosts: async () => {  // Use => and add { }
    const [rows] = await db.query("SELECT * FROM post"); 
    return rows; 
  }, 
  getPostsByThreadId: async (thread_id) => { // Use => and add { }
    const [rows] = await db.query("SELECT * FROM post WHERE thread_id = ?", [thread_id]); 
    return rows; 
  } 
}; 

module.exports = Post;
