const db = require('../config/db');
const PostModel = require('../models/postModel'); 

exports.getPosts = async (req, res) => {  
  try { 
    const posts = await PostModel.getAllPosts(); 
    res.json(posts); 
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
}; 

exports.getPostsByThreadId = async (req, res) => {  
  console.log("COOKIE HEADER:", req.headers.cookie);
  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION DATA:", req.session);
  console.log("USER ID:", req.session.user_id);
  
  try { 
    const posts = await PostModel.getPostsByThreadId(req.params.thread_id, req.session.user_id); 
    if (!posts) return res.status(404).json({ message: "Post not found" }); 
    
    res.json(posts);
    
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};

exports.postPostReply = async (req, res) => {
  console.log("COOKIE HEADER:", req.headers.cookie);
  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION DATA:", req.session);
  console.log("USER ID:", req.session.user_id);

  try {
      const DB_CONNECTION = await db.getConnection();
      const { thread_id } = req.params;
      const { parent_id, post_title, post_body } = req.body;
      
      const post_author_id = req.session.user_id;
      
      // Basic validation
      if (!post_body) {
        return res.status(400).json({ error: 'Post body is required' });
      }

      const postId = await PostModel.createPost(DB_CONNECTION,{
        thread_id,
        parent_id,
        post_author_id,
        post_title,
        post_body
      });

      res.status(201).json({
        message: 'Reply created',
        post_id: postId
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create reply' });
    }
};

exports.putEditPost = async(req, res) => {
  try{
    const { post_id } = req.params;
    const { post_title, post_body } = req.body;
    const user_id = req.session.user_id;

    const postId = await PostModel.editPost(post_id, user_id, post_title, post_body);

    res.status(201).json({
        message: 'Edit applied',
        post_id: postId
      });


  }catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to apply edit' });
    }

};

