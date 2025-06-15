const express = require('express'); 
const router = express.Router(); 
const postController = require('../controllers/postController'); 
router.get('/posts', postController.getPosts); 
router.get('/thread/posts/:thread_id', postController.getPostsByThreadId); 
module.exports = router; 
