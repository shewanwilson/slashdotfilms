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
  try { 
    const post = await PostModel.getPostsByThreadId(req.params.thread_id); 
    if (!post) return res.status(404).json({ message: "Post not found" }); 
    res.json(post); 
  } catch (error) { 
    res.status(500).json({ message: error.message }); 
  }
};


