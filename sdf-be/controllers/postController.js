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

exports.postPostReply = async (req, res) => {
  try {
      const { thread_id } = req.params;
      const { parent_id, post_title, post_body } = req.body;

      // ⚠️ Replace this with real auth later
      //const post_author_id = req.user?.id || 1;
      const post_author_id = req.session.user_id;

      // Basic validation
      if (!post_body) {
        return res.status(400).json({ error: 'Post body is required' });
      }

      const postId = await PostModel.createPostReply(
        thread_id,
        parent_id,
        post_author_id,
        post_title || null,
        post_body
      );

      res.status(201).json({
        message: 'Reply created',
        post_id: postId
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create reply' });
    }
};


